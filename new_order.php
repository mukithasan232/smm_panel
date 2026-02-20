<?php
require_once 'includes/config.php';

if (!is_logged_in()) {
    redirect('index.php');
}

$user_id = $_SESSION['user_id'];
$user_res = $conn->query("SELECT balance FROM users WHERE id = $user_id");
$user = $user_res->fetch_assoc();

// Get unique categories
$categories_res = $conn->query("SELECT DISTINCT category FROM services ORDER BY category ASC");

// Get all services for JS filtering
$services_res = $conn->query("SELECT * FROM services ORDER BY category ASC, id ASC");
$services_data = [];
while ($row = $services_res->fetch_assoc()) {
    $services_data[$row['category']][] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order - <?php echo SITE_NAME; ?></title>
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
        .form-control, .form-select { background-color: #09090b; border-color: #27272a; color: white; }
        .form-control:focus, .form-select:focus { background-color: #09090b; border-color: var(--primary-accent); color: white; box-shadow: none; }
        .input-group-text { background-color: #27272a; border-color: #27272a; color: white; }
        .info-box { background: #27272a; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem; }
    </style>
</head>
<body>
    <div class="sidebar d-none d-md-block">
        <div class="p-4"><h4 class="text-white fw-bold"><i class="bi bi-rocket-takeoff me-2"></i>SMM ELITE</h4></div>
        <nav class="nav flex-column mt-4">
            <a class="nav-link" href="dashboard.php"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
            <a class="nav-link active" href="new_order.php"><i class="bi bi-plus-circle me-2"></i> New Order</a>
            <a class="nav-link" href="services.php"><i class="bi bi-collection me-2"></i> Services</a>
            <a class="nav-link" href="orders.php"><i class="bi bi-list-task me-2"></i> My Orders</a>
            <a class="nav-link" href="add_funds.php"><i class="bi bi-wallet2 me-2"></i> Add Funds</a>
            <div class="mt-auto p-3">
                <a class="nav-link text-danger" href="logout.php"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
            </div>
        </nav>
    </div>

    <div class="main-content">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">Place New Order</h2>
                    <div class="text-end">
                        <span class="text-muted d-block small">Balance</span>
                        <h5 class="mb-0 text-primary fw-bold">$<?php echo number_format($user['balance'], 4); ?></h5>
                    </div>
                </div>

                <div class="card p-4">
                    <form action="place_order.php" method="POST" id="orderForm">
                        <div class="mb-3">
                            <label class="form-label text-muted">Category</label>
                            <select class="form-select" id="category" name="category" required>
                                <option value="">Select Category</option>
                                <?php while($cat = $categories_res->fetch_assoc()): ?>
                                    <option value="<?php echo htmlspecialchars($cat['category']); ?>"><?php echo htmlspecialchars($cat['category']); ?></option>
                                <?php endwhile; ?>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label text-muted">Service</label>
                            <select class="form-select" id="service" name="service_id" required disabled>
                                <option value="">Select Service</option>
                            </select>
                        </div>

                        <div id="service_info" class="info-box d-none">
                            <div class="row">
                                <div class="col-6">
                                    <small class="text-muted d-block">Price per 1k</small>
                                    <span class="fw-bold text-primary" id="rate_display">$0.00</span>
                                </div>
                                <div class="col-6">
                                    <small class="text-muted d-block">Min/Max</small>
                                    <span class="fw-bold" id="min_max_display">0 / 0</span>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label text-muted">Link</label>
                            <input type="text" name="link" class="form-control" placeholder="https://www.social-link.com/profile" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label text-muted">Quantity</label>
                            <input type="number" name="quantity" id="quantity" class="form-control" placeholder="100" required>
                        </div>

                        <div class="card p-3 mb-4 bg-dark">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="fw-bold">Total Charge:</span>
                                <h4 class="mb-0 text-primary fw-bold" id="total_charge">$0.0000</h4>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary w-100 py-2 fw-bold" id="submitBtn">Place Order</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        const services = <?php echo json_encode($services_data); ?>;
        const categorySelect = document.getElementById('category');
        const serviceSelect = document.getElementById('service');
        const quantityInput = document.getElementById('quantity');
        const rateDisplay = document.getElementById('rate_display');
        const minMaxDisplay = document.getElementById('min_max_display');
        const totalChargeDisplay = document.getElementById('total_charge');
        const serviceInfo = document.getElementById('service_info');
        
        let currentRate = 0;

        categorySelect.addEventListener('change', function() {
            const cat = this.value;
            serviceSelect.innerHTML = '<option value="">Select Service</option>';
            serviceSelect.disabled = !cat;
            serviceInfo.classList.add('d-none');
            
            if (cat && services[cat]) {
                services[cat].forEach(s => {
                    const opt = document.createElement('option');
                    opt.value = s.id;
                    opt.textContent = s.name;
                    opt.dataset.rate = s.rate_per_1k;
                    opt.dataset.min = s.min;
                    opt.dataset.max = s.max;
                    serviceSelect.appendChild(opt);
                });
            }
        });

        serviceSelect.addEventListener('change', function() {
            const opt = this.options[this.selectedIndex];
            if (opt.value) {
                currentRate = parseFloat(opt.dataset.rate);
                rateDisplay.textContent = '$' + currentRate.toFixed(4);
                minMaxDisplay.textContent = opt.dataset.min + ' / ' + opt.dataset.max;
                serviceInfo.classList.remove('d-none');
                calculateTotal();
            } else {
                serviceInfo.classList.add('d-none');
            }
        });

        quantityInput.addEventListener('input', calculateTotal);

        function calculateTotal() {
            const qty = parseInt(quantityInput.value) || 0;
            const total = (qty / 1000) * currentRate;
            totalChargeDisplay.textContent = '$' + total.toFixed(4);
        }

        // Handle direct service selection from URL
        const urlParams = new URLSearchParams(window.location.search);
        const preSelectedServiceId = urlParams.get('service_id');
        if (preSelectedServiceId) {
            // Find which category this service belongs to
            let foundCat = '';
            for (let cat in services) {
                if (services[cat].find(s => s.id == preSelectedServiceId)) {
                    foundCat = cat;
                    break;
                }
            }
            if (foundCat) {
                categorySelect.value = foundCat;
                categorySelect.dispatchEvent(new Event('change'));
                serviceSelect.value = preSelectedServiceId;
                serviceSelect.dispatchEvent(new Event('change'));
            }
        }
    </script>
</body>
</html>
