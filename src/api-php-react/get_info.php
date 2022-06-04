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

  $evento = $_GET['evento'];
  $isWheel = $_GET['isWheel'];

  if ($isWheel) {
    $sql = "SELECT * FROM registro WHERE evento=$evento AND asistencia = 1";
  } else {
    $sql = "SELECT * FROM registro WHERE evento=$evento AND asistencia IS NULL";
  }

  if ($result = $conn -> query($sql)) {
    $emparray = [];
    while($row =mysqli_fetch_assoc($result))
    {
      $emparray[] = $row; 
    }
    echo json_encode($emparray);
  }

  $conn->close();
?>
