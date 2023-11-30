<?php
	ob_start();
	session_start();
	include "database.php";
    include "characterfunctions.php";
	print_r($_SESSION);
    VerifySession();
    CharacterJSON();
?>
<html>
	<head>
		<title>my dungeon</title>
        <link rel="stylesheet" href="stylesheet.css">
	</head>
	<body>
        
        <h1>ass</h1>
        <div id="Wrapper"></div>
	</body>
</html>
<script type="text/javascript" src="characterform.js"></script>