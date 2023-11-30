
var camera;
function camera() {
    this.x = 0;
    this.y = 0;
    this.update = function () {
        this.x = (player.x - 116) * -1;
        if (player.y + this.y - 95 > 0) {
            this.y = (player.y - 95) * -1;
        } else if (player.y + this.y - 45 < 0) {
            this.y = (player.y - 45) * -1;
        }
    }
}

var player;
function player() {
    this.x = 2000;
    this.y = 120;
    this.width = 8;
    this.height = 8;
    this.xCenter = this.x + this.width / 2;
    this.yCenter = this.y + this.height / 2;
    
    this.yVelocity = 0;
    this.yVelocityMax = 2.5;
    this.grounded = false;
    this.walled = false;
    this.jumping = false;
    this.dash = true;
    this.dashing = false;
    this.dashcount = 0;
    this.jumpcount = 0;
    this.xVelocity = 0;
    this.drop = false;
    this.acceptDrop = true;
    this.dropcount = 0;
    this.acceptZ = true;
    this.color = 5;
    
    this.acceptX = true;
    this.spellCooldown = 0;
    
    this.directionX = 1;
    this.directionY = 0;
    
    this.sprite = new Image();
    this.sprite.src = "sprites/player.png";
    
    this.eyes = new Image();
    this.eyes.src = "sprites/player_eyes.png";
    this.eyesY = 0;
    this.eyesBlink = 0;
    
    this.wand = new Image();
    this.wand.src = "sprites/wand1.png";
    this.spellX = 0;
    this.spell = false;
    
    this.spellA = 0;
    this.channelingA = false;
    
    this.animation = 0;
    this.animationFrame = 0;
    this.animationStage = 0;
    
    this.light = new Image();
    this.light.src = "sprites/player_light1.png";
    
    this.mana = 0;
    this.manaMax = 10;
    this.health = 4;
    this.healthMax = 4;
    this.invulnerable = 0;
    this.busy = false;
    
    this.coins = 0;
    
    this.drawHitbox = function () {
        c = gameArea.context;
        c.save();
        c.translate(camera.x * percentW,camera.y * percentW);
        c.strokeStyle = "rgb(255,0,0)";
        c.strokeRect(this.x * percentW,this.y * percentW,this.width * percentW,this.height * percentW);
        c.restore();
    }
    
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(camera.x * percentW,camera.y * percentW);
        
        if (this.invulnerable > 0) {
            c.globalAlpha = 0.4 + Math.floor((this.invulnerable % 20) / 10) * 0.3;
        }
        
        if (this.wandDirectionX == -1) {
            c.translate(10 * percentW,0);
            c.scale(-1,1);
        }
        
        if (this.eyesY == 1) {
            c.save();
            c.translate((this.x - 1.25) * percentW * this.wandDirectionX + 8.75 * percentW, this.y * percentW + 7.5 * percentW);
            c.rotate(-90 * Math.PI / 180);
            c.drawImage(this.wand,0,0,percentW * 15, percentW * 1.25);
            c.restore();
        } else if (this.eyesY == -1) {
            c.save();
            c.translate((this.x - 1.25) * percentW * this.wandDirectionX + 6.75 * percentW, (this.y - 2) * percentW);
            c.rotate(90 * Math.PI / 180);
            c.drawImage(this.wand,0,0,percentW * 15, percentW * 1.25);
            c.restore();
        } else {
            if (this.walled) {
                c.save();
                c.translate(-2.5 * percentW,0);
                c.drawImage(this.wand,(this.x * percentW - 1.25 * percentW) * this.wandDirectionX, this.y * percentW + 3.75 * percentW,percentW * 15, percentW * 1.25);
                c.restore();
            } else {
                c.drawImage(this.wand,(this.x * percentW - 1.25 * percentW) * this.wandDirectionX, this.y * percentW + 3.75 * percentW,percentW * 15, percentW * 1.25);
            }
        }
        
        if (this.walled) {
            c.translate(10 * percentW,0);
            c.scale(-1,1);
        }
        
        c.drawImage(this.sprite,this.animationFrame * 10,this.animation * 10, 10, 10,(this.x * percentW - 1.25 * percentW) * this.directionX, this.y * percentW - 4.5 * percentW, percentW * 12.5, percentW * 12.5);
        c.restore();
        
        lightsources.push(new lightsource(0.7,1,true,this.xCenter - 55,this.yCenter - 55,110,110,this.light));
        if (this.eyesBlink > 4) {
            lightsources.push(new lightsource(0.95,this.directionX,false,(this.x - 1.25) * this.directionX,this.y - 4.5 - 1.25 * this.eyesY,12.5,12.5,this.eyes,this.animationFrame * 10,this.animation * 10, 10, 10,true));
        }
        if (this.spell != false) {
            this.spell.draw();
        }
    }
    
    this.update = function () {
        //animation
        if (this.grounded && this.xVelocity == 0) {
            this.animationFrame = 0;
            this.animation = 0;
            this.animationStage += 1;
            if (this.animationStage >= 50) {
                this.animationFrame = 1;
            }
            if (this.animationStage >= 100) {
                this.animationStage = 0;
            }
        } else if (this.grounded && this.xVelocity != 0) {
            this.animationFrame = 0;
            this.animation = 1;
            this.animationStage += 1;
            if (this.animationStage >= 6) {
                this.animationFrame = 1;
            }
            if (this.animationStage >= 12) {
                this.animationFrame = 2;
            }
            if (this.animationStage >= 18) {
                this.animationFrame = 1;
            }
            if (this.animationStage >= 24) {
                this.animationStage = 0;
            }
        } else if (this.jumping && this.yVelocity < 0) {
            if (this.eyesY != -1) {
                this.animationFrame = 0;
                this.animation = 2;
                this.animationStage = 0;
            } else {
                this.animationFrame = 0;
                this.animation = 6;
                this.animationStage = 0;
            }
        } else if (!this.jumping && this.yVelocity <= 0) {
            if (this.eyesY != -1) {
                this.animationFrame = 1;
                this.animation = 2;
                this.animationStage = 0;
            } else {
                this.animationFrame = 1;
                this.animation = 6;
                this.animationStage = 0;
            }
        } else if (this.yVelocity > 0) {
            if (this.eyesY != -1) {
                this.animationFrame = 2;
                this.animation = 2;
                this.animationStage = 0;
            } else {
                this.animationFrame = 2;
                this.animation = 6;
                this.animationStage = 0;
            }
        }
        if (this.dashing) {
            this.animationFrame = 0;
            if (this.eyesY != -1) {
                this.animation = 3;
            } else {
                this.animation = 5;
            }
            if (this.dashcount >= 4) {
                this.animationFrame = 1;
            }
        }
        if (this.eyesBlink < 200 + Math.random() * 100) {
            this.eyesBlink += 1;
        } else {
            this.eyesBlink = 0;
        }
        
        if (this.invulnerable > 0) {
            this.invulnerable -= 1;
            if (this.invulnerable > 90) {
                this.animation = 7;
                this.animationFrame = 0;
                if (this.invulnerable > 98) {
                    this.yVelocity = -2;
                    this.grounded = false;
                    this.walled = false;
                }
            }
        }
        
        if (keyUp) {
            this.eyesY = 1;
            this.directionY = 1;
        } else if (keyDown && !this.grounded) {
            this.directionY = -1;
            this.eyesY = -1;
        } else {
            this.eyesY = 0;
            this.directionY = 0;
        }
        
        if (this.walled) {
            if (this.eyesY != -1) {
                this.animationFrame = 0;
            } else {
                this.animationFrame = 1;
            }
            this.animation = 4;
        }
        
        if (!this.walled) {
            this.yVelocityMax = 2.5;
            this.yVelocity = gravity(this,0.25);
        } else {
            this.yVelocityMax = 0.8;
            this.yVelocity = gravity(this,0.2);
        }
        
        if (this.dashing) {
            this.yVelocity = 0;
        }
        
        this.y += this.yVelocity;
        var collisionTemp = collision(this);
        if (collisionTemp > -1) {
            var newCoords = collisionResolve(this,collisionTemp);
            this.x = newCoords[0];
            this.y = newCoords[1];
            this.xVelocity = newCoords[2];
            this.yVelocity = newCoords[3];
            if (newCoords[4]) {
                this.grounded = true;
                this.dash = true;
            }
            if (newCoords[5]) {
                this.collideLeft = true;
            } else if (newCoords[6]) {
                this.collideRight = true;
            }
        }
        
        if (this.yVelocity > 0) {
            this.grounded = false;
        }
        
        this.collideLeft = false;
        this.collideRight = false;
        
        var collisionXPlayer = collisionX(this);
        if (collisionXPlayer == 1) {
            this.collideLeft = true;
        } else if (collisionXPlayer == -1) {
            this.collideRight = true;
        }
        
        if ((this.grounded || this.walled) && keyZ && !this.dashing && this.acceptZ && !this.busy) {
            this.jumping = true;
            this.acceptZ = false;
            this.jumpcount = 0;
            if (this.walled && !this.grounded) {
                this.jumping = collisionXPlayer;
                this.walled = false;
            }
            this.grounded = false;
            this.drop = false;
        }
        
        if (this.jumping && this.jumpcount < 16) {
            this.yVelocity = -2.6;
            this.jumpcount += 1;
        } else if (this.jumpcount >= 16) {
            this.jumping = false;
        }
        
        if (!keyZ && this.jumping) {
            this.jumping = false;
        }
        
        if (!keyZ) {
            this.acceptZ = true;
        }
        //Horizontal
        
        if (this.dash && keyC && this.dashcount == 0 && !this.busy) {
            this.dash = false;
            this.dashing = true;
            this.jumping = false;
            this.dashcount = 0;
            this.grounded = false;
            if (!this.walled) {
                if (this.directionX == -1) {
                    this.xVelocity = -2.8;
                } else if (this.directionX == 1) {
                    this.xVelocity = 2.8;
                }
            } else {
                this.xVelocity = 2.5 * collisionXPlayer * -1;
                this.directionX = collisionXPlayer * -1;
            }
        }
        if (!this.dashing) {
            if (keyLeft) {
                this.directionX = -1;
            } else if (keyRight) {
                this.directionX = 1;
            }
        }
        
        this.walled = false;
        if (!this.dashing && this.jumping !== 1 && this.jumping !== -1) {
            if (keyLeft && keyRight) {
                this.xVelocity = 0;
            } else if (keyLeft && !this.collideRight && this.jumping !== 1 && !this.busy) {
                this.xVelocity = -1.2;
            } else if (keyRight && !this.collideLeft && this.jumping !== -1 && !this.busy) {
                this.xVelocity = 1.2;
            } else if (keyLeft && this.collideRight) {
                this.xVelocity = 0;
                this.dash = true;
                this.walled = true;
                this.drop = false;
            } else if (keyRight && this.collideLeft) {
                this.xVelocity = 0;
                this.dash = true;
                this.walled = true;
                this.drop = false;
            } else {
                this.xVelocity = 0;
            }
        } else if (this.jumping === 1 || this.jumping === -1) {
            if (this.jumpcount < 15) {
                this.xVelocity = this.jumping * -1.2;
            } else if (keyZ) {
                this.jumping = true;
            } else {
                this.jumping = false;
            }
        } else {
            this.dashcount += 1;
            if (this.dashcount > 14) {
                this.xVelocity = 0;
            }
            if (this.dashcount > 15) {
                this.dashing = false;
            }
        }
        
        if (this.dashcount > 15) {
            this.dashcount += 1;
            if (this.dashcount > 33) {
                this.dashcount = 0;
            }
        }
        
        this.x += this.xVelocity;
        
        var collisionTemp = collision(this);
        if (collisionTemp > -1) {
            var newCoords = collisionResolve(this,collisionTemp);
            this.x = newCoords[0];
            this.y = newCoords[1];
            this.xVelocity = newCoords[2];
            this.yVelocity = newCoords[3];
            if (newCoords[4]) {
                this.grounded = true;
            }
        }
        
        if (this.walled) {
            this.wandDirectionX = this.directionX * -1;
        } else {
            this.wandDirectionX = this.directionX;
        }
        
        if (this.acceptDrop && keyDown && this.grounded && !this.busy) {
            this.acceptDrop = false;
            this.drop = true;
        }
        if (this.drop) {
            this.dropcount += 1;
            if (this.dropcount > 8) {
                this.drop = false;
                this.dropcount = 0;
            }
        }
        
        if (!keyDown) {
            this.acceptDrop = true;
        }
        
        if (this.acceptX && keyX && this.spellCooldown <= 0 && !this.dashing && !this.spell) {
            this.spellCooldown = 30;
            this.acceptX = false;
            this.spell = new castSpell(this.spellX,this.xCenter,this.y,this.wandDirectionX,this.directionY);
        }
        
        if (keyA && !this.spell && this.mana >= spells[this.spellA].mana && spells[this.spellA].eligible()) {
            this.spell = new SpellCast(this.spellA);
            this.channelingA = true;
        }
        
        this.busy = false;
        if (this.spell != false) {
            if (this.spell.update()) {
                this.spell = false;
            }
        }
        
        if (this.channelingA && (!keyA || this.invulnerable > 98)) {
            this.spell = false;
        }
        
        if (this.spellCooldown > 0 ) {
            this.spellCooldown -= 1;
        }
        
        
        if (this.mana > this.manaMax) {
            this.mana = this.manaMax;
        }
        
        if (!keyX) {
            this.acceptX = true;
        }
        
        this.xCenter = this.x + this.width / 2;
        this.yCenter = this.y + this.height / 2;
        
        if (collisionDamage(this) > 0 && this.invulnerable == 0) {
            this.health -= collisionDamage(this);
            this.invulnerable = 100;
        }
        if (this.health <= 0) {
            death();
        }
    }
}