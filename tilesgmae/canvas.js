//Percent of width and height
var percentW;

//Defining the canvas area
var gameArea = {
    canvas : document.createElement("canvas"),
    init : function () {
        percentW = document.documentElement.clientWidth / 460;
        this.canvas.width = 460 * percentW;
        this.canvas.height = 220 * percentW;
        this.context = this.canvas.getContext("2d");
        document.getElementById("gameContainer").appendChild(this.canvas);
        this.interval = setInterval(gameTick, 20);
    },
    clear : function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


//defining camera object
var camera = {
    x : 0,
    y : 0,
    xTrue : 0,
    yTrue : 0,
}

//Find mouse X and mouse Y
var mouseX, mouseY;
function mousePosUpdate(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function playerMovement(e) {
    e.preventDefault();
    player.findPath(mouseHover.tile.xTrue,mouseHover.tile.yTrue);
    return false;
}

var keyLeft = false, keyUp = false, keyRight = false, keyDown = false, lastKey;

function arrowKeyDown(e) {
    var key = e.keyCode;
    if (key == 37) {
        keyLeft = true;
        lastKey = "left";
    } else if (key == 38) {
        keyUp = true;
        lastKey = "up";
    } else if (key == 39) {
        keyRight = true;
        lastKey = "right";
    } else if (key == 40) {
        keyDown = true;
        lastKey = "down";
    }
}

function arrowKeyUp(e) {
    var key = e.keyCode;
    if (key == 37) {
        keyLeft = false;
        getLastKey();
    } else if (key == 38) {
        keyUp = false;
        getLastKey();
    } else if (key == 39) {
        keyRight = false;
        getLastKey();
    } else if (key == 40) {
        keyDown = false;
        getLastKey();
    }
}

function getLastKey() {
    if (keyLeft) {
        lastKey = "left";
    } else if (keyUp) {
        lastKey = "up";
    } else if (keyRight) {
        lastKey = "right";
    } else if (keyDown) {
        lastKey = "down";
    } else {
        lastKey = "";
    }
}

//Defining the visuals of the player
var player;
function player() {
    this.width = 5 * percentW;
    this.height = 5 * percentW;
    this.x = 75 * percentW;
    this.y = 60 * percentW;
    this.moving = false;
    this.movingStage = 0;
    this.direction = "no";
    this.draw = function() {
        ctx = gameArea.context;
        ctx.save();
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
    this.update = function() {
        this.tile = getTile(this.x + percentW,this.y + percentW);
        this.xTrue = this.tile.xTrue;
        this.yTrue = this.tile.yTrue;
    }
    this.movement = function() {
        if (!this.moving) {
            if (lastKey == "left" && mapCurrent.tiles[this.yTrue][this.xTrue - 1].solid == false){
                this.direction = "left";
                this.moving = true;
            } else if (lastKey == "up" && mapCurrent.tiles[this.yTrue - 1][this.xTrue].solid == false) {
                this.direction = "up";
                this.moving = true;
            } else if (lastKey == "right" && mapCurrent.tiles[this.yTrue][this.xTrue + 1].solid == false) {
                this.direction = "right";
                this.moving = true;
            } else if (lastKey == "down" && mapCurrent.tiles[this.yTrue + 1][this.xTrue].solid == false) {
                this.direction = "down";
                this.moving = true;
            }
            this.movingStage = 0;
        } else {
            if (this.direction == "left") {
                if (camera.xTrue == 0 || (camera.xTrue + 23 == mapCurrent.x && this.x > 5 * 11 * percentW)) {
                    player.x += -0.5 * percentW;
                } else {
                    camera.x += 0.5 * percentW;
                }
            } else if (this.direction == "right") {
                if ((camera.xTrue == 0 && this.x < 5 * 11 * percentW) || camera.xTrue + 23 == mapCurrent.x) {
                    player.x += 0.5 * percentW;
                } else {
                    camera.x += -0.5 * percentW;
                }
            } else if (this.direction == "down") {
                if ((camera.yTrue == 0 && this.y < 5 * 5 * percentW) || camera.yTrue + 11 == mapCurrent.y) {
                    player.y += 0.5 * percentW;
                } else {
                    camera.y += -0.5 * percentW;
                }
            } else if (this.direction == "up") {
                if (camera.yTrue == 0 || (camera.yTrue + 11 == mapCurrent.y && this.y > 5 * 5 * percentW)) {
                    player.y += -0.5 * percentW;
                } else {
                    camera.y += 0.5 * percentW;
                }
            }
            this.movingStage += 1;
            if (this.movingStage == 10) {
                this.moving = false;
                this.movingStage = 0;
                camera.xTrue = getTile(percentW,percentW).xTrue;
                camera.yTrue = getTile(percentW,percentW).yTrue;
                camera.x = camera.xTrue * percentW * -5;
                camera.y = camera.yTrue * percentW * -5;
                this.x = this.xTrue * percentW * 5 + camera.x;
                this.y = this.yTrue * percentW * 5 + camera.y;
            }
        }
    }
    this.findPath = function(x,y) {
        this.pathTiles = [];
        var pathCurrentTile;
        
        var iy, ix, xTarget = x, yTarget = y;
        for (iy = 0; iy < mapCurrent.y; iy++) {
            var pathTilesRow = [];
            for (ix = 0; ix < mapCurrent.x; ix++) {
                pathTilesRow.push(new pathTile(ix,iy));
            }
            this.pathTiles.push(pathTilesRow);
        }
        for (iy = 0; iy < mapCurrent.y; iy++) {
            for (ix = 0; ix < mapCurrent.x; ix++) {
                this.pathTiles[iy][ix].gScore = Math.abs(xTarget - ix) + Math.abs(yTarget - iy);
                this.pathTiles[iy][ix].closed = false;
                this.pathTiles[iy][ix].solid = false;
                this.pathTiles[iy][ix].open = false;
                if (0 < ix) {
                    if (mapCurrent.tiles[iy][ix-1].solid == false) {
                        this.pathTiles[iy][ix].neighbors.push(this.pathTiles[iy][ix-1]);
                    }
                }
                if (ix < mapCurrent.x - 1) {
                    if (mapCurrent.tiles[iy][ix+1].solid == false) {
                        this.pathTiles[iy][ix].neighbors.push(this.pathTiles[iy][ix+1]);
                    }
                }
                if (0 < iy) {
                    if (mapCurrent.tiles[iy-1][ix].solid == false) {
                        this.pathTiles[iy][ix].neighbors.push(this.pathTiles[iy-1][ix]);
                    }
                }
                if (iy < mapCurrent.y - 1) {
                    if (mapCurrent.tiles[iy+1][ix].solid == false) {
                        this.pathTiles[iy][ix].neighbors.push(this.pathTiles[iy+1][ix]);
                    }
                }
                if (ix == this.xTrue && iy == this.yTrue) {
                    this.pathTiles[iy][ix].start = true;
                    pathCurrentTile = this.pathTiles[iy][ix];
                    this.pathTiles[iy][ix].closed = true;
                    pathCurrentTile.fScore = 0;
                }
                if (ix == xTarget && iy == yTarget) {
                    this.pathTiles[iy][ix].target = true;
                }
            }
        }
        var playerPathSearching = true;
        this.pathOpenTiles = [];
        while (playerPathSearching == true) {
            var i, lowestScore, tileIndex, pathX, pathY;
            pathX = pathCurrentTile.x;
            pathY = pathCurrentTile.y;
            
            for (i=0; i<pathCurrentTile.neighbors.length; i++) {
                if (pathCurrentTile.neighbors[i].open == false && pathCurrentTile.neighbors[i].closed == false) {
                    this.pathOpenTiles.push(pathCurrentTile.neighbors[i]);
                    this.pathOpenTiles[this.pathOpenTiles.length-1].open = true;
                    this.pathOpenTiles[this.pathOpenTiles.length-1].fScore = pathCurrentTile.fScore + 1;
                    this.pathOpenTiles[this.pathOpenTiles.length-1].score = this.pathOpenTiles[this.pathOpenTiles.length-1].fScore + this.pathOpenTiles[this.pathOpenTiles.length-1].gScore;
                    this.pathOpenTiles[this.pathOpenTiles.length-1].parentTile = pathCurrentTile;
                } else if (pathCurrentTile.neighbors[i].score > pathCurrentTile.fScore + 1 + pathCurrentTile.neighbors[i].gScore && pathCurrentTile.neighbors[i].open == true) {
                    this.pathOpenTiles.push(pathCurrentTile.neighbors[i]);
                    this.pathOpenTiles[this.pathOpenTiles.length-1].fScore = pathCurrentTile.fScore + 1;
                    this.pathOpenTiles[this.pathOpenTiles.length-1].score = this.pathOpenTiles[this.pathOpenTiles.length-1].fScore + this.pathOpenTiles[this.pathOpenTiles.length-1].gScore;
                    this.pathOpenTiles[this.pathOpenTiles.length-1].parentTile = pathCurrentTile;
                }
            }
            
            tileIndex = 10;
            lowestScore = 9999;
            highestFScore = 0;
            for (i=0; i<this.pathOpenTiles.length; i++) {
                if (this.pathOpenTiles[i].score < lowestScore || (this.pathOpenTiles[i].score == lowestScore && this.pathOpenTiles[i].fScore > highestFScore)) {
                    tileIndex = i;
                    lowestScore = this.pathOpenTiles[tileIndex].score;
                    highestFScore = this.pathOpenTiles[tileIndex].fScore;
                }
            }
            
            pathCurrentTile = this.pathOpenTiles[tileIndex];
            pathCurrentTile.closed = true;
            pathCurrentTile.open = false;
            this.pathOpenTiles.splice(tileIndex,1);
            
            if (pathCurrentTile.target == true) {
                playerPathSearching = false;
            }
        }
        var playerPathDrawing = true, playerPathMovement = [];
        while (playerPathDrawing == true) {
            mapCurrent.tiles[pathCurrentTile.y][pathCurrentTile.x].path = true;  //THE WHITE PATH COLORED WHEN FOUND
            playerPathMovement.push({x : pathCurrentTile.x, y : pathCurrentTile.y});
            if (pathCurrentTile.start == true) {
                playerPathDrawing = false;
            } else {
                pathCurrentTile = pathCurrentTile.parentTile;
            }
        }
        return playerPathMovement;
    }
}

function pathTile(x,y) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
}

function tile(x,y,id) {
    this.xTrue = x;
    this.yTrue = y;
    
    this.x = x * 5 * percentW;
    this.y = y * 5 * percentW;
    this.width = 5 * percentW;
    this.height = 5 * percentW;
    this.id = id;
    this.solid = tiles[id].solid;
    this.color = tiles[this.id].color;
    this.path = false;
    this.draw = function() {
        if ((this.x + camera.x > gameArea.canvas.width || this.y + camera.y > gameArea.canvas.height || this.x + camera.x + this.width < 0 || this.y + camera.y + this.height < 0) == false) {
            ctx = gameArea.context;
            ctx.save();
            ctx.translate(camera.x,camera.y);
            ctx.fillStyle = this.color;
            if (this.path) {
                ctx.fillStyle = "rgb(250,250,250)";
            }
            ctx.fillRect(this.x,this.y,this.width,this.height);
            ctx.restore();
            this.path = false;
        }
    }
}

var mapCurrent;
function map(mapTiles) {
    this.tilesID = mapTiles[0];
    this.x = mapTiles[1];
    this.y = mapTiles[2];
    this.tiles = [];
    this.init = function() {
        var iy, ix, tilesRow;
        for (iy = 0; iy < this.y; iy++) {
            tilesRow = [];
            for(ix = 0; ix < this.x; ix++) {
                tilesRow.push(new tile(ix,iy,this.tilesID[iy][ix]));
            }
            this.tiles.push(tilesRow);
        }
    }
    this.draw = function() {
        var iy, ix;
        for (iy = 0; iy < this.y; iy++) {
            for(ix = 0; ix < this.x; ix++) {
                this.tiles[iy][ix].draw();
            }
        }
    }
}

function mapGenerate(x,y) {
    this.x = x;
    this.y = y;
    this.tiles = [];
    var tilesRow;
    for (var iy = 0; iy < this.y; iy++) {
        tilesRow = [];
        for (var ix = 0; ix < this.x; ix++) {
            tilesRow.push(1);
        }
        this.tiles.push(tilesRow);
    }
    
    var generatingRooms = true;
    while (generatingRooms) {
        var roomX = Math.ceil(Math.random * 10 + 2);
        var roomY = Math.ceil(Math.random * 10 + 2);
        
        
    }
    
    return ([this.tiles,this.x,this.y]);
}

function getTile(x,y) {
    this.x = Math.floor(((-camera.x + x) / 5) / percentW);
    this.y = Math.floor(((-camera.y + y) / 5) / percentW);
    return mapCurrent.tiles[this.y][this.x];
}

var mouseHover
function mouseHoverFunction() {
    this.update = function() {
      console.log(mouseY);
        this.tile = getTile(mouseX, mouseY);
    }
    this.draw = function() {
        ctx = gameArea.context;
        ctx.save();
        ctx.translate(camera.x,camera.y);
        ctx.strokeStyle = "rgb(250,200,50)";
        ctx.lineWidth = percentW / 3;
        ctx.strokeRect(this.tile.x, this.tile.y, this.tile.width, this.tile.height);
        ctx.restore();
    }
    
}

const maps = [
    {
        name : "test",
        tiles : [
            [
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,0,1,0,1,0,2,0,1,0,1,0,1,0,1,2,1,0,1,2,1,0,1,0,1,0,1,0,1,2],
                [2,1,0,1,0,1,2,1,0,1,0,1,0,1,0,2,0,1,0,2,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,2,0,1,0,1,0,1,0,1,2,1,0,1,2,1,0,1,0,1,0,1,0,1,2],
                [2,1,0,1,0,1,2,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,2,0,1,0,1,0,1,0,1,2,1,0,1,2,1,0,1,0,1,0,1,0,1,2],
                [2,2,2,1,2,2,2,1,0,1,0,1,0,1,0,2,0,1,0,2,2,2,2,2,2,1,2,2,2,2],
                [2,0,1,0,1,0,2,0,1,0,1,0,1,0,1,2,1,0,1,2,1,0,1,0,1,0,1,0,1,2],
                [2,1,0,1,0,1,2,2,2,2,2,2,0,2,2,2,2,1,2,2,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,2,1,0,1,0,1,0,1,0,1,2],
                [2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,2,1,0,1,0,1,0,1,0,1,2],
                [2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,2,0,1,0,1,2,2,2,2,2,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,2,1,0,1,0,2,0,1,0,1,2],
                [2,2,0,2,2,2,2,2,0,2,2,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,2,0,1,0,1,0,2,0,1,0,1,0,1,0,1,2,1,0,1,0,2,0,1,0,1,2],
                [2,1,0,1,2,1,0,1,0,1,2,1,0,1,0,1,0,1,0,2,0,1,0,1,2,2,2,2,2,2],
                [2,0,1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,1,0,1,0,1,0,1,2],
                [2,1,0,1,2,1,0,1,0,1,0,1,0,1,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,2,0,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1,0,1,0,1,0,1,0,1,2],
                [2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,2,0,1,0,1,0,1,0,1,0,2,0,1,0,1,0,1,0,1,0,1,0,1,0,1,2],
                [2,1,0,1,2,1,0,1,0,1,0,1,0,1,2,1,0,1,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            ],30,24
        ]
    }
]

const tiles = [
    {
        name : "stoneFloor1",
        color : "rgb(70,70,70)",
        solid : false
    },
    {
        name : "stoneFloor2",
        color : "rgb(50,50,50)",
        solid : false
    },
    {
        name : "skrog",
        color : "rgb(0,0,0)",
        solid : true
    }
]

//Game tick every 20ms, or 50 timer per second
function gameTick() {
    gameArea.clear();
    
    mapCurrent.draw();
    
    player.movement();
    player.update();
    player.draw();
    
    mouseHover.update();
    mouseHover.draw();
    
    player.findPath(mouseHover.tile.xTrue,mouseHover.tile.yTrue);
}

//Only run once when the game is initally booted
function gameInit() {
    gameArea.init();
    document.addEventListener("mousemove",mousePosUpdate);
    document.addEventListener("contextmenu",playerMovement);
    document.addEventListener("keydown",arrowKeyDown);
    document.addEventListener("keyup",arrowKeyUp);
    
    mouseHover = new mouseHoverFunction();
    
    player = new player();
    
    //mapCurrent = new map(mapGenerate(80,40));
    mapCurrent = new map(maps[0].tiles);
    mapCurrent.init();
}

//Initialize game
gameInit();