function gameTick() {
    player.update();
    
    camera.update();
    
    enemiesUpdate();
    
    dropsUpdate();
}

var pause = false;
var firstFrame = true;
function animate() {
    if (!pause) {
        gameArea.clear();
        lighting.clear();
        background.clear();

        backgroundDraw();

        decorationsDraw();

        playerProjectilesUpdate();

        dropsDraw();

        enemiesDraw();

        player.draw();

        platformsDraw();

        decorationsForegroundDraw();

        darkness.draw();

        lightsourcesDraw();

        drawEffects();

        hudUpdate();
    } else {
        nextRoom();
        pause = false;
    }
    requestAnimFrame(animate);
}

function gameInit() {
    background.init();
    gameArea.init();
    lighting.init();
    hud.init();
    game = true;
    
    camera = new camera();
    player = new player();
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
    manaBar = new ManaBar();
    healthBar = new HealthBar();
    coinCount = new CoinCount();
    mapHud = new MapHud();
    floorDisplay = new FloorDisplay();
    fade = new Fade();
    
    setInterval(gameTick,18);
    requestAnimFrame(animate);
    
    floorDisplay.count = 0;
    floorDisplay.visible = true;
}

var game = false;
document.addEventListener("keydown",keyDownFunction);
document.addEventListener("keyup",keyUpFunction);