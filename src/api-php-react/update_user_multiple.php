<?php
require __DIR__ . '/config.php';
require __DIR__ . '/lib/QueryHelpers.php';

$conn = getDbConnection();

$reqjson = file_get_contents('php://input');
$reqjsonDecode = json_decode($reqjson, true);
$ids = (isset($reqjsonDecode['id']) && is_array($reqjsonDecode['id']))
    ? $reqjsonDecode['id']
    : array();

$success = false;
if (count($ids) > 0) {
    $placeholders = buildInPlaceholders(count($ids));
    $stmt = $conn->prepare("UPDATE registro SET asistencia = 0 WHERE boleto IN ($placeholders)");

    $types = str_repeat('s', count($ids));
    $bindArgs = array($types);
    foreach ($ids as $key => $value) {
        $bindArgs[] = &$ids[$key];
    }
    call_user_func_array(array($stmt, 'bind_param'), $bindArgs);

    $success = $stmt->execute();
    $stmt->close();
}

header("Content-Type: application/json; charset=UTF-8");
if ($success) {
    http_response_code(201);
    echo json_encode(array("message" => "update successful"));
} else {
    http_response_code(501);
    echo json_encode(array("message" => "error updating user"));
}

$conn->close();
