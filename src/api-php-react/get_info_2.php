<?php
  $servername = "***REMOVED-DB-HOST***";
  $username =  "***REMOVED-DB-USER***";
  $password = "***REMOVED-DB-PASSWORD***";
  $dbname = "***REMOVED-DB-NAME***";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $evento = $_GET['evento'];
  $isWheel = $_GET['isWheel'];

  if ($isWheel) {
    $sql = "SELECT * FROM registro WHERE evento=$evento AND asistencia = 1 AND boleto LIKE '21%'";
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
