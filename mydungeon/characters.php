<?php
	ob_start();
	session_start();
	include "database.php";
    include "characterfunctions.php";
	print_r($_SESSION);
?>
<html>
	<head>
		<title>my dungeon</title>
	</head>
	<body>
		<h2>Enter Username and Password</h2> 
		<?php
            VerifySession();
            UserCharacters($_SESSION["userid"]);
		?>
        Click here to create a new <a href = "newcharacter.php">character.</a>
        <br>
		Click here to clean <a href = "logout.php">session.</a>
	</body>
</html>