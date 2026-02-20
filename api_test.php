<?php
require_once 'includes/config.php';
require_once 'includes/SmmApi.php';

echo "<h2>API Debug Tester</h2>";
echo "<b>API URL:</b> " . API_URL . "<br>";
echo "<b>API KEY:</b> " . (API_KEY == 'your_api_key_here' ? "<span style='color:red;'>NOT SET (PLACEHOLDER)</span>" : "SET") . "<br><br>";

$api = new SmmApi(API_URL, API_KEY);

echo "<b>Attempting to fetch services...</b><br>";
$response = $api->services();

if (!$response) {
    echo "<div style='color:red; background:#fee; padding:10px; border:1px solid red;'>";
    echo "<b>ERROR:</b> Physical connection failed. Check if PHP CURL is enabled or your server has internet access.";
    echo "</div>";
} else {
    $data = json_decode($response, true);
    
    echo "<b>Raw Response:</b><br>";
    echo "<pre style='background:#f4f4f4; padding:10px; border:1px solid #ccc; max-height:300px; overflow:auto;'>";
    echo htmlspecialchars($response);
    echo "</pre>";

    if (isset($data['error'])) {
        echo "<div style='color:red; background:#fee; padding:10px; border:1px solid red;'>";
        echo "<b>API REJECTION:</b> " . $data['error'];
        echo "</div>";
    } else if (is_array($data)) {
        echo "<div style='color:green; background:#efe; padding:10px; border:1px solid green;'>";
        echo "<b>SUCCESS!</b> Received " . count($data) . " services.";
        echo "</div>";
    }
}
?>
