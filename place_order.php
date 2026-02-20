<?php
require_once 'includes/config.php';
require_once 'includes/SmmApi.php';

if (!is_logged_in()) {
    redirect('index.php');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('new_order.php');
}

$user_id = $_SESSION['user_id'];
$service_id = (int)$_POST['service_id'];
$link = $conn->real_escape_string($_POST['link']);
$quantity = (int)$_POST['quantity'];

// Fetch service details
$service_res = $conn->query("SELECT * FROM services WHERE id = $service_id");
if ($service_res->num_rows === 0) {
    die("Invalid service selected.");
}
$service = $service_res->fetch_assoc();

// Validate quantity
if ($quantity < $service['min'] || $quantity > $service['max']) {
    die("Quantity must be between {$service['min']} and {$service['max']}.");
}

// Calculate charge
$charge = ($quantity / 1000) * $service['rate_per_1k'];

// Check user balance
$user_res = $conn->query("SELECT balance FROM users WHERE id = $user_id");
$user = $user_res->fetch_assoc();

if ($user['balance'] < $charge) {
    die("Insufficient balance. Total charge: $" . number_format($charge, 4));
}

// Deduct balance
$conn->query("UPDATE users SET balance = balance - $charge WHERE id = $user_id");

// Create local order
$stmt = $conn->prepare("INSERT INTO orders (user_id, service_id, link, quantity, charge, status) VALUES (?, ?, ?, ?, ?, 'Pending')");
$stmt->bind_param("iisid", $user_id, $service_id, $link, $quantity, $charge);
$stmt->execute();
$local_order_id = $conn->insert_id;

// Call SMMGen API
$api = new SmmApi(API_URL, API_KEY);
$api_response_json = $api->order([
    'service' => $service['api_service_id'],
    'link' => $link,
    'quantity' => $quantity
]);

$api_response = json_decode($api_response_json, true);

if (isset($api_response['order'])) {
    // Success: Update order with API ID
    $api_order_id = $api_response['order'];
    $conn->query("UPDATE orders SET api_order_id = $api_order_id, status = 'In Progress' WHERE id = $local_order_id");
    
    $_SESSION['success'] = "Order placed successfully! Order ID: #$local_order_id";
    redirect('orders.php');
} else {
    // API Failure: Refund user balance and mark order as canceled
    $error_msg = $api_response['error'] ?? 'Unknown API error';
    $conn->query("UPDATE users SET balance = balance + $charge WHERE id = $user_id");
    $conn->query("UPDATE orders SET status = 'Canceled' WHERE id = $local_order_id");
    
    die("API Error: $error_msg. Your balance has been refunded.");
}
?>
