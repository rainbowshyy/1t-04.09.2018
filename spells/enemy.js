var enemies = [];
function enemy(x,y,id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = enemyId[this.id].width;
    this.height = enemyId[this.id].height;
    this.maxHealth = enemyId[this.id].health;
    this.health = this.maxHealth;
    this.alert = false;
    this.directionX = Math.round(Math.random());
    this.damage = enemyId[this.id].damage;
    this.variaton = Math.floor(enemyId[this.id].variatons * Math.random());
    this.directionX = Math.round(Math.random()) * 2 - 1;
    this.flying = enemyId[this.id].flying;
    this.speed = 0;
    
    this.sprite = new Image();
    this.sprite.src = enemyId[this.id].sprite;
    this.spriteWidth = enemyId[this.id].spriteWidth;
    this.spriteHeight = enemyId[this.id].spriteHeight;
    
    this.animation = 0;
    this.animationFrame = 0;
    this.animationStage = 0;
    this.damageFlash = 0;
    this.dead = false;
    this.coins = enemyId[this.id].coins[0] + Math.round(Math.random() * (enemyId[this.id].coins[1] - enemyId[this.id].coins[0]));
    
    this.xVelocity = 0;
    this.xVelocityMax = enemyId[this.id].maxSpeed;
    this.yVelocity = 0;
    this.yVelocityMax = enemyId[this.id].maxY;
    this.gravity = enemyId[this.id].gravity;
    this.acceleration = enemyId[this.id].acceleration;
    this.jumpHeight = enemyId[this.id].jumpHeight;
    this.reactionTime = enemyId[this.id].rectionTime;
    this.reaction = 0;
    this.collisionCooldownDamage = 0;
    
    this.xCenter = this.x + this.width / 2;
    this.yCenter = this.y + this.height / 2;
    
    this.grounded = false;
    this.drop = false;
    
    this.update = function () {
        if (!this.dead) {
            if ((this.x * percentW + camera.x * percentW > 260 * percentW ||
               this.x * percentW + this.width * percentW + camera.x * percentW < -20) ||
                (this.y * percentW + camera.y * percentW > 155 * percentW ||
                this.y * percentW + this.height * percentW + camera.y * percentW < -20)) {
                this.alert = false;
            } else {
                enemyId[this.id].animate(this);
                if (!this.alert) {
                    enemyId[this.id].idleFunc(this);
                    this.alert = enemyId[this.id].alertFunc(this);
                } else {
                    enemyId[this.id].movementFunc(this);
                }

                if (this.damageFlash > 0) {
                    this.damageFlash -= 5;
                }

                if (this.yVelocity < 0) {
                    this.grounded = false;
                }

                this.collideLeft = false;
                this.collideRight = false;

                var collisionXEnemy = collisionX(this);
                if (collisionXEnemy == 1 && this.xVelocity > 0) {
                    this.collideLeft = true;
                } else if (collisionXEnemy == -1 && this.xVelocity < 0) {
                    this.collideRight = true;
                }
                if (!this.flying) {
                    this.yVelocity = gravity(this,0.2);
                } else {
                    this.drop = true;
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
                    }
                    if (newCoords[5]) {
                        this.collideLeft = true;
                    } else if (newCoords[6]) {
                        this.collideRight = true;
                    }
                }

                if (this.collideLeft && this.directionX == 1) {
                    this.xVelocity = 0;
                } else if (this.collideRight && this.directionX == -1) {
                    this.xVelocity = 0;
                }
                this.x += this.xVelocity;

                if (collisionDamage(this) > 0 && this.collisionCooldownDamage <= 0) {
                    this.yVelocity -= 2.5;
                    this.collisionCooldownDamage = 50;
                    this.grounded = false;
                    this.health -= 1;
                    this.damageFlash = 100;
                }

                if (this.collisionCooldownDamage > 0) {
                    this.collisionCooldownDamage -= 1;
                }

                if (this.health <= 0) {
                    for (var i = 0; i < this.coins; i++) {
                        drops.push(new coin(this.xCenter,this.y,0));
                    }
                    this.dead = true;
                }

                this.xCenter = this.x + this.width / 2;
                this.yCenter = this.y + this.height / 2;

                if (collideWith(this,player) && player.invulnerable == 0) {
                    player.health -= this.damage;
                    player.invulnerable = 100;
                }
            }
        } else {
            enemyId[this.id].animate(this);
            if (this.trueDeath) {
                return true;
            }
        }
    }
    this.draw = function () {
        if ((this.x * percentW + camera.x * percentW > 250 * percentW ||
           this.x * percentW + this.width * percentW + camera.x * percentW < -10) ||
            (this.y * percentW + camera.y * percentW > 145 * percentW ||
            this.y * percentW + this.height * percentW + camera.y * percentW < -10)) {
            return;
        } else {
            c = gameArea.context;
            c.save();
            c.translate(camera.x * percentW,camera.y * percentW);
            c.scale(this.directionX,1);
            if (this.damageFlash > 0) {
                d = lighting.context;
                d.save();
                d.translate(camera.x * percentW,camera.y * percentW);
                d.filter = "brightness(500%)";
                c.filter = "brightness(" + (100 + this.damageFlash * 3) + "%)";
                d.scale(this.directionX,1);
                d.globalAlpha = this.damageFlash / 100;
                d.drawImage(this.sprite,0 + this.spriteWidth * this.animationFrame,0 + this.animation * this.spriteHeight,this.spriteWidth,this.spriteHeight,this.x * percentW * this.directionX + (this.directionX - 1) * this.width,this.y * percentW - (this.spriteHeight - this.height * 0.8) * 1.25 * percentW, this.spriteWidth * 1.25 * percentW, this.spriteHeight * 1.25 * percentW);
                d.restore();
            }
            c.drawImage(this.sprite,0 + this.spriteWidth * this.animationFrame,0 + this.animation * this.spriteHeight,this.spriteWidth,this.spriteHeight,this.x * percentW * this.directionX + (this.directionX - 1) * this.width,this.y * percentW - (this.spriteHeight - this.height * 0.8) * 1.25 * percentW, this.spriteWidth * 1.25 * percentW, this.spriteHeight * 1.25 * percentW);
            c.restore();
        }
    }
}

function enemiesUpdate() {
    for (var i=0;i<enemies.length;i++) {
        if (enemies[i].update()) {
            enemies.splice(i,1);
            i -= 1;
        }
    }
}

function enemiesDraw() {
    for (var i=0;i<enemies.length;i++) {
        enemies[i].draw();
    }
}