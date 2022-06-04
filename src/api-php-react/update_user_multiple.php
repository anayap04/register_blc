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
  $id = $reqjsonDecode['id'];
  $userStr = implode("', '", $id);
  $sql = "UPDATE registro SET asistencia = 0 WHERE boleto in ('$userStr')";
  $result = $conn -> query($sql);
  $row_cnt = $result->num_rows;
 
  if ($conn->query($sql) == TRUE) {
    header("Content-Type: application/json; charset=UTF-8");
    http_response_code(201);
    // tell the user
    echo json_encode(array("message" => "update successful"));
  } else {
    header("Content-Type: application/json; charset=UTF-8");
    http_response_code(501);
    // tell the user
    echo json_encode(array("message" => "error updating user"));
  }
  $conn->close();
?>
