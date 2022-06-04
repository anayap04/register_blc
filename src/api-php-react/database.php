<?php
$servername = "sql725.main-hosting.eu";
$username =  "u368053577_uid";
$password = "?J8vEs9n";
$dbname = "u368053577_registration";

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
$sql = "INSERT INTO registro (boleto, nombre, apellido, uid, evento, email, telefono, asistencia) VALUES ('$boleto', '$nombre', '$apellido', '$uid', '$evento', '$email', '$telefono', NULL)";


if ($conn->query($sql) == TRUE) {
    $to      = $email;
    $subject = 'Registro Exitoso';
    $message = '<html><body style="background-color:#500035">';
    $message .= '<div><img src="http://seminario-blc.online/api-php-react/logo_es.png" alt="logo" width=350 height=100 align="center"/></div>';
    $message .= '<h1 style="color:#9E845B;font-size:24px;">¡Hola '. $nombre .' !</h1>';
    $message .= '<p style="color:#F9F5F1;font-size:16px;">Su registro fue exitoso. Te esperamos </p>';
    $message .= '</body></html>';
    $headers = 'From: noreply@seminarios-blc.com' . "\r\n" .
    'Reply-To: wnoreply@seminarios-blc.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    mail($to, $subject, $message, $headers);
    header("Content-Type: application/json; charset=UTF-8");
    http_response_code(201);
    // tell the user
    echo json_encode(array("message" => "User created"));
} else {
    header("Content-Type: application/json; charset=UTF-8");
    http_response_code(503);
    // tell the user
    echo json_encode(array("message" => $sql));
}

$conn->close();
?>
