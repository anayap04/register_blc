<?php
require __DIR__ . '/config.php';

$conn = getDbConnection();

$reqjson = file_get_contents('php://input');
$reqjsonDecode = json_decode($reqjson, true);
$user = isset($reqjsonDecode['user']) ? $reqjsonDecode['user'] : '';
$pass = isset($reqjsonDecode['password']) ? $reqjsonDecode['password'] : '';

// NOTE: passwords are compared in plain text against the `users` table.
// This was not changed as part of this pass -- migrating to password_hash()/
// password_verify() requires re-hashing existing stored passwords, which is
// a data migration outside the scope of this change. See README "Known
// limitations" section.
$stmt = $conn->prepare('SELECT * FROM users WHERE user = ? AND password = ?');
$stmt->bind_param('ss', $user, $pass);
$stmt->execute();
$result = $stmt->get_result();
$row_cnt = $result->num_rows;
$stmt->close();

header("Content-Type: application/json; charset=UTF-8");
if ($row_cnt === 1) {
    http_response_code(201);
    echo json_encode(array("message" => "login successful"));
} else {
    http_response_code(501);
    echo json_encode(array("message" => "error login"));
}

$conn->close();
