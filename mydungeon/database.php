<?php
$dbServer = "mysql.klasserom.net";
$dbUsername = "knet-elev20015";
$dbPassword = "zer58";
$dbDatabase = "knet-elev20015";

function VerifySession() {
    global $dbServer, $dbUsername, $dbPassword, $dbDatabase;
    if (isset($_SESSION["sessionid"])) {
        $sessionid = $_SESSION["sessionid"];
		$userid = $_SESSION["userid"];
        $conn = new mysqli($dbServer, $dbUsername, $dbPassword, $dbDatabase);
        $result = $conn->query("SELECT * FROM user WHERE session = '$sessionid' AND userid = '$userid'")->fetch_assoc();
        if (!isset($result) || !isset($_SESSION["userid"]) || $result["userid"] != $_SESSION["userid"]) {
            header("Location: login.php");
        }
    } else {
        header("Location: login.php");
    }
};
?>