<?php
require_once 'includes/config.php';

if (!is_logged_in()) {
    redirect('index.php');
}

$user_id = $_SESSION['user_id'];
$user_res = $conn->query("SELECT balance FROM users WHERE id = $user_id");
$user = $user_res->fetch_assoc();

// Get search query
$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';
$where = $search ? "WHERE name LIKE '%$search%' OR category LIKE '%$search%'" : "";

$services_res = $conn->query("SELECT * FROM services $where ORDER BY category ASC, id ASC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services List - <?php echo SITE_NAME; ?></title>
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
        .form-control { background-color: #09090b; border-color: #27272a; color: white; }
        .form-control:focus { background-color: #09090b; border-color: var(--primary-accent); color: white; box-shadow: none; }
    </style>
</head>
<body>
    <div class="sidebar d-none d-md-block">
        <div class="p-4"><h4 class="text-white fw-bold"><i class="bi bi-rocket-takeoff me-2"></i>SMM ELITE</h4></div>
        <nav class="nav flex-column mt-4">
            <a class="nav-link" href="dashboard.php"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
            <a class="nav-link" href="new_order.php"><i class="bi bi-plus-circle me-2"></i> New Order</a>
            <a class="nav-link active" href="services.php"><i class="bi bi-collection me-2"></i> Services</a>
            <a class="nav-link" href="orders.php"><i class="bi bi-list-task me-2"></i> My Orders</a>
            <a class="nav-link" href="add_funds.php"><i class="bi bi-wallet2 me-2"></i> Add Funds</a>
            <div class="mt-auto p-3">
                <a class="nav-link text-danger" href="logout.php"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
            </div>
        </nav>
    </div>

    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold">Services</h2>
            <div class="text-end">
                <span class="text-muted small">Balance</span>
                <h5 class="mb-0 text-primary fw-bold">$<?php echo number_format($user['balance'], 4); ?></h5>
            </div>
        </div>

        <div class="card p-4 mb-4">
            <form method="GET" class="row g-3">
                <div class="col-md-10">
                    <input type="text" name="search" class="form-control" placeholder="Search for services or categories..." value="<?php echo htmlspecialchars($search); ?>">
                </div>
                <div class="col-md-2">
                    <button type="submit" class="btn btn-primary w-100">Search</button>
                </div>
            </form>
        </div>

        <div class="card p-4">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Service Name</th>
                            <th>Category</th>
                            <th>Price per 1k</th>
                            <th>Min/Max</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while($row = $services_res->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $row['api_service_id']; ?></td>
                            <td><span class="small"><?php echo htmlspecialchars($row['name']); ?></span></td>
                            <td><span class="badge bg-dark border border-secondary"><?php echo htmlspecialchars($row['category']); ?></span></td>
                            <td class="fw-bold text-primary">$<?php echo number_format($row['rate_per_1k'], 4); ?></td>
                            <td class="small text-muted"><?php echo number_format($row['min']); ?> / <?php echo number_format($row['max']); ?></td>
                            <td>
                                <a href="new_order.php?service_id=<?php echo $row['id']; ?>" class="btn btn-sm btn-outline-primary">Order</a>
                            </td>
                        </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
