<?php
include 'generate_qr.php';
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

sendMail($email, $nombre, $apellido, $boleto)
?>