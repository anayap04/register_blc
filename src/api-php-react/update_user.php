<?php
require __DIR__ . '/config.php';

$conn = getDbConnection();

$reqjson = file_get_contents('php://input');
$reqjsonDecode = json_decode($reqjson, true);
$id = isset($reqjsonDecode['id']) ? $reqjsonDecode['id'] : '';

$stmt = $conn->prepare('UPDATE registro SET asistencia = 1 WHERE boleto = ?');
$stmt->bind_param('s', $id);
$success = $stmt->execute();
$stmt->close();

header("Content-Type: application/json; charset=UTF-8");
if ($success) {
    http_response_code(201);
    echo json_encode(array("message" => "update successful"));
} else {
    http_response_code(501);
    echo json_encode(array("message" => "error updating user"));
}

$conn->close();
