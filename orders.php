<?php
require_once 'includes/config.php';

if (!is_logged_in()) {
    redirect('index.php');
}

$user_id = $_SESSION['user_id'];
$orders = $conn->query("SELECT o.*, s.name as service_name FROM orders o JOIN services s ON o.service_id = s.id WHERE o.user_id = $user_id ORDER BY o.id DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Orders - <?php echo SITE_NAME; ?></title>
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
        .table { color: white; }
        .table thead th { border-bottom: 2px solid #27272a; color: var(--text-muted); }
        .table td { border-bottom: 1px solid #27272a; vertical-align: middle; }
        .badge-Pending { background: #f59e0b22; color: #f59e0b; }
        .badge-Completed { background: #10b98122; color: #10b981; }
        .badge-In-Progress { background: #3b82f622; color: #3b82f6; }
        .badge-Canceled { background: #ef444422; color: #ef4444; }
    </style>
</head>
<body>
    <div class="sidebar d-none d-md-block">
        <div class="p-4"><h4 class="text-white fw-bold"><i class="bi bi-rocket-takeoff me-2"></i>SMM ELITE</h4></div>
        <nav class="nav flex-column mt-4">
            <a class="nav-link" href="dashboard.php"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
            <a class="nav-link" href="new_order.php"><i class="bi bi-plus-circle me-2"></i> New Order</a>
            <a class="nav-link" href="services.php"><i class="bi bi-collection me-2"></i> Services</a>
            <a class="nav-link active" href="orders.php"><i class="bi bi-list-task me-2"></i> My Orders</a>
            <a class="nav-link" href="add_funds.php"><i class="bi bi-wallet2 me-2"></i> Add Funds</a>
            <div class="mt-auto p-3">
                <a class="nav-link text-danger" href="logout.php"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
            </div>
        </nav>
    </div>

    <div class="main-content">
        <h2 class="fw-bold mb-4">My Orders</h2>
        
        <?php if(isset($_SESSION['success'])): ?>
            <div class="alert alert-success bg-success text-white border-0 alert-dismissible fade show">
                <?php echo $_SESSION['success']; unset($_SESSION['success']); ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        <?php endif; ?>

        <div class="card p-4">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>API ID</th>
                            <th>Service</th>
                            <th>Link</th>
                            <th>Qty</th>
                            <th>Charge</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while($order = $orders->fetch_assoc()): ?>
                        <tr>
                            <td>#<?php echo $order['id']; ?></td>
                            <td><?php echo $order['api_order_id'] ?? 'N/A'; ?></td>
                            <td><?php echo htmlspecialchars($order['service_name']); ?></td>
                            <td><a href="<?php echo htmlspecialchars($order['link']); ?>" target="_blank" class="text-muted small"><?php echo htmlspecialchars($order['link']); ?></a></td>
                            <td><?php echo number_format($order['quantity']); ?></td>
                            <td class="fw-bold text-primary">$<?php echo number_format($order['charge'], 4); ?></td>
                            <td>
                                <span class="badge rounded-pill badge-<?php echo str_replace(' ', '-', $order['status']); ?>">
                                    <?php echo $order['status']; ?>
                                </span>
                            </td>
                            <td class="text-muted small"><?php echo date('M d, Y H:i', strtotime($order['created_at'])); ?></td>
                        </tr>
                        <?php endwhile; ?>
                        <?php if($orders->num_rows == 0): ?>
                            <tr><td colspan="8" class="text-center p-4 text-muted">You haven't placed any orders yet.</td></tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
