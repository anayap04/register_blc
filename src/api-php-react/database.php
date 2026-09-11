<?php
require __DIR__ . '/config.php';
require __DIR__ . '/lib/TicketCodes.php';
require __DIR__ . '/generate_qr.php'; // provides sendMail() for the QR-coded confirmation email

function sendPlainConfirmationEmail($email, $nombre) {
    $subject = 'Registro Exitoso';
    $message = '<html><body style="background-color:#500035">';
    $message .= '<div><img src="http://seminario-blc.online/api-php-react/logo_es.png" alt="logo" width=350 height=100 align="center"/></div>';
    $message .= '<h1 style="color:#9E845B;font-size:24px;">¡Hola ' . htmlspecialchars($nombre) . ' !</h1>';
    $message .= '<p style="color:#F9F5F1;font-size:16px;">Su registro fue exitoso. Te esperamos </p>';
    $message .= '</body></html>';

    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From: noreply@seminarios-blc.com' . "\r\n";
    $headers .= 'Reply-To: noreply@seminarios-blc.com' . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();

    mail($email, $subject, $message, $headers);
}

$conn = getDbConnection();

$reqjson = file_get_contents('php://input');
$reqjsonDecode = json_decode($reqjson, true);
$boleto = isset($reqjsonDecode['boleto']) ? $reqjsonDecode['boleto'] : '';
$nombre = isset($reqjsonDecode['nombre']) ? $reqjsonDecode['nombre'] : '';
$apellido = isset($reqjsonDecode['apellido']) ? $reqjsonDecode['apellido'] : '';
$uid = isset($reqjsonDecode['uid']) ? $reqjsonDecode['uid'] : '';
$evento = isset($reqjsonDecode['evento']) ? $reqjsonDecode['evento'] : '';
$email = isset($reqjsonDecode['email']) ? $reqjsonDecode['email'] : '';
$telefono = isset($reqjsonDecode['telefono']) ? $reqjsonDecode['telefono'] : '';

header('Content-Type: application/json; charset=UTF-8');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(array('message' => 'Invalid email'));
    exit;
}

// evento 9 is the "ME" site variant (see src/components/SeminarME/FormME.js),
// which draws from its own, separate pool of purchased ticket codes.
$isMeEvent = ((string) $evento === '9');
$codesFile = $isMeEvent
    ? __DIR__ . '/data/available-codes-me.json'
    : __DIR__ . '/data/available-codes.json';

if (!isValidTicketCode($boleto, loadTicketCodes($codesFile))) {
    http_response_code(503);
    echo json_encode(array('message' => 'Invalid code'));
    exit;
}

$stmt = $conn->prepare(
    'INSERT INTO registro (boleto, nombre, apellido, uid, evento, email, telefono, asistencia) VALUES (?, ?, ?, ?, ?, ?, ?, NULL)'
);
$stmt->bind_param('sssssss', $boleto, $nombre, $apellido, $uid, $evento, $email, $telefono);
$success = $stmt->execute();
$stmt->close();

if ($success) {
    // evento 3 (São Paulo, Brasil) gets a QR-coded confirmation email; every
    // other event gets a plain confirmation email. This mirrors the previous
    // split between database.php and database_br.php, now branching on
    // evento in one place instead of the frontend picking between two URLs.
    if ((string) $evento === '3') {
        sendMail($email, $nombre, $apellido, $boleto);
    } else {
        sendPlainConfirmationEmail($email, $nombre);
    }
    http_response_code(201);
    echo json_encode(array('message' => 'User created'));
} else {
    http_response_code(503);
    echo json_encode(array('message' => 'Unable to add user'));
}

$conn->close();
