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
                $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
				$result = $conn->query("SELECT * FROM user WHERE username = '$username'")->fetch_assoc();
				
				if(isset($result)) {
				  $msg = 'That user already exists.';
				} else if ((strlen($_POST["username"]) < 3 && strlen($_POST["username"]) > 15) || !preg_match("/[A-Za-z0-9]/", $username)) {
					$msg = "Username needs to be 3 - 15 characters and can only contain letters from a-z and numbers.";
				} else if ($_POST["password"] != $_POST["password2"]) {
					$msg = "Passwords do not match.";
				} else if (strlen($_POST["password"]) < 4) {
					$msg = "Password needs atleast 4 characters.";
				} else {
                    $_SESSION = array();
				    $msg = "Registered as $username.";
                    $conn->query("INSERT INTO user (userid, username, password) VALUES (NULL, '$username', '$password')");
				}
				
				$conn->close();
			}
		?>
		<form role = "form" action = "<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method = "post">
			<h4><?php echo $msg; ?></h4>
			<input type = "text" class = "form-control" name = "username" placeholder = "username" required autofocus>
			<br>
			<input type = "password" name = "password" placeholder = "password" required>
			<br>
			<input type = "password" name = "password2" placeholder = "confirm password" required>
			<button type = "submit" name = "login">Register</button>
		</form>
		Already have a user? Click here to <a href = "login.php">login.</a>
		<br>
		Click here to clean <a href = "logout.php">Session.</a>
	</body>
</html>