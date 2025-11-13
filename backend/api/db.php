<?php
// api/db.php
$env = parse_ini_file(__DIR__ . '/../.env');
$mysqli = new mysqli(
  $env['DB_HOST'] ?? '127.0.0.1',
  $env['DB_USER'] ?? 'root',
  $env['DB_PASS'] ?? '',
  $env['DB_NAME'] ?? 'food_db'
);
if ($mysqli->connect_errno) {
  header('Content-Type: application/json', true, 500);
  echo json_encode(['error'=>'DB connection failed']);
  exit;
}
$mysqli->set_charset('utf8mb4');
