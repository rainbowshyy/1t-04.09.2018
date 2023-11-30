var hud = {
    canvas : document.createElement("canvas"),
    init : function () {
        this.canvas.width = percentW * 240;
        this.canvas.height = percentW * 135;
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        document.getElementById("gameContainer").appendChild(this.canvas);
        document.getElementById("gameContainer").children[3].style.transform = "scale(" + document.documentElement.clientWidth / 960 + "," + document.documentElement.clientWidth / 960 + ")";
    },
    clear : function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var manaBar;
function ManaBar() {
    this.x = 2.5;
    this.y = 2.5;
    this.sprite1 = new Image();
    this.sprite1.src = "sprites/manabar_frame.png";
    this.sprite2 = new Image();
    this.sprite2.src = "sprites/manabar_mana.png";
    this.draw = function () {
        c = hud.context;
        c.save();
        c.filter = "hue-rotate(" + playerColors[player.color].hue + "deg)";
        c.drawImage(this.sprite2,0,Math.floor((player.manaMax-player.mana) / player.manaMax * 16),16,Math.floor(player.mana / player.manaMax * 16),this.x * percentW, this.y * percentW + Math.floor((player.manaMax-player.mana) / player.manaMax * 16) * 1.25 * percentW, 20 * percentW, Math.floor(player.mana / player.manaMax * 16) * 1.25 * percentW);
        c.restore();
        c.drawImage(this.sprite1,this.x * percentW, this.y * percentW, 20 * percentW,20 * percentW);
    }
}

var healthBar;
function HealthBar() {
    this.x = 22.75;
    this.y = 7.5;
    this.sprite1 = new Image();
    this.sprite1.src = "sprites/healthSymbol.png";
    this.sprite2 = new Image();
    this.sprite2.src = "sprites/healthSymbolEmpty.png";
    this.draw = function () {
        c = hud.context;
        for (var i = 0; i < player.healthMax; i++) {
            c.drawImage(this.sprite2,this.x * percentW + 10 * i * percentW,this.y * percentW, 10 * percentW,10 * percentW);
            if (i < player.health) {
                c.save();
                c.filter = "hue-rotate(" + playerColors[player.color].hue + "deg)";
                c.drawImage(this.sprite1,this.x * percentW + 10 * i * percentW,this.y * percentW, 10 * percentW,10 * percentW);
                c.restore();
            }
        }
    }
}

var mapHud;
function MapHud() {
    this.display = false;
    this.alpha = 0;
    this.draw = function () {
        if (this.alpha > 0) {
            
            if (this.alpha > 0 && !this.display) {
                this.alpha -= 0.05;
                if (this.alpha < 0) {
                    this.alpha = 0;
                }
            }
            
            c = hud.context;
            c.save();
            c.globalAlpha = this.alpha;
            c.fillStyle = "rgb(0,0,0)";
            c.fillRect(0,0,percentW * 240, percentW * 135);
            
            c.globalAlpha = this.alpha * 1.66;
            for (var i = 0; i < map.rooms.length; i++) {
                map.rooms[i].draw();
            }
            c.fillStyle = "rgb(255,0,0)";
            c.translate((camera.x / 10) * percentW, (camera.y / 10) * percentW);
            c.fillRect((107.5 + player.x / 10) * percentW ,(66.5 + player.y / 10) * percentW, 2 * percentW, 2 * percentW);
            
            c.restore();
        }
        if (this.alpha < 0.6 && this.display) {
            this.alpha += 0.05;
        }
        
        if (keyTab) {
            this.display = true;
        } else {
            this.display = false;
        }
        for (var i = 0; i < map.rooms.length; i++) {
            if (!map.rooms[i].found) {
                map.rooms[i].explore();
            }
        }
    }
}

var coinCount;
function CoinCount() {
    this.x = 227.5;
    this.y = 2.5;
    this.sprite = new Image();
    this.sprite.src = "sprites/coin1.png";
    this.spriteWidth = 8;
    this.spriteHeight = 8;
    this.spinStage = 0;
    this.spinCount = 0;
    this.count = 0;
    this.visible = false;
    this.alpha = 0;
    this.draw = function () {
        if (this.alpha > 0) {
            c = hud.context;
            c.save();
            c.globalAlpha = this.alpha;
            c.drawImage(this.sprite,this.spinStage * this.spriteWidth, 0,this.spriteWidth,this.spriteHeight,this.x * percentW, this.y * percentW, 10 * percentW, 10 * percentW);
            
            var coinString = " ";
            coinString += String(player.coins);
            coinString += " ";
            textQueue.push([this.x - 50 - coinString.length * 4, this.y,coinString,this.alpha]);
            
            c.restore();
            
            if (this.alpha > 0 && !this.visible) {
                this.alpha -= 0.05;
            }
            this.spinCount += 1;
            if (this.spinCount > 4) {
                this.spinCount = 0;
                this.spinStage += 1;
                if (this.spinStage > 7) {
                    this.spinStage = 0;
                }
            }
            this.count += 1;
            if (this.count > 150) {
                this.visible = false;   
            }
        }
        if (this.alpha < 1 && this.visible) {
            this.alpha += 0.05;
        }
    }
}

var floorDisplay;
function FloorDisplay() {
    this.x = 240;
    this.y = 120;
    this.count = 0;
    this.visible = false;
    this.alpha = 0;
    this.draw = function () {
        if (this.alpha > 0) {
            c = hud.context;
            c.save();
            c.globalAlpha = this.alpha;
            
            var coinString = " ";
            coinString += String("floor " + (floorCurrent + 1));
            coinString += " ";
            textQueue.push([this.x - 50 - coinString.length * 4, this.y,coinString,this.alpha]);
            
            c.restore();
            
            if (this.alpha > 0 && !this.visible) {
                this.alpha -= 0.05;
            }

            this.count += 1;
            if (this.count > 250) {
                this.visible = false;   
            }
        }
        if (this.alpha < 1 && this.visible) {
            this.alpha += 0.05;
        }
    }
}

var fade;
function Fade() {
    this.count = 0;
    this.visible = false;
    this.alpha = 0;
    this.draw = function () {
        if (this.alpha > 0) {
            c = hud.context;
            c.save();
            c.globalAlpha = this.alpha;
            c.fillStyle = "rgb(0,0,0)";
            c.fillRect(0,0,240 * percentW, 135 * percentW);
            c.restore();
            
            if (this.alpha > 0 && !this.visible) {
                this.alpha -= 0.05;
            }

            this.count += 1;
            if (this.alpha >= 1) {
                pause = true;
                this.visible = false;
            }
        }
        if (this.alpha < 1 && this.visible) {
            this.alpha += 0.05;
        }
    }
}

var playerToolTip = "";
function hudUpdate() {
    hud.clear();
    
    mapHud.draw();
    
    manaBar.draw();
    healthBar.draw();
    coinCount.draw();
    floorDisplay.draw();
    drawTextQueue();
    
    if (playerToolTip != "") {
        write (100 - playerToolTip.length * 2.5,player.y + camera.y - 15, playerToolTip, false);
        playerToolTip = "";
    }
    
    fade.draw();
}