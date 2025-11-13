<?php
// api/index.php
require_once __DIR__ . '/helpers.php';
cors_headers();
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = preg_replace('#^/food-delivery/api#','', $path); // adjust if needed

// route to auth endpoints (auth.php handles routing inside)
if (strpos($path, '/auth') === 0) {
  require __DIR__ . '/auth.php';
  exit;
}

// simple health
if ($path === '/health' || $path === '/health.php') {
  header('Content-Type: application/json');
  echo json_encode(['ok'=>true]);
  exit;
}

header('Content-Type: application/json', true, 404);
echo json_encode(['error'=>'Not found','path'=>$path]);
