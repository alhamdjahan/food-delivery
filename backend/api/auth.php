<?php
// api/auth.php
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

cors_headers();
$env = parse_ini_file(__DIR__ . '/../.env');
$secret = $env['JWT_SECRET'] ?? 'devsecret';

$path = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') json_response([], 204);

// register
if (strpos($path, '/auth/register') !== false && $method === 'POST') {
  $body = get_json_body();
  require_fields($body, ['name','email','password']);
  $hash = password_hash($body['password'], PASSWORD_BCRYPT);
  $stmt = $mysqli->prepare("INSERT INTO users (name,email,password_hash) VALUES (?,?,?)");
  $stmt->bind_param('sss', $body['name'], $body['email'], $hash);
  if ($stmt->execute()) json_response(['message'=>'registered'], 201);
  json_response(['error'=>'could not register (maybe email exists)'], 409);
}

// login
if (strpos($path, '/auth/login') !== false && $method === 'POST') {
  $body = get_json_body();
  require_fields($body, ['email','password']);
  $stmt = $mysqli->prepare("SELECT id,name,password_hash FROM users WHERE email=? LIMIT 1");
  $stmt->bind_param('s', $body['email']);
  $stmt->execute();
  $res = $stmt->get_result()->fetch_assoc();
  if (!$res || !password_verify($body['password'], $res['password_hash'])) {
    json_response(['error'=>'Invalid credentials'], 401);
  }
  $token = make_jwt(['uid'=>$res['id'],'name'=>$res['name'],'iat'=>time()], $secret);
  json_response(['token'=>$token, 'name'=>$res['name']]);
}

// fallback
json_response(['error'=>'Not Found'], 404);
