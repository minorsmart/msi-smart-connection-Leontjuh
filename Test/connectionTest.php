<?php
include 'db_connection.php';
$conn = OpenCon();
echo "Connected Successfully";
$sql = "SELECT * FROM tbltest";
if ($result = $conn -> query($sql)) {
    while ($row = $result -> fetch_row()) {
      printf ("(%s %s %s %s),\n", $row[0], $row[1], $row[2], $row[3]);
    }
    $result -> free_result();
  }
  
  
CloseCon($conn);
?>