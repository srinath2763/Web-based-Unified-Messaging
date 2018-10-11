<?php

$name = $_POST['name'];
$email = $_POST['email'];
$id = $_POST['id'];
echo($email.$name.$id);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chat";
$sql = "INSERT INTO user_information(`FULL_NAME`,`TOKEN_ID`,`EMAIL`) VALUES('".$name."','".$id."','".$email."')";
$mysqli = new mysqli($servername, $username, $password, $dbname);

if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
	console.log("Errormessage");
    exit();
}

if (!$mysqli->query($sql)) {
    printf("Errormessage: %s\n", $mysqli->error);
}

/* close connection */
$mysqli->close();
?>
