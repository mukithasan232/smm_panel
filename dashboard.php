<?php
require_once 'includes/config.php';

if (!is_logged_in()) {
    redirect('index.php');
}

$user_id = $_SESSION['user_id'];
$user_res = $conn->query("SELECT * FROM users WHERE id = $user_id");
$user = $user_res->fetch_assoc();

// Get counts
$total_orders = $conn->query("SELECT COUNT(*) as count FROM orders WHERE user_id = $user_id")->fetch_assoc()['count'];
$pending_orders = $conn->query("SELECT COUNT(*) as count FROM orders WHERE user_id = $user_id AND status = 'Pending'")->fetch_assoc()['count'];
$completed_orders = $conn->query("SELECT COUNT(*) as count FROM orders WHERE user_id = $user_id AND status = 'Completed'")->fetch_assoc()['count'];

// Get recent orders
$recent_orders = $conn->query("SELECT o.*, s.name as service_name FROM orders o JOIN services s ON o.service_id = s.id WHERE o.user_id = $user_id ORDER BY o.id DESC LIMIT 10");

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - <?php echo SITE_NAME; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
        :root {
            --bg-dark: #09090b;
            --card-bg: #18181b;
            --primary-accent: #8b5cf6;
            --secondary-accent: #6d28d9;
            --text-main: #f4f4f5;
            --text-muted: #a1a1aa;
        }
        body { background-color: var(--bg-dark); color: var(--text-main); font-family: 'Inter', sans-serif; }
        .sidebar { height: 100vh; background: var(--card-bg); border-right: 1px solid #27272a; position: fixed; width: 250px; }
        .main-content { margin-left: 250px; padding: 2rem; }
        .nav-link { color: var(--text-muted); padding: 0.8rem 1.5rem; border-radius: 0.5rem; margin: 0.2rem 1rem; transition: 0.3s; }
        .nav-link:hover, .nav-link.active { background: var(--primary-accent); color: white; }
        .card { background: var(--card-bg); border: 1px solid #27272a; border-radius: 1rem; }
        .stat-card { padding: 1.5rem; }
        .stat-icon { font-size: 2rem; color: var(--primary-accent); }
        .table { color: var(--text-main); }
        .table thead th { border-bottom: 2px solid #27272a; color: var(--text-muted); }
        .table td { border-bottom: 1px solid #27272a; vertical-align: middle; }
        .badge-pending { background: #f59e0b22; color: #f59e0b; }
        .badge-completed { background: #10b98122; color: #10b981; }
        .badge-processing { background: #3b82f622; color: #3b82f6; }
    </style>
</head>
<body>
    <div class="sidebar d-none d-md-block">
        <div class="p-4">
            <h4 class="text-white fw-bold"><i class="bi bi-rocket-takeoff me-2"></i>SMM ELITE</h4>
        </div>
        <nav class="nav flex-column mt-4">
            <a class="nav-link active" href="dashboard.php"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
            <a class="nav-link" href="new_order.php"><i class="bi bi-plus-circle me-2"></i> New Order</a>
            <a class="nav-link" href="services.php"><i class="bi bi-collection me-2"></i> Services</a>
            <a class="nav-link" href="orders.php"><i class="bi bi-list-task me-2"></i> My Orders</a>
            <a class="nav-link" href="add_funds.php"><i class="bi bi-wallet2 me-2"></i> Add Funds</a>
            <div class="mt-auto p-3">
                <a class="nav-link text-danger" href="logout.php"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
            </div>
        </nav>
    </div>

    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="fw-bold">Welcome back, <?php echo $user['username']; ?>!</h2>
                <p class="text-muted">Here's what's happening with your account today.</p>
            </div>
            <div class="text-end">
                <div class="card p-2 px-3 d-inline-block">
                    <span class="text-muted small">Your Balance</span>
                    <h4 class="mb-0 text-primary fw-bold">$<?php echo number_format($user['balance'], 4); ?></h4>
                </div>
            </div>
        </div>

        <div class="row g-4 mb-4">
            <div class="col-md-4">
                <div class="card stat-card">
                    <div class="d-flex justify-content-between">
                        <div>
                            <span class="text-muted small">Total Orders</span>
                            <h3 class="fw-bold mt-1"><?php echo $total_orders; ?></h3>
                        </div>
                        <div class="stat-icon"><i class="bi bi-cart-check"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card stat-card">
                    <div class="d-flex justify-content-between">
                        <div>
                            <span class="text-muted small">Pending Orders</span>
                            <h3 class="fw-bold mt-1"><?php echo $pending_orders; ?></h3>
                        </div>
                        <div class="stat-icon text-warning"><i class="bi bi-clock-history"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card stat-card">
                    <div class="d-flex justify-content-between">
                        <div>
                            <span class="text-muted small">Completed</span>
                            <h3 class="fw-bold mt-1"><?php echo $completed_orders; ?></h3>
                        </div>
                        <div class="stat-icon text-success"><i class="bi bi-check-all"></i></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="fw-bold mb-0">Recent Orders</h5>
                <a href="orders.php" class="btn btn-sm btn-outline-secondary">View All</a>
            </div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Service</th>
                            <th>Link</th>
                            <th>Qty</th>
                            <th>Charge</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while($order = $recent_orders->fetch_assoc()): ?>
                        <tr>
                            <td>#<?php echo $order['id']; ?></td>
                            <td><span class="text-truncate d-inline-block" style="max-width: 200px;"><?php echo $order['service_name']; ?></span></td>
                            <td><a href="<?php echo $order['link']; ?>" target="_blank" class="text-muted small"><?php echo $order['link']; ?></a></td>
                            <td><?php echo number_format($order['quantity']); ?></td>
                            <td class="fw-bold text-primary">$<?php echo number_format($order['charge'], 4); ?></td>
                            <td>
                                <span class="badge rounded-pill badge-<?php echo strtolower(str_replace(' ', '-', $order['status'] == 'In Progress' ? 'processing' : $order['status'])); ?>">
                                    <?php echo $order['status']; ?>
                                </span>
                            </td>
                            <td class="text-muted small"><?php echo date('M d, H:i', strtotime($order['created_at'])); ?></td>
                        </tr>
                        <?php endwhile; ?>
                        <?php if($recent_orders->num_rows == 0): ?>
                            <tr><td colspan="7" class="text-center p-4 text-muted">No orders found.</td></tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
