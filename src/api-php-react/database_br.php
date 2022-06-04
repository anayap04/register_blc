<?php
$servername = "sql725.main-hosting.eu";
$username =  "u368053577_uid";
$password = "?J8vEs9n";
$dbname = "u368053577_registration";
include 'generate_qr.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$jsonReqUrl  = "php://input";
$reqjson = file_get_contents($jsonReqUrl);
$reqjsonDecode = json_decode($reqjson, true);
$boleto = $reqjsonDecode['boleto'];
$nombre = $reqjsonDecode['nombre'];
$apellido = $reqjsonDecode['apellido'];
$uid = $reqjsonDecode['uid'];
$evento = $reqjsonDecode['evento'];
$email = $reqjsonDecode['email'];
$telefono = $reqjsonDecode['telefono'];
$sql = "INSERT INTO registro (boleto, nombre, apellido, uid, evento, email, telefono) VALUES ('$boleto', '$nombre', '$apellido', '$uid', '$evento', '$email', '$telefono')";


if ($conn->query($sql) == TRUE) {
    sendMail($email, $nombre, $apellido, $boleto);
    header("Content-Type: application/json; charset=UTF-8");
    http_response_code(201);
    // tell the user
    echo json_encode(array("message" => "User created"));
} else {
    header("Content-Type: application/json; charset=UTF-8");
    http_response_code(503);
    // tell the user
    echo json_encode(array("message" => "Unable to add user"));
}

$conn->close();
?>
