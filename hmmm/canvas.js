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

var gravity = 0.2;
function gravityUpdate(yVelocity, yVelocityMax) {
    var yVelocityNew = yVelocity + gravity;
    if (yVelocityNew > yVelocityMax) {
        return yVelocityMax;
    } else {
        return yVelocityNew;
    }
}

function gravityCollision(y,yAnchor,left,right) {
    for (var i = 0; i < collision.length; i++) {
        if ((yAnchor > collision[i][1] && y < collision[i][1]) && (left < collision[i][0] + collision[i][2] || right > collision[i][0])) {
            return collision[i][1];
        } else {
            return false;
        }
    }
}

var keyLeft = false, keyUp = false, keyRight = false, keyDown = false, keyZ = false, keyX = false;
function keyDownFunction(e) {
    var key = e.keyCode;
    if (key == 37) {
        keyLeft = true;
    } else if (key == 38) {
        keyUp = true;
    } else if (key == 39) {
        keyRight = true;
    } else if (key == 40) {
        keyDown = true;
    } else if (key == 90) {
        keyZ = true;
    } else if (key == 88) {
        keyX = true;
    }
}

function keyUpFunction(e) {
    var key = e.keyCode;
    if (key == 37) {
        keyLeft = false;
    } else if (key == 38) {
        keyUp = false;
    } else if (key == 39) {
        keyRight = false;
    } else if (key == 40) {
        keyDown = false;
    } else if (key == 90) {
        keyZ = false;
    } else if (key == 88) {
        keyX = false;
    }
}

var player;
function player() {
    this.x = 50 * percentW;
    this.y = 10 * percentW;
    this.width =  3 * percentW;
    this.height = 5 * percentW;
    this.yVelocity = 0;
    this.yVelocityMax = 1.1;
    this.yAnchor = this.y += this.height;
    this.grounded = false;
    this.jumping = false;
    this.directionX = 1;
    this.directionY = 0;
    this.hitting = false;
    this.slash = new playerSlash();
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.scale(1,1);
        c.translate(this.x,this.y);
        c.fillStyle = "rgb(255,0,0)";
        c.fillRect(0,0,this.width,this.height);
        c.restore();
    }
    this.update = function () {
        
        if (this.jumping) {
            this.jumping += 1;
            if (this.jumping == 14) {
                this.jumping = false;
            }
        }
        
        this.y += (this.yVelocity * percentW);
        this.yAnchor = this.y + this.height;
        if (!this.grounded && !this.jumping) {
            this.yVelocity = gravityUpdate(this.yVelocity, this.yVelocityMax);
        }
        this.collision = gravityCollision(this.y,this.yAnchor,this.x,this.x + this.width)
        if (this.collision) {
            this.y = this.collision - this.height;
            this.yVelocity = 0;
            this.grounded = true;
        }
        this.hitting = this.slash.update();
    }
    this.controls = function () {
        if (this.grounded && keyZ) {
            this.yVelocity = -1.1;
            this.grounded = false;
            this.jumping = true;
        }
        if (!keyZ && this.jumping) {
            this.jumping = false;
        }
        if (keyLeft) {
            this.x -= 0.4 * percentW;
            this.directionX = -1;
        }
        if (keyRight) {
            this.x += 0.4 * percentW;
            this.directionX = 1;
        }
        if (keyDown && !this.grounded) {
            this.directionY = -1;
        }
        if (this.grounded) {
            this.directionY = 0;
        }
        if (keyUp) {
            this.directionY = 1;
        }
        if (keyX && !this.hitting) {
            this.slash.init();
        }
    }
}

function playerSlash() {
    this.stage = 0;
    this.init = function () {
        this.width = 5 * percentW;
        this.height = 5 * percentW;
        if (player.directionY == 0) {
            this.xScale = player.directionX;
            if (player.directionX == 1) {
                this.directionX = 4;
            } else {
                this.directionX = -6;
            }
            this.directionY = 0;
            this.yScale = 1;
        } else {
            this.yScale = player.directionY;
            if (player.directionY == 1) {
                this.directionY = -6;
            } else {
                this.directionY = 6;
            }
            this.directionX = -1;
            this.xScale = 1;
        }
        this.stage = 1;
    }
    this.update = function () {
        if (this.stage == 0) {
            return false;
        }
        if (this.stage < 10) {
            this.draw();
        }
        if (this.stage == 30) {
            this.stage = 0;
            return false;
        } else {
            this.stage += 1;
            return true;
        }
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(player.x + percentW * this.directionX, player.y + percentW * this.directionY);
        c.fillStyle = "rgb(255,255,255)";
        c.fillRect(0,0,this.width,this.height);
        c.restore();
    }
}

var enemy;
function enemy() {
    if (Math.random() < 0.5) {
        this.x = -4 * percentW;
    } else {
        this.x = 100 * percentW;
    }
    this.y = 36 * percentW;
    this.width = 4 * percentW;
    this.height = 4 * percentW;
    this.update = function () {
        if (player.x > this.x) {
            this.x += 0.1 * percentW;
        } else if (player.x < this.x) {
            this.x -= 0.1 * percentW;
        }
        if ((((this.x < player.x + percentW * player.slash.directionX + player.slash.width && this.x > player.x + percentW * player.slash.directionX) || (this.x + this.width > player.x + percentW * player.slash.directionX && this.x + this.width < percentW * player.slash.directionX + player.slash.width)) && ((this.y < player.y + percentW * player.slash.directionY + player.slash.height && this.y > player.y + percentW * player.slash.directionY) || (this.y + this.height > player.y + percentW * player.slash.directionY && this.y + this.height < percentW * player.slash.directionY + player.slash.height))) && player.slash.stage < 10) {
            console.log("yeouch")
        }
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(this.x,this.y);
        c.fillStyle = "rgb(0,255,0)";
        c.fillRect(0,0,this.width,this.height);
        c.restore();
    }
}

var collision = []

var platform;
function platform(x,y,width,height) {
    this.x = x * percentW;
    this.y = y * percentW;
    this.width = width * percentW;
    this.height = height * percentW;
    collision.push([this.x,this.y,this.width,this.height]);
    this.draw = function() {
        c = gameArea.context;
        c.fillStyle = "rgb(100,100,100)";
        c.fillRect(this.x,this.y,this.width,this.height);
    }
}

function gameTick() {
    gameArea.clear();
    
    player.controls();
    player.update();
    enemy.update();
    
    platform.draw();
    
    player.draw();
    enemy.draw();
}

function gameInit() {
    gameArea.init();
    player = new player();
    platform = new platform(0,40,100,10);
    enemy = new enemy();
    
    document.addEventListener("keydown",keyDownFunction);
    document.addEventListener("keyup",keyUpFunction);
}

gameInit();