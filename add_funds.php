<?php
require_once 'includes/config.php';

if (!is_logged_in()) {
    redirect('index.php');
}

$user_id = $_SESSION['user_id'];
$success = "";
$error = "";

// Handle Manual Payment Submissions (bKash, Nagad, Rocket)
if (isset($_POST['submit_manual_payment'])) {
    $method = $conn->real_escape_string($_POST['method']);
    $amount_usd = (float)$_POST['amount_usd'];
    $amount_bdt = $amount_usd * USD_TO_BDT;
    $transaction_id = $conn->real_escape_string($_POST['transaction_id']);

    if ($amount_usd > 0 && !empty($transaction_id)) {
        $stmt = $conn->prepare("INSERT INTO payments (user_id, method, amount_usd, amount_bdt, transaction_id, status) VALUES (?, ?, ?, ?, ?, 'Pending')");
        $stmt->bind_param("isdds", $user_id, $method, $amount_usd, $amount_bdt, $transaction_id);
        if ($stmt->execute()) {
            $success = "Your payment request for $$amount_usd (" . number_format($amount_bdt, 2) . " BDT) via $method has been submitted. It will be added to your balance after verification.";
        } else {
            $error = "Something went wrong. Please try again.";
        }
    } else {
        $error = "Please fill in all fields correctly.";
    }
}

$user_res = $conn->query("SELECT balance FROM users WHERE id = $user_id");
$user = $user_res->fetch_assoc();

// Get payment history
$history = $conn->query("SELECT * FROM payments WHERE user_id = $user_id ORDER BY id DESC LIMIT 5");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Funds - <?php echo SITE_NAME; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
        :root { --bg-dark: #09090b; --card-bg: #18181b; --primary-accent: #8b5cf6; --text-muted: #a1a1aa; }
        body { background-color: var(--bg-dark); color: white; }
        .sidebar { height: 100vh; background: var(--card-bg); border-right: 1px solid #27272a; position: fixed; width: 250px; }
        .main-content { margin-left: 250px; padding: 2rem; }
        .nav-link { color: var(--text-muted); padding: 0.8rem 1.5rem; border-radius: 0.5rem; margin: 0.2rem 1rem; transition: 0.3s; }
        .nav-link:hover, .nav-link.active { background: var(--primary-accent); color: white; }
        .card { background: var(--card-bg); border: 1px solid #27272a; border-radius: 1rem; }
        .form-control { background-color: #09090b; border-color: #27272a; color: white; }
        .form-control:focus { background-color: #09090b; border-color: var(--primary-accent); color: white; box-shadow: none; }
        
        .method-card { border: 2px solid #27272a; cursor: pointer; transition: 0.3s; border-radius: 1rem; overflow: hidden; }
        .method-card:hover, .method-card.active { border-color: var(--primary-accent); background: #27272a; }
        .method-logo { height: 40px; object-fit: contain; }
        
        .nav-tabs { border-bottom: 1px solid #27272a; }
        .nav-link.tab-link { background: none; border: none; color: var(--text-muted); padding: 1rem 1.5rem; }
        .nav-link.tab-link.active { color: var(--primary-accent); border-bottom: 2px solid var(--primary-accent); }
    </style>
</head>
<body>
    <div class="sidebar d-none d-md-block">
        <div class="p-4"><h4 class="text-white fw-bold"><i class="bi bi-rocket-takeoff me-2"></i>SMM ELITE</h4></div>
        <nav class="nav flex-column mt-4">
            <a class="nav-link" href="dashboard.php"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
            <a class="nav-link" href="new_order.php"><i class="bi bi-plus-circle me-2"></i> New Order</a>
            <a class="nav-link" href="services.php"><i class="bi bi-collection me-2"></i> Services</a>
            <a class="nav-link" href="orders.php"><i class="bi bi-list-task me-2"></i> My Orders</a>
            <a class="nav-link active" href="add_funds.php"><i class="bi bi-wallet2 me-2"></i> Add Funds</a>
            <div class="mt-auto p-3">
                <a class="nav-link text-danger" href="logout.php"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
            </div>
        </nav>
    </div>

    <div class="main-content">
        <div class="row align-items-center mb-4">
            <div class="col">
                <h2 class="fw-bold">Add Funds</h2>
                <p class="text-muted mb-0">Select your preferred payment method to top up.</p>
            </div>
            <div class="col-auto">
                <div class="card p-3">
                    <span class="text-muted small d-block">Current Balance</span>
                    <h4 class="mb-0 text-primary fw-bold">$<?php echo number_format($user['balance'], 4); ?></h4>
                </div>
            </div>
        </div>

        <?php if($success): ?>
            <div class="alert alert-success border-0 bg-success text-white py-3"><?php echo $success; ?></div>
        <?php endif; ?>
        <?php if($error): ?>
            <div class="alert alert-danger border-0 bg-danger text-white py-3"><?php echo $error; ?></div>
        <?php endif; ?>

        <div class="row">
            <div class="col-md-7">
                <div class="card p-4">
                    <ul class="nav nav-tabs mb-4" id="paymentTabs" role="tablist">
                        <li class="nav-item">
                            <button class="nav-link tab-link active" id="local-tab" data-bs-toggle="tab" data-bs-target="#local" type="button">Local (BDT)</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link tab-link" id="global-tab" data-bs-toggle="tab" data-bs-target="#global" type="button">Global (USD)</button>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <!-- LOCAL PAYMENT (BDT) -->
                        <div class="tab-pane fade show active" id="local">
                            <form method="POST">
                                <div class="mb-4">
                                    <label class="form-label text-muted small fw-bold">Select Method</label>
                                    <div class="row g-3">
                                        <div class="col-4">
                                            <div class="method-card p-3 text-center active" onclick="setMethod('bKash')">
                                                <img src="https://searchlogovector.com/wp-content/uploads/2019/02/bkash-logo-vector.png" class="method-logo mb-2">
                                                <div class="small fw-bold">bKash</div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="method-card p-3 text-center" onclick="setMethod('Nagad')">
                                                <img src="https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png" class="method-logo mb-2">
                                                <div class="small fw-bold">Nagad</div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="method-card p-3 text-center" onclick="setMethod('Rocket')">
                                                <img src="https://p7.hiclipart.com/preview/427/537/871/rocket-dbbl-logo-bangladesh.jpg" class="method-logo mb-2">
                                                <div class="small fw-bold">Rocket</div>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" name="method" id="selected_method" value="bKash">
                                </div>

                                <div class="alert bg-dark border-secondary p-3 mb-4">
                                    <h6 class="fw-bold text-primary mb-2"><i class="bi bi-info-circle me-2"></i>Payment Instructions:</h6>
                                    <p class="small text-muted mb-0">
                                        Send money to our Personal <span id="method_name">bKash</span> number: <span class="text-white fw-bold">017XXXXXXXX</span><br>
                                        Rate: <span class="text-white">1 USD = <?php echo USD_TO_BDT; ?> BDT</span>
                                    </p>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label text-muted">Amount (USD)</label>
                                    <div class="input-group">
                                        <span class="input-group-text">$</span>
                                        <input type="number" name="amount_usd" id="amount_usd" class="form-control" placeholder="10.00" step="0.01" required oninput="updateBDT()">
                                    </div>
                                    <div class="mt-2 small text-muted">Equivalent to: <span id="bdt_amount" class="text-white fw-bold">0.00</span> BDT</div>
                                </div>

                                <div class="mb-4">
                                    <label class="form-label text-muted">Transaction ID</label>
                                    <input type="text" name="transaction_id" class="form-control" placeholder="e.g. 8N7X6W5V" required>
                                </div>

                                <button type="submit" name="submit_manual_payment" class="btn btn-primary w-100 py-3 fw-bold">Confirm Deposit</button>
                            </form>
                        </div>

                        <!-- GLOBAL PAYMENT (USD) -->
                        <div class="tab-pane fade" id="global">
                            <div class="mb-4">
                                <label class="form-label text-muted small fw-bold">Choose Method</label>
                                <div class="row g-3">
                                    <div class="col-6">
                                        <div class="method-card p-3 text-center">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" class="method-logo mb-2">
                                            <div class="small fw-bold">PayPal</div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="method-card p-3 text-center">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/03/Payoneer_logo.svg" class="method-logo mb-2">
                                            <div class="small fw-bold">Payoneer</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 text-center bg-dark rounded border border-secondary border-dashed">
                                <i class="bi bi-shield-lock text-muted display-6 mb-3 d-block"></i>
                                <p class="text-muted">Automatic gateways are currently under maintenance. Please use local methods or contact support.</p>
                                <a href="#" class="btn btn-outline-secondary btn-sm">Contact Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-5">
                <div class="card p-4 h-100">
                    <h5 class="fw-bold mb-4">Recent Deposits</h5>
                    <?php if($history->num_rows > 0): ?>
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr class="text-muted small">
                                        <th>Date</th>
                                        <th>USD</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php while($h = $history->fetch_assoc()): ?>
                                    <tr>
                                        <td><span class="small"><?php echo date('M d', strtotime($h['created_at'])); ?></span></td>
                                        <td class="fw-bold">$<?php echo number_format($h['amount_usd'], 2); ?></td>
                                        <td>
                                            <span class="badge rounded-pill bg-<?php echo $h['status'] == 'Pending' ? 'warning text-dark' : ($h['status'] == 'Completed' ? 'success' : 'danger'); ?> small">
                                                <?php echo $h['status']; ?>
                                            </span>
                                        </td>
                                    </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    <?php else: ?>
                        <div class="text-center py-5">
                            <i class="bi bi-clock-history text-muted display-4 mb-3"></i>
                            <p class="text-muted small">No recent deposit history found.</p>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const rate = <?php echo USD_TO_BDT; ?>;
        
        function updateBDT() {
            const usd = parseFloat(document.getElementById('amount_usd').value) || 0;
            document.getElementById('bdt_amount').innerText = (usd * rate).toLocaleString(undefined, {minimumFractionDigits: 2});
        }

        function setMethod(name) {
            document.getElementById('selected_method').value = name;
            document.getElementById('method_name').innerText = name;
            
            // UI Visual toggle
            document.querySelectorAll('.method-card').forEach(el => el.classList.remove('active'));
            event.currentTarget.classList.add('active');
        }
    </script>
</body>
</html>
