<?php
	ob_start();
	session_start();
	include "database.php";
	print_r($_SESSION);
?>
<html>
	<head>
		<title>my dungeon</title>
	</head>
	<body>
		<h2>Enter Username and Password</h2> 
		<?php
			$msg = '';
			if (isset($_POST['login']) && !empty($_POST['username']) && !empty($_POST['password'])) {
				
				$conn = new mysqli($dbServer, $dbUsername, $dbPassword, $dbDatabase);
				$username = $conn->real_escape_string($_POST["username"]);
				$result = $conn->query("SELECT * FROM user WHERE username = '$username'")->fetch_assoc();
				if(!isset($result) || !password_verify($_POST["password"], $result["password"])) {
                    $msg = 'Wrong username or password';
					$_SESSION = array();
				} else {
					$_SESSION['username'] = $username;
                    $_SESSION["userid"] = $result["userid"];
                    $sessionid = session_id();
					$_SESSION["sessionid"] = $sessionid;
                    $conn->query("UPDATE user SET session = '$sessionid' WHERE username = '$username'");
                    header("Location: characters.php");
				}
				
				$conn->close();
			}
		?>
		<form role = "form" action = "<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method = "post">
			<h4><?php echo $msg; ?></h4>
			<input type = "text" class = "form-control" name = "username" placeholder = "username" required autofocus>
			<br>
			<input type = "password" name = "password" placeholder = "password" required>
			<button type = "submit" name = "login">Login</button>
		</form>
		Don't have a user? Click here to <a href = "register.php">register.</a>
		<br>
		Click here to clean <a href = "logout.php">Session.</a>
	</body>
</html>