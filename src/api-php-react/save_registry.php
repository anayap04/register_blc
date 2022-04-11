?>
<?php
include_once "cors.php";
$save = json_decode(file_get_contents("php://input"));
include_once "functions.php";
$res = saveRegistry($save);
echo json_encode($res);