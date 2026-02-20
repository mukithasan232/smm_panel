<?php
require_once 'includes/config.php';
require_once 'includes/SmmApi.php';

$api = new SmmApi(API_URL, API_KEY);

// Fetch orders that are not Completed/Canceled/Refunded
$active_orders_res = $conn->query("SELECT id, api_order_id FROM orders WHERE api_order_id IS NOT NULL AND status IN ('Pending', 'In Progress', 'Partial')");

if ($active_orders_res->num_rows === 0) {
    die("No active orders to sync.");
}

$order_ids_map = [];
$api_order_ids = [];

while ($row = $active_orders_res->fetch_assoc()) {
    $api_order_ids[] = $row['api_order_id'];
    $order_ids_map[$row['api_order_id']] = $row['id'];
}

// SMM panel APIs usually allow multi-status check
$status_json = $api->multiStatus($api_order_ids);
$status_data = json_decode($status_json, true);

if (!$status_data || !is_array($status_data)) {
    die("Invalid response from API.");
}

$updated_count = 0;
foreach ($status_data as $api_id => $data) {
    if (isset($data['status'])) {
        $new_status = $data['status'];
        $local_id = $order_ids_map[$api_id];
        
        $stmt = $conn->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $new_status, $local_id);
        $stmt->execute();
        $updated_count++;
    }
}

echo "Successfully updated $updated_count orders.";
?>
