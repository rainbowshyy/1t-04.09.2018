function nextRoom() {
    floorCurrent += 1;
    platforms = [];
    enemies = [];
    decorations = [];
    decorationsForeground = [];
    playerProjectiles = [];
    lightsources = [];
    player.x = 2000;
    player.y = 120;
    map = new mapGenerate(
        levels[levelCurrent].floors[floorCurrent][0],
        levels[levelCurrent].floors[floorCurrent][1],
        levels[levelCurrent].floors[floorCurrent][2],
        levels[levelCurrent].floors[floorCurrent][3],
        levels[levelCurrent].floors[floorCurrent][4],
        levels[levelCurrent].floors[floorCurrent][5],
        levels[levelCurrent].floors[floorCurrent][6]
    );
    map.generate();
    darkness = new darknessShading();
    pause = false;
    floorDisplay.count = 0;
    floorDisplay.visible = true;
    fade.visible = false;
}

function death() {
    floorCurrent = -1;
    player.coins = 0;
    player.health = player.healthMax;
    nextRoom();
}