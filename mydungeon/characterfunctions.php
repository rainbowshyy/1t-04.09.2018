<?php

function UserCharacters($userid) {
    $userid = intval($userid);
    global $dbServer, $dbUsername, $dbPassword, $dbDatabase;
    
    $sessionid = $_SESSION["sessionid"];
    $conn = new mysqli($dbServer, $dbUsername, $dbPassword, $dbDatabase);
    $result = $conn->query("SELECT * FROM characteruser");
    if ($result->num_rows > 0) {
        while ($character = $result->fetch_assoc()) {
            echo $character["namefirst"]," ",$character["namelast"],"<br>";
        }
    }
}

function mysqliJSON($name, $idName) {
    global $dbServer, $dbUsername, $dbPassword, $dbDatabase;
    $conn = new mysqli($dbServer, $dbUsername, $dbPassword, $dbDatabase);
    
    $result = $conn->query("SELECT * FROM $name ORDER BY $idName ASC");
    $array = array();
    if ($result->num_rows > 0) {
        while ($object = $result->fetch_assoc()) {
            array_push($array,$object);
        }
    }
    echo "<script type='text/javascript'>var ",$name,"Array = ",json_encode($array),";</script> \n";
}

function CharacterJSON() {
    mysqliJSON("armor","armorid");
    mysqliJSON("armortype","armortypeid");
    mysqliJSON("class","classid");
    mysqliJSON("classlevel","classid");
    mysqliJSON("damage","damageid");
    mysqliJSON("dice","diceid");
    mysqliJSON("classskill","classid");
    mysqliJSON("junctionsubracearmor","subraceid");
    mysqliJSON("junctionsubraceimmunity","subraceid");
    mysqliJSON("junctionsubracelanguage","subraceid");
    mysqliJSON("junctionsubracelanguageoption","subraceid");
    mysqliJSON("junctionsubracetrait","subraceid");
    mysqliJSON("junctionsubraceresistance","subraceid");
    mysqliJSON("junctionsubraceskill","subraceid");
    mysqliJSON("junctionsubraceskilloption","subraceid");
    mysqliJSON("junctionsubracetool","subraceid");
    mysqliJSON("junctionsubraceweapon","subraceid");
    mysqliJSON("junctionsubraceweaponoption","subraceid");
    mysqliJSON("junctiontraitarmor","traitid");
    mysqliJSON("junctiontraitdamageimmunity","traitid");
    mysqliJSON("junctiontraitdamageresistance","traitid");
    mysqliJSON("junctiontraitspell","traitid");
    mysqliJSON("junctiontraitstatusadvantage","traitid");
    mysqliJSON("junctiontraittool","traitid");
    mysqliJSON("junctiontraitweapon","traitid");
    mysqliJSON("junctionweaponproperty","weaponid");
    mysqliJSON("language","languageid");
    mysqliJSON("race","raceid");
    mysqliJSON("size","sizeid");
    mysqliJSON("skill","skillid");
    mysqliJSON("source","sourceid");
    mysqliJSON("spell","spellid");
    mysqliJSON("spellclass","spellid");
    mysqliJSON("spellschool","spellschoolid");
    mysqliJSON("subclass","subclassid");
    mysqliJSON("subclasslevel","subclassid");
    mysqliJSON("subrace","subraceid");
    mysqliJSON("tool","toolid");
    mysqliJSON("tooltype","tooltypeid");
    mysqliJSON("trait","traitid");
    mysqliJSON("weapon","weaponid");
    mysqliJSON("weaponproperty","weaponpropertyid");
}
?>