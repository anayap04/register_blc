<?php
require __DIR__ . '/config.php';
require __DIR__ . '/lib/get_info_query.php';

$conn = getDbConnection();

$evento = isset($_GET['evento']) ? (int) $_GET['evento'] : 0;
$isWheel = !empty($_GET['isWheel']);

$rows = fetchRegistrations($conn, $evento, $isWheel, "asistencia = 1 AND uid LIKE '000%'");

header("Content-Type: application/json; charset=UTF-8");
echo json_encode($rows);

$conn->close();
