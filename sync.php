<?php
require_once 'includes/config.php';
require_once 'includes/SmmApi.php';

$api = new SmmApi(API_URL, API_KEY);
$services_json = $api->services();

if (!$services_json) {
    die("Error fetching services from API.");
}

$services = json_decode($services_json, true);

if (!is_array($services)) {
    die("Invalid response from API: " . $services_json);
}

// Clear existing services (optional, or update them)
$conn->query("TRUNCATE TABLE services");

$stmt = $conn->prepare("INSERT INTO services (name, type, api_service_id, category, rate_per_1k, min, max) VALUES (?, ?, ?, ?, ?, ?, ?)");

$count = 0;
foreach ($services as $service) {
    if (!isset($service['service'])) continue;

    $api_id = $service['service'];
    $name = $service['name'];
    $type = $service['type'] ?? 'Default';
    $category = $service['category'] ?? 'General';
    $original_rate = (float)$service['rate'];
    $my_rate = $original_rate * PROFIT_MARGIN;
    $min = $service['min'];
    $max = $service['max'];

    $stmt->bind_param("ssisdii", $name, $type, $api_id, $category, $my_rate, $min, $max);
    $stmt->execute();
    $count++;
}

$stmt->close();

echo "Successfully synced $count services with " . ((PROFIT_MARGIN - 1) * 100) . "% profit margin.";
?>
