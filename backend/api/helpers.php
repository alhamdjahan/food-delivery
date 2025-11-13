<?php
// api/helpers.php
function json_response($data, $status = 200) {
  header('Content-Type: application/json');
  http_response_code($status);
  echo json_encode($data);
  exit;
}

function cors_headers() {
  $env = @parse_ini_file(__DIR__ . '/../.env');
  $origin = $env['CORS_ORIGIN'] ?? '*';
  header("Access-Control-Allow-Origin: $origin");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
}

function get_json_body() {
  return json_decode(file_get_contents('php://input'), true) ?? [];
}

function require_fields($body, $fields) {
  foreach ($fields as $f) {
    if (!isset($body[$f]) || $body[$f] === '') {
      json_response(['error' => "Missing field: $f"], 422);
    }
  }
}

function make_jwt($payload, $secret) {
  $header = rtrim(strtr(base64_encode(json_encode(['alg'=>'HS256','typ'=>'JWT'])), '+/', '-_'), '=');
  $body = rtrim(strtr(base64_encode(json_encode($payload)), '+/', '-_'), '=');
  $sig = rtrim(strtr(base64_encode(hash_hmac('sha256', "$header.$body", $secret, true)), '+/', '-_'), '=');
  return "$header.$body.$sig";
}

function read_jwt($token, $secret) {
  $parts = explode('.', $token);
  if (count($parts) !== 3) return null;
  [$h,$b,$s] = $parts;
  $sig = rtrim(strtr(base64_encode(hash_hmac('sha256', "$h.$b", $secret, true)), '+/', '-_'), '=');
  if (!hash_equals($sig, $s)) return null;
  return json_decode(base64_decode(str_replace(['-','_'], ['+','/'], $b)), true);
}
