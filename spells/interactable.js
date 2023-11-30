var doors = [
    {
        name: "wooden door",
        sprite: "sprites/door1.png",
        width: 20,
        height: 20,
    }
]

function door(x,y,id,entrance) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.width = doors[this.id].width;
    this.height = doors[this.id].height;
    this.sprite = new Image();
    this.sprite.src = doors[this.id].sprite;
    this.entrance = entrance
    
    this.openStage = 0;
    this.acceptX = true;
    this.count = 0;
    
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(camera.x * percentW, camera.y * percentW);
        c.drawImage(this.sprite,this.openStage * 16,0,16,16,this.x * percentW,this.y * percentW,this.width * percentW, this.height * percentW);
        c.restore();
    }
    this.update = function () {
        if (this.entrance) {
            return;
        } else {
            if (this.openStage > 0) {
                this.count += 1;
                if (this.count > 6) {
                    this.openStage += 1;
                    this.count = 0;
                    if (this.openStage == 4) {
                        this.openStage = 3;
                        fade.visible = true;
                    }
                }
            }
            if (collideWith(this,player) && this.openStage == 0) {
                playerToolTip = "x enter.";
                if (!keyX) {
                    this.acceptX = true;
                }
                if (keyX && this.acceptX) {
                    this.openStage = 1;
                }
            } else {
                this.acceptX = false;
            }
        }
    }
    this.updateState = function () {
        return;
    }
}

var chests = [
    {
        name: "dungeon chest",
        sprite: "sprites/chest1.png",
        coins: [20,30],
    }
]

function chest(x,y,id) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.id = id;
    this.sprite = new Image();
    this.sprite.src = chests[this.id].sprite;
    
    this.open = false;
    this.openStage = 0;
    this.count = 0;
    this.acceptX = true;
    
    this.coins = 0;
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(camera.x * percentW,camera.y * percentW);
        c.drawImage(this.sprite,this.openStage * 16,0,16,16,this.x * percentW,this.y * percentW,20 * percentW, 20 * percentW);
        c.restore();
    }
    this.update = function () {
        if (this.openStage > 0 && this.openStage < 5 && !this.open) {
            this.count += 1;
            if (this.count > 7) {
                this.count = 0;
                if (this.openStage == 4) {
                    if (this.coins > 0) {
                        drops.push(new coin(this.x,this.y,0));
                        this.coins -= 1;
                    } else {
                        this.open = true;
                    }
                } else {
                    this.openStage += 1;
                }
            }
        }
        if (collideWith(this,player) && this.openStage == 0) {
            playerToolTip = "x open.";
            if (!keyX) {
                this.acceptX = true;
            }
            if (keyX && this.acceptX) {
                this.openStage = 1;
            }
        } else {
            this.acceptX = false;
        }
    }
    this.updateState = function () {
        this.coins = Math.round(Math.random() * (chests[this.id].coins[1] - chests[this.id].coins[0]) + chests[this.id].coins[0]);
    }
}

var coins = [
    {
        name: "gold coin",
        value: 1,
        sprite: "sprites/coin1.png",
    }
]

function coin(x,y,id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.xVelocity = Math.random() * 0.5 - 0.25;
    this.yVelocity = Math.random() * -1.5 - 0.5;
    this.yVelocityMax = 1.5;
    
    this.sprite = new Image();
    this.sprite.src = coins[this.id].sprite;
    this.spriteWidth = 8;
    this.spriteHeight = 8;
    this.value = coins[this.id].value;
    this.spinStage = 0;
    this.count = 0;
    
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(camera.x * percentW,camera.y * percentW);
        c.drawImage(this.sprite,this.spinStage * this.spriteWidth, 0,this.spriteWidth,this.spriteHeight, this.x * percentW, this.y * percentW, this.width * percentW, this.height * percentW);
        c.restore();
    }
    this.update = function () {
        if (this.yVelocity < 0) {
            this.grounded = false;
        }

        this.yVelocity = gravity(this,0.2);

        this.y += this.yVelocity;
        var collisionTemp = collision(this);
        if (collisionTemp > -1) {
            var newCoords = collisionResolve(this,collisionTemp);
            this.x = newCoords[0];
            this.y = newCoords[1];
            if (this.xVelocity / 2 > 0.1) {
                this.xVelocity = this.count * 0.5
            } else {
                this.xVelocity = newCoords[2];
            }
            if (this.yVelocity / 2 > 0.1) {
                this.yVelocity = this.yVelocity * -0.5;
            } else {
                this.yVelocity = newCoords[3];   
            }
            if (newCoords[4]) {
                this.grounded = true;
            }
        }
        
        if (this.grounded) {
            if (Math.abs(this.xVelocity) > 0.1) {
                this.xVelocity *= 0.5;
            } else {
                this.xVelocity = 0;
            }
        }
        
        this.x += this.xVelocity;

        this.count += 1;
        if (this.count > 4) {
            this.spinStage += 1;
            if (this.spinStage > 7) {
                this.spinStage = 0;
            }
            this.count = 0;
        }
        
        if (collideWith(this,player)) {
            player.coins += this.value;
            coinCount.count = 0;
            coinCount.visible = true;
            return true;
        }
        
        this.xCenter = this.x + this.width / 2;
        this.yCenter = this.y + this.height / 2;
    }
}

function bossDoor(x,y,width,height,openStage) {
    this.x = x;
    this.width = width;
    this.height = height;
    this.y = y + 10 - height;
    this.xCenter = this.x + this.width / 2;
    this.yCenter = this.y + this.height / 2;
    this.sprite = new Image();
    this.sprite.src = "sprites/ironbar.png";
    
    this.animationStage = openStage;
    
    this.updateState = function () {
        return;
    }
    
    this.draw = function () {
        if ((this.x * percentW + camera.x * percentW > 240 * percentW ||
           this.x * percentW + this.width * percentW + camera.x * percentW < 0) ||
            (this.y * percentW + camera.y * percentW > 135 * percentW ||
            this.y * percentW + this.height * percentW + camera.y * percentW < 0)) {
            return;
        } else {
            c = gameArea.context;
            c.save();
            c.translate(camera.x * percentW,camera.y * percentW);
            c.drawImage(this.sprite,this.animationStage * 8,0,8,8,this.x * percentW,this.y * percentW,this.width * percentW,this.height * percentW);
            if (this.animationStage < 3) {
                this.animationStage += 1;
            }
            c.restore();
        }
    }
}

var drops = [];
function dropsUpdate() {
    for (var i = 0; i < drops.length; i++) {
        if (drops[i].update()) {
            drops.splice(i,1);
            i -= 1;
        }
    }
}

function dropsDraw() {
    for (var i = 0; i < drops.length; i++) {
        drops[i].draw();
    }
}