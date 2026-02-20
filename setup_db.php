<?php
$host = 'localhost';
$user = 'root';
$pass = '';

// Connection without DB name to create it first
$conn = new mysqli($host, $user, $pass);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create Database
$sql = "CREATE DATABASE IF NOT EXISTS smm_panel";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully or already exists.<br>";
} else {
    die("Error creating database: " . $conn->error);
}

// Switch to the database
$conn->select_db('smm_panel');

// Create Tables
$tables = [
    "users" => "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        balance DECIMAL(10,4) DEFAULT 0.0000,
        api_key VARCHAR(100) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",
    "services" => "CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) DEFAULT 'Default',
        api_service_id INT NOT NULL,
        category VARCHAR(255) DEFAULT 'Other',
        rate_per_1k DECIMAL(16,8) NOT NULL,
        min INT NOT NULL,
        max INT NOT NULL,
        description TEXT DEFAULT NULL
    )",
    "orders" => "CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        service_id INT NOT NULL,
        link VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        charge DECIMAL(20,8) NOT NULL,
        api_order_id INT DEFAULT NULL,
        status ENUM('Pending', 'In Progress', 'Completed', 'Partial', 'Canceled', 'Refunded') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )",
    "payments" => "CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        method VARCHAR(50) NOT NULL,
        amount_usd DECIMAL(20,8) NOT NULL,
        amount_bdt DECIMAL(20,8) NOT NULL,
        transaction_id VARCHAR(100) NOT NULL,
        status ENUM('Pending', 'Completed', 'Rejected') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )"
];

foreach ($tables as $name => $sql) {
    if ($conn->query($sql) === TRUE) {
        echo "Table '$name' checked/created.<br>";
    } else {
        echo "Error creating table '$name': " . $conn->error . "<br>";
    }
}

// Add a dummy user if not exists
$check_user = $conn->query("SELECT id FROM users WHERE username = 'demo'");
if ($check_user->num_rows == 0) {
    $pass_hash = password_hash('123456', PASSWORD_DEFAULT);
    $conn->query("INSERT INTO users (username, password, balance) VALUES ('demo', '$pass_hash', 100.0000)");
    echo "Dummy user 'demo' with password '123456' created.<br>";
}

// Ensure column precision is correct
$conn->query("ALTER TABLE services MODIFY rate_per_1k DECIMAL(20,8) NOT NULL");
$conn->query("ALTER TABLE orders MODIFY charge DECIMAL(20,8) NOT NULL");
$conn->query("ALTER TABLE users MODIFY balance DECIMAL(20,8) DEFAULT 0.00000000");

echo "<br><b>Setup Complete!</b> <a href='index.php'>Go to Login</a>";
?>
