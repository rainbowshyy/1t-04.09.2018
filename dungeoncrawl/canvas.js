//Percent of width and height
var percentW;

//Defining the canvas area
var gameArea = {
    canvas : document.createElement("canvas"),
    init : function () {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = this.canvas.width / 2
        percentW = this.canvas.width / 100;
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
    speedX : 0,
    speedY : 0,
    targetX : 0,
    targetY : 0,
    moving : false,
    update : function () {
        if (this.moving) {
            this.x += this.speedX;
            this.y += this.speedY;
            this.targetX -= Math.abs(this.speedX);
            this.targetY -= Math.abs(this.speedY);
            if (this.targetX <= 0 && this.targetY <= 0) {
                playerMovementPath.draw = false;
                this.speedX = 0;
                this.speedY = 0;
                this.moving = false;
            }
        }
    },
    beginMovement : function () {
        this.speedX = player.movementSpeed * -Math.cos(player.rotation) * percentW;
        this.speedY = player.movementSpeed * -Math.sin(player.rotation) * percentW;
        this.targetX = Math.abs(mouseX - player.centerX);
        this.targetY = Math.abs(mouseY - player.centerY);
        playerMovementPath.beginMovement();
        this.moving = true;
    }
}

//Find mouse X and mouse Y
var mouseX, mouseY;
function mousePosUpdate(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

//camera movement
function playerMovement(e) {
    e.preventDefault();
    getTile(mouseX,mouseY);
    player.rotate();
    camera.beginMovement();
    return false;
}

//Defining the visuals of the player
var player;
function player() {
    this.width = 3 * percentW;
    this.height = 3 * percentW;
    this.centerX = gameArea.canvas.width / 2;
    this.centerY = gameArea.canvas.height / 2;
    this.rotation = 0;
    this.draw = function() {
        ctx = gameArea.context;
        ctx.save();
        ctx.translate(this.centerX,this.centerY);
        ctx.rotate(this.rotation);
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
    this.rotate = function() {
        this.rotation = Math.atan2(mouseY - this.centerY, mouseX - this.centerX);
    }
    //---STATS---
    this.movementSpeed = 0.25;
}

var playerMovementPath;
function movementPath() {
    this.x = 0;
    this.y = 0;
    this.draw = false;
    this.update = function() {
        if (this.draw) {
            ctx = gameArea.context;
            ctx.beginPath();
            ctx.moveTo(player.centerX,player.centerY);
            this.x += camera.speedX;
            this.y += camera.speedY;
            ctx.lineTo(this.x,this.y);
            ctx.strokeStyle = "rgb(255,255,255)";
            ctx.stroke();
        }
    }
    this.beginMovement = function() {
        this.x = mouseX;
        this.y = mouseY;
        this.draw = true;
    }
}

//Defining visuals of enemies
var tile; //TEMPORARY, USE ARRAYS
function tile(x,y,id) {
    this.x = x * 5 * percentW;
    this.y = y * 5 * percentW;
    this.width = 5 * percentW;
    this.height = 5 * percentW;
    this.id = id;
    this.draw = function() {
        if ((this.x + camera.x > gameArea.canvas.width || this.y + camera.y > gameArea.canvas.height || this.x + camera.x + this.width < 0 || this.y + camera.y + this.height < 0) == false) {
            ctx = gameArea.context;
            ctx.save();
            ctx.translate(camera.x,camera.y);
            ctx.fillStyle = tiles[this.id].color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
            ctx.restore();
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

function getTile(x,y) {
    this.x = Math.floor((-camera.x + x) / 5 / percentW);
    this.y = Math.floor((-camera.y + y) / 5 / percentW);
    console.log(mapCurrent.tiles[this.y][this.x]);
    console.log(this.y + " + " + this.x);
}

const maps = [
    {
        name : "test",
        tiles : [
            [
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
                [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
                [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            ],24,24
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
    }
]

//Game tick every 20ms, or 50 timer per second
function gameTick() {
    gameArea.clear();
    camera.update();
    
    mapCurrent.draw();
    
    playerMovementPath.update();
    
    player.draw();
}

//Only run once when the game is initally booted
function gameInit() {
    gameArea.init();
    document.addEventListener("mousemove",mousePosUpdate);
    document.addEventListener("contextmenu",playerMovement);
    
    playerMovementPath = new movementPath();
    
    player = new player();
    
    mapCurrent = new map(maps[0].tiles);
    mapCurrent.init();
}

//Initialize game
gameInit();