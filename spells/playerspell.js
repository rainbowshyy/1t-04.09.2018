var basicSpells = [
    {
        name: "magic missile",
        charge: 0,
        damage: 1,
        knockback: 1,
        mana: 1,
        speed: 1.5,
        sprite: "sprites/spellprojectile1.png",
        spriteWidth: 5,
        spriteHeight: 3,
        stages: 2,
        height: 3,
        width: 3,
        light: function (x,y) {
            var image = new Image();
            image.src = "sprites/spelllight1.png";
            return new lightsource(0.9,1,true,x-12.5,y-10.625,21.25,21.25,image);
        }
    }
];

var chargeSpells = [
    {
        sprite: "sprites/spellcharge1.png",
        spriteWidth: 5,
        spriteHeight: 5,
        stages: 4,
    }
]

var spells = [
    {
        name: "heal",
        mana: 5,
        channelDur: 100,
        direction: false,
        sprite: "sprites/healCharge.png",
        eligible: function () {
            if (player.grounded && player.health < player.healthMax) {
                return true;
            } else {
                return false;
            }
        },
        channel: function (channelStage) {
            player.busy = true;
            player.eyesY = 1;
            player.animation = 0;
            player.animationFrame = 0;
            if (channelStage >= this.channelDur) {
                return true;
            } else {
                return false;
            }
        },
        cast: function () {
            player.health += 1;
            if (player.health > player.healthMax) {
                player.health = player.healthMax;
            }
            player.mana -= this.mana;
        },
        draw: function (channelStage) {
            var imageTemp = new Image();
            imageTemp.src = this.sprite;
            effects.push(new effect(player.x + 5,player.y + 1.75,imageTemp,12,12,Math.floor(12 * channelStage / this.channelDur),player.directionX,function(){c.translate(-12.5 * percentW,0)}));
        }
    }
]

function SpellCast(spellid) {
    this.id = spellid;
    this.stage = 0;
    this.update = function () {
        if (spells[this.id].channel(this.stage)) {
            spells[this.id].cast();
            this.stage = 0;
            return true;
        } else {
            this.stage += 1;
        }
    }
    this.draw = function () {
        spells[this.id].draw(this.stage);
    }
}

var playerProjectiles = [];
function projectile(x,y,id,directionX,directionY) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.speed = basicSpells[this.id].speed;
    this.damage = basicSpells[this.id].damage;
    this.knockback = basicSpells[this.id].knockback
    this.directionX = directionX;
    this.directionY = directionY;
    
    this.sprite = new Image();
    this.sprite.src = basicSpells[this.id].sprite;
    this.spriteWidth = basicSpells[this.id].spriteWidth;
    this.spriteHeight = basicSpells[this.id].spriteHeight;
    this.width = basicSpells[this.id].width;
    this.height = basicSpells[this.id].height;
    this.xCenter = this.x + this.width / 2;
    this.yCenter = this.y + this.height / 2;
    this.light = basicSpells[this.id].light(this.xCenter,this.yCenter);
    
    this.y -= this.height / 2;
    
    this.stages = basicSpells[this.id].stages;
    this.animationFrame = 0;
    this.animationStage = 0;
    
    if (this.directionY == 0) {
        this.xVelocity = this.speed * this.directionX;
        this.yVelocity = 0;
    } else {
        this.yVelocity = this.speed * this.directionY * -1;
        this.xVelocity = 0;
    }
    
    this.update = function () {
        this.animationStage += 1;
        if (this.animationStage > 4) {
            this.animationFrame += 1;
            this.animationStage = 0;
            if (this.animationFrame > this.stages) {
                this.animationFrame = 0;
            }
        }
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.xCenter = this.x + this.width / 2;
        this.yCenter = this.y + this.height / 2;
        this.light = basicSpells[this.id].light(this.xCenter,this.yCenter);
        var collisionTemp = collision(this);
        if (collisionTemp > -1) {
            if (!platforms[collisionTemp].platform) {
                return true;
            }
        }
        for (var i = 0; i < enemies.length; i++) {
            if (this.x < enemies[i].x + enemies[i].width && this.x + this.width > enemies[i].x && this.y < enemies[i].y + enemies[i].height && this.height + this.y > enemies[i].y) {
                player.mana += basicSpells[this.id].mana;
                enemies[i].health -= this.damage;
                enemies[i].damageFlash = 100;
                if (this.knockback > 0) {
                    enemies[i].xVelocity += this.directionX * this.knockback;
                    enemies[i].yVelocity -= this.knockback;
                    enemies[i].alert = true;
                    enemies[i].grounded = false;
                }
                return true;
            }
        }
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.filter = "hue-rotate(" + playerColors[player.color].hue + "deg)";
        c.translate(camera.x * percentW,camera.y * percentW);
        c.scale(this.directionX,1);
        if (this.directionY != 0) {
            c.translate((this.x-1) * percentW * this.directionX,this.y * percentW);
            if (this.directionY == 1) {
                c.rotate(-90 * Math.PI / 180);
            } else {
                c.rotate(90 * Math.PI / 180);
            }
            c.drawImage(this.sprite,this.animationFrame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,0,0,this.spriteWidth * 1.25 * percentW,this.spriteHeight * 1.25 * percentW);
        } else {
            c.drawImage(this.sprite,this.animationFrame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,(this.x - 1) * percentW * this.directionX,this.y * percentW,this.spriteWidth * 1.25 * percentW,this.spriteHeight * 1.25 * percentW);
        }
        if (this.light != undefined) {
            lightsources.push(this.light);
        }
        c.restore();
    }
}

function playerProjectilesUpdate() {
    for (var i = 0; i < playerProjectiles.length; i++) {
        playerProjectiles[i].draw();
        if (playerProjectiles[i].update() == true) {
            playerProjectiles.splice(i,1);
            i -= 1;
        }
    }
}

var effects = [];
function effect(x,y,sprite,spriteWidth,spriteHeight,spriteStage,direction,flipOffset) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.flipOffset = flipOffset;
    this.direction = direction;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.spriteStage = spriteStage;
    this.draw = function () {
        c = lighting.context;
        c.save();
        c.filter = "hue-rotate(" + playerColors[player.color].hue + "deg)";
        c.translate(camera.x * percentW,camera.y * percentW);
        c.scale(this.direction,1);
        if (this.flipOffset && direction == -1) {
            this.flipOffset();
        }
        c.drawImage(this.sprite,this.spriteWidth * this.spriteStage,0,this.spriteWidth,this.spriteHeight,(this.x - spriteWidth * 0.625) * percentW * this.direction, (this.y - spriteHeight * 0.625) * percentW, this.spriteWidth * 1.25 * percentW, this.spriteHeight * 1.25 * percentW);
        c.restore();
    }
}

function drawEffects() {
    for (var i = 0; i < effects.length; i++) {
        effects[i].draw();
    }
    effects = [];
}

function castSpell(id,x,y,directionX,directionY) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.stage = 0;
    this.count = 0;
    this.stages = chargeSpells[basicSpells[this.id].charge].stages;
    
    this.sprite = new Image();
    this.sprite.src = chargeSpells[basicSpells[this.id].charge].sprite;
    this.spriteWidth = chargeSpells[basicSpells[this.id].charge].spriteWidth;
    this.spriteHeight = chargeSpells[basicSpells[this.id].charge].spriteHeight;
    playerProjectiles.push(new projectile(this.x + this.directionX * 3,this.y + 4 - this.directionY * 10,this.id,this.directionX,this.directionY));
    this.update = function () {
        this.x = player.xCenter - 0.25;
        this.y = player.y;
        this.count += 1;
        if (this.count > 1) {
            this.count = 0;
            this.stage += 1;
        }
        if (this.stage > this.stages) {
            return true;
        } else {
            effects.push( new effect(this.x + this.directionX * 9.65 - Math.abs(this.directionY) * 5 * this.directionX + (this.directionY - 1) * this.directionY * this.directionX * -1.75,this.y + 4.25 - this.directionY * 11.25, this.sprite ,this.spriteWidth,this.spriteHeight,this.stage,1));
        }
    }
    this.draw = function () {
        return;
    }
}