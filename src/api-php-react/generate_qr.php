<?php
function sendMail($mail, $name, $last, $code) {
  // Llamando a la libreria PHPQRCODE
  include('phpqrcode/qrlib.php'); 
  $tempDir = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR;
  $rn = strtotime(date("Y-m-d H:i:s"));
  $pngAbsoluteFilePath = $tempDir . $rn;

  // Exportamos una imagen llamado resultado.png que contendra el valor de la avriable $content
  QRcode::png($code, $pngAbsoluteFilePath .'.png',QR_ECLEVEL_L,10,2);

  $to      =  $mail;
  $subject = 'Registro Exitoso';

  $message = '<html><body style="background-color:#500035">';
  $message .= '<div><img src="http://seminario-blc.online/api-php-react/logo.png" alt="logo" width=350 height=100 align="center"/></div>';
  $message .= '<h1 style="color:#9E845B;font-size:24px;">Olá! '. $name .' </h1>';
  $message .= '<p style="color:#F9F5F1;font-size:16px;">O seu cadastro foi realizado com sucesso. </p>';
  $message .= '<p style="color:#F9F5F1;font-size:16px;">Por favor, apresente este código para ter acesso ao evento.</p>';
  $message .= '<div><img src="http://seminario-blc.online/api-php-react/img/'. $rn .'.png" alt="resultado" align="center"/></div>';
  $message .= '<p style="color:#F9F5F1;font-size:16px;">Esperamos você!</p>';
  $message .= '</body></html>';

  $headers = 'From: noreply@seminarios-blc.com' . "\r\n" .
  'Reply-To: wnoreply@seminarios-blc.com' . "\r\n" .
  'X-Mailer: PHP/' . phpversion();
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

  echo mail($to, $subject, $message, $headers);
}
?>