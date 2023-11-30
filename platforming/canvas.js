//Percent of width and height
var percentW, scrollSpeed;

//Defining the canvas area
var gameArea = {
    canvas : document.createElement("canvas"),
    init : function () {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = this.canvas.width / 2
        percentW = this.canvas.width / 100;
        scrollSpeed = percentW / 10;
        this.context = this.canvas.getContext("2d");
        document.getElementById("gameContainer").appendChild(this.canvas);
        this.interval = setInterval(gameTick, 20);
    },
    clear : function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var gravity = 0.1;
function gravityUpdate(yVelocity, yVelocityMax, customGravity) {
    if (customGravity) {
        gravity = customGravity;
    } else {
        gravity = 0.1;
    }
    var yVelocityNew = yVelocity + gravity;
    if (yVelocityNew > yVelocityMax) {
        return yVelocityMax;
    } else {
        return yVelocityNew;
    }
}

function gravityCollision(y,yAnchor,left,right) {
    for (var i = 0; i < collision.length; i++) {
        if (((yAnchor > collision[i][1] && y < collision[i][1]) || y > collision[i][1] && (left < collision[i][0] + collision[i][2] || right > collision[i][0]))) {
            return collision[i][1];
        } else {
            return false;
        }
    }
}

var keyLeft = false, keyUp = false, keyRight = false, keyDown = false, keyZ = false, keyX = false, keyC = false;
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
    } else if (key == 67) {
        keyC = true;
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
    } else if (key == 67) {
        keyC = false;
    }
}

var droplist = [
    {
        name: "Health pack",
        draw: function (color) {
            c.fillStyle = "rgb(250,50,50)";
            if (color) {
                c.fillStyle = color;
            }
            c.fillRect(-1 * percentW,-3 * percentW, percentW, percentW);
            c.fillRect(percentW,-3 * percentW, percentW, percentW);
            c.fillRect(-1.5 * percentW,-2.5 * percentW, 0.5 * percentW, percentW);
            c.fillRect(2 * percentW,-2.5 * percentW, 0.5 * percentW, percentW);
            c.fillRect(0,-2.5 * percentW, percentW, percentW);
            c.fillRect(-1 * percentW,-2 * percentW, percentW, percentW);
            c.fillRect(percentW,-2 * percentW, percentW, percentW);
            c.fillRect(-0.5 * percentW,-1 * percentW, 0.5 * percentW, 0.5 * percentW);
            c.fillRect(percentW,-1 * percentW, 0.5 * percentW, 0.5 * percentW);
            c.fillRect(0,-1.5 * percentW, percentW, percentW);
            c.fillRect(0,-0.5 * percentW, percentW, 0.5 * percentW);
        },
        pickup: function () {
            if (player.health < player.healthMax) {
                player.health += 1;
                return true;
            }
        }
    },
    {
        name: "Health plus",
        draw: function (color) {
            c.fillStyle = "rgb(250,250,250)";
            c.save()
            c.scale(1.5,1.5);
            c.fillRect(-1 * percentW,-3 * percentW, percentW, percentW);
            c.fillRect(percentW,-3 * percentW, percentW, percentW);
            c.fillRect(-1.5 * percentW,-2.5 * percentW, 0.5 * percentW, percentW);
            c.fillRect(2 * percentW,-2.5 * percentW, 0.5 * percentW, percentW);
            c.fillRect(0,-2.5 * percentW, percentW, percentW);
            c.fillRect(-1 * percentW,-2 * percentW, percentW, percentW);
            c.fillRect(percentW,-2 * percentW, percentW, percentW);
            c.fillRect(-0.5 * percentW,-1 * percentW, 0.5 * percentW, 0.5 * percentW);
            c.fillRect(percentW,-1 * percentW, 0.5 * percentW, 0.5 * percentW);
            c.fillRect(0,-1.5 * percentW, percentW, percentW);
            c.fillRect(0,-0.5 * percentW, percentW, 0.5 * percentW);
            c.restore();
        },
        pickup: function () {
            player.healthMax += 1;
            player.health = player.healthMax;
            enemiesSpawn.bossfight = false;
            stats.newHeart = 1;
            return true;
        }
    }
]

var weapons = [
    {
        name: "None",
        cooldown: 25,
        damage: 0,
        pierceChance: 1,
        draw: function (width,height,directionX,shootCooldown) {
        },
        bullet: function (directionX,damage,light,accuracy,pierceChance,xOrigin) {
        },
        multiShot: 1,
        accuracy: 0.995,
        xOriginOffset: 0,
        magazine: 10
    },
    {
        name: "Handgun",
        cooldown: 25,
        damage: 1,
        pierceChance: 1,
        draw: function (width,height,directionX,shootCooldown,color) {
            c.fillStyle = "rgb(50,50,50)";
            if (color) {
                c.fillStyle = color;
            }
            c.fillRect(width / 2 - percentW / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 2.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW, percentW, percentW);
        },
        bullet: function (directionX,damage,light,accuracy,pierceChance,xOrigin) {
            return new playerBullet(directionX,damage,light,accuracy,pierceChance,xOrigin);
        },
        multiShot: 1,
        accuracy: 0.995,
        xOriginOffset: 0,
        magazine: 10,
        reload: 60,
        ammo: 100,
        pickup: function () {
            if (player.weapons[1] != 0) {
                drops.push(new drop(player.x + player.width / 2,player.y + player.height / 2, 4 * percentW, 2 * percentW, weapons[player.weapons[player.weapon]].draw,weapons[player.weapons[player.weapon]].pickup,1,0,0,player.weapon));
                player.weapons[player.weapon] = 1;
                player.ammo[player.weapon] = 100;
                player.magazine[player.weapon] = 10;
                return true;
            } else {
                player.weapons[1] = 1;
                player.ammo[1] = 100;
                player.magazine[1] = 10;
                return true;
            }
        }
    },
    {
        name: "Shotgun",
        cooldown: 40,
        damage: 1,
        pierceChance: 0.9,
        draw: function (width,height,directionX,shootCooldown,color) {
            c.fillStyle = "rgb(40,40,40)";
            if (color) {
                c.fillStyle = color;
            }
            c.fillRect(width / 2 - percentW / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 2.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 3.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW, percentW, percentW);
            c.fillStyle = "rgb(45,20,10)";
            if (color) {
                c.fillStyle = color;
            }
            c.fillRect(width / 2 - percentW / 2 + directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW, percentW, percentW * 2);
            c.fillRect(width / 2 - percentW / 2 + directionX * 2 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW * 0.5, percentW, percentW * 0.8);
            c.fillRect(width / 2 - percentW / 2 + directionX * 3 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW * 0.5, percentW, percentW * 0.8);
        },
        bullet: function (directionX,damage,light,accuracy,pierceChance,xOrigin) {
            return new playerBullet(directionX,damage,light,accuracy,pierceChance,xOrigin);
        },
        multiShot: 10,
        accuracy: 0.98,
        xOriginOffset: 1,
        magazine: 2,
        reload: 75,
        ammo: 10,
        pickup: function () {
            if (player.weapons[1] != 0) {
                drops.push(new drop(player.x + player.width / 2,player.y + player.height / 2, 4 * percentW, 2 * percentW, weapons[player.weapons[player.weapon]].draw,weapons[player.weapons[player.weapon]].pickup,1,0,0,player.weapon));
                player.weapons[player.weapon] = 2;
            player.ammo[player.weapon] = 10;
            player.magazine[player.weapon] = 2;
            return true;
            } else {
                player.weapons[1] = 2;
                player.ammo[1] = 10;
                player.magazine[1] = 2;
                return true;
            }
        }
    },
    {
        name: "Assault rifle",
        cooldown: 10,
        damage: 1,
        pierceChance: 0.95,
        draw: function (width,height,directionX,shootCooldown,color) {
            c.fillStyle = "rgb(30,30,40)";
            if (color) {
                c.fillStyle = color;
            }
            c.fillRect(width / 2 - percentW / 2 - directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 - directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 + percentW / 4, percentW, percentW / 1.5);
            c.fillRect(width / 2 - percentW / 2 + directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 + percentW / 4, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 2.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 3.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
            c.fillRect(width / 2 - percentW / 2 + directionX * 4.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
        },
        bullet: function (directionX,damage,light,accuracy,pierceChance,xOrigin) {
            return new playerBullet(directionX,damage,light,accuracy,pierceChance,xOrigin);
        },
        multiShot: 1,
        accuracy: 0.985,
        xOriginOffset: 2,
        magazine: 30,
        reload: 100,
        ammo: 90,
        pickup: function () {
            if (player.weapons[1] != 0) {
                drops.push(new drop(player.x + player.width / 2,player.y + player.height / 2, 4 * percentW, 2 * percentW, weapons[player.weapons[player.weapon]].draw,weapons[player.weapons[player.weapon]].pickup,1,0,0,player.weapon));
                player.weapons[player.weapon] = 3;
                player.ammo[player.weapon] = 90;
                player.magazine[player.weapon] = 30;
                return true;
            } else {
                player.weapons[1] = 3;
                player.ammo[1] = 90;
                player.magazine[1] = 30;
                return true;
            }
        }
    },
    {
        name: "Uzi",
        cooldown: 5,
        damage: 0.5,
        pierceChance: 1,
        draw: function (width,height,directionX,shootCooldown,color) {
            c.fillStyle = "rgb(30,30,40)";
            if (color) {
                c.fillStyle = color;
            }
            c.fillRect(width / 2 - percentW / 2 + directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 + percentW / 4, percentW, percentW * 1.5);
            c.fillRect(width / 2 - percentW / 2 + directionX * 2.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 3.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
        },
        bullet: function (directionX,damage,light,accuracy,pierceChance,xOrigin) {
            return new playerBullet(directionX,damage,light,accuracy,pierceChance,xOrigin);
        },
        multiShot: 1,
        accuracy: 0.985,
        xOriginOffset: 2,
        magazine: 50,
        reload: 70,
        ammo: 150,
        pickup: function () {
            if (player.weapons[1] != 0) {
                drops.push(new drop(player.x + player.width / 2,player.y + player.height / 2, 4 * percentW, 2 * percentW, weapons[player.weapons[player.weapon]].draw,weapons[player.weapons[player.weapon]].pickup,1,0,0,player.weapon));
                player.weapons[player.weapon] = 4;
                player.ammo[player.weapon] = 150;
                player.magazine[player.weapon] = 50;
                return true;
            } else {
                player.weapons[1] = 4;
                player.ammo[1] = 150;
                player.magazine[1] = 50;
                return true;
            }
        }
    },
    {
        name: "Sniper rifle",
        cooldown: 40,
        damage: 4,
        pierceChance: 0.5,
        draw: function (width,height,directionX,shootCooldown,color) {
            c.fillStyle = "rgb(30,30,40)";
            if (color) {
                c.fillStyle = color;
            }
            c.fillRect(width / 2 - percentW / 2 - directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 - directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 + percentW / 4, percentW, percentW / 1.5);
            c.fillRect(width / 2 - percentW / 2 + directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 + percentW / 4, percentW, percentW);
            c.fillRect(width / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW * 1.5, percentW, percentW * 0.9);
            c.fillRect(width / 2 + directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW * 1.5, percentW, percentW / 2);
            c.fillRect(width / 2 + directionX * 2.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW * 1.5, percentW, percentW / 2);
            c.fillRect(width / 2 - percentW / 2 + directionX * 2.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 3.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
            c.fillRect(width / 2 - percentW / 2 + directionX * 4.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
            c.fillRect(width / 2 - percentW / 2 + directionX * 5.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
            c.fillRect(width / 2 - percentW / 2 + directionX * 6.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
        },
        bullet: function (directionX,damage,light,accuracy,pierceChance,xOrigin) {
            return new playerBullet(directionX,damage,light,accuracy,pierceChance,xOrigin);
        },
        multiShot: 1,
        accuracy: 0.9999,
        xOriginOffset: 3,
        magazine: 8,
        reload: 75,
        ammo: 24,
        pickup: function () {
            if (player.weapons[1] != 0) {
                drops.push(new drop(player.x + player.width / 2,player.y + player.height / 2, 4 * percentW, 2 * percentW, weapons[player.weapons[player.weapon]].draw,weapons[player.weapons[player.weapon]].pickup,1,0,0,player.weapon));
                player.weapons[player.weapon] = 5;
                player.ammo[player.weapon] = 24;
                player.magazine[player.weapon] = 8;
                return true;
            } else {
                player.weapons[1] = 5;
                player.ammo[1] = 24;
                player.magazine[1] = 8;
                return true;
            }
        }
    },
    {
        name: "Musket",
        cooldown: 70,
        damage: 15,
        pierceChance: 0.7,
        draw: function (width,height,directionX,shootCooldown,color) {
            c.fillStyle = "rgb(90,40,10)";
            if (color) {
                c.fillStyle = color;
            }
            c.fillRect(width / 2 - percentW / 2 - directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 - directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 + percentW / 4, percentW, percentW / 1.5);
            c.fillRect(width / 2 - percentW / 2 + directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 2.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillStyle = "rgb(30,30,40)";
            if (color) {
                c.fillStyle = color;
            }
            c.fillRect(width / 2 - percentW / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
            c.fillRect(width / 2 - percentW / 2 + directionX * 2.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
            c.fillRect(width / 2 - percentW / 2 + directionX * 3.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
            c.fillRect(width / 2 - percentW / 2 + directionX * 4.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
            c.fillRect(width / 2 - percentW / 2 + directionX * 5.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
            c.fillRect(width / 2 - percentW / 2 + directionX * 6.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
        },
        bullet: function (directionX,damage,light,accuracy,pierceChance,xOrigin) {
            return new playerBullet(directionX,damage,light,accuracy,pierceChance,xOrigin);
        },
        multiShot: 1,
        accuracy: 0.9999,
        xOriginOffset: 3,
        magazine: 8,
        reload: 60,
        ammo: 24,
        pickup: function () {
            if (player.weapons[1] != 0) {
                drops.push(new drop(player.x + player.width / 2,player.y + player.height / 2, 4 * percentW, 2 * percentW, weapons[player.weapons[player.weapon]].draw,weapons[player.weapons[player.weapon]].pickup,1,0,0,player.weapon));
                player.weapons[player.weapon] = 6;
                player.ammo[player.weapon] = 24;
                player.magazine[player.weapon] = 8;
                return true;
            } else {
                player.weapons[1] = 6;
                player.ammo[1] = 24;
                player.magazine[1] = 8;
                return true;
            }
        }
    },
    {
        name: "Revolver",
        cooldown: 30,
        damage: 3,
        pierceChance: 0.7,
        draw: function (width,height,directionX,shootCooldown,color) {
            c.fillStyle = "rgb(90,40,10)";
            if (color) {
                c.fillStyle = color;
            }
            c.fillRect(width / 2 - percentW / 2 + directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 0.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 + percentW / 4, percentW, percentW / 1.5);
            c.fillStyle = "rgb(80,80,80)";
            if (color) {
                c.fillStyle = color;
            }
            c.fillRect(width / 2 - percentW / 2 + directionX * 1.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW);
            c.fillRect(width / 2 - percentW / 2 + directionX * 2.5 * percentW - directionX * shootCooldown / 40 * percentW, height / 2 - percentW / 1.5, percentW, percentW / 2);
        },
        bullet: function (directionX,damage,light,accuracy,pierceChance,xOrigin) {
            return new playerBullet(directionX,damage,light,accuracy,pierceChance,xOrigin);
        },
        multiShot: 1,
        accuracy: 0.995,
        xOriginOffset: 0,
        magazine: 6,
        reload: 60,
        ammo: 18,
        pickup: function () {
            if (player.weapons[1] != 0) {
                drops.push(new drop(player.x + player.width / 2,player.y + player.height / 2, 4 * percentW, 2 * percentW, weapons[player.weapons[player.weapon]].draw,weapons[player.weapons[player.weapon]].pickup,1,0,0,player.weapon));
                player.weapons[player.weapon] = 7;
                player.ammo[player.weapon] = 18;
                player.magazine[player.weapon] = 6;
                return true;
            } else {
                player.weapons[1] = 7;
                player.ammo[1] = 18;
                player.magazine[1] = 6;
                return true;
            }
        }
    }
]

var ammo = [
    {},
    {
        name: "10mm",
        amount: "10",
        draw: function () {
            c.fillStyle = "rgb(50,50,50)";
            c.fillRect(-0.15 * percentW, percentW * -1.6,percentW,percentW * 1.5);
            c.fillStyle = "rgb(150,130,20)";
            c.fillRect(percentW * 0.05, percentW * -1.8,percentW * 0.6,percentW * 0.3);
        },
        pickup: function () {
            if (player.weapons[0] == 1) {
                player.ammo[0] += 10;
                return true;
            } else if (player.weapons[1] == 1) {
                player.ammo[0] += 10;
                return true;
            }
        }
    },
    {
        name: "Shotgun shell",
        amount: "8",
        draw: function () {
            c.fillStyle = "rgb(150,60,60)";
            c.fillRect(percentW * -0.5, percentW * -1.8,percentW * 0.4,percentW * 1.7);
            c.fillRect(0, percentW * -1.8,percentW * 0.4,percentW * 1.7);
            c.fillRect(0.5 * percentW, percentW * -1.8,percentW * 0.4,percentW * 1.7);
            c.fillRect(percentW, percentW * -1.8,percentW * 0.4,percentW * 1.7);
            c.fillStyle = "rgb(170,150,60)";
            c.fillRect(percentW * -0.5,percentW * -1.8,percentW * 0.4,percentW * 0.4);
            c.fillRect(0,percentW * -1.8,percentW * 0.4,percentW * 0.4);
            c.fillRect(0.5 * percentW,percentW * -1.8,percentW * 0.4,percentW * 0.4);
            c.fillRect(percentW ,percentW * -1.8,percentW * 0.4,percentW * 0.4);
        },
        pickup: function () {
            if (player.weapons[0] == 2) {
                player.ammo[0] += 8;
                return true;
            } else if (player.weapons[1] == 2) {
                player.ammo[1] += 8;
                return true;
            }
        }
    },
    {
        name: "5.56mm",
        amount: "30",
        draw: function () {
            c.fillStyle = "rgb(150,130,20)";
            c.fillRect(percentW * -0.6, percentW * -1.5,percentW * 0.3,percentW * 1.4);
            c.fillRect(percentW * -0.2, percentW * -1.5,percentW * 0.3,percentW * 1.4);
            c.fillRect(percentW * 0.2, percentW * -1.5,percentW * 0.3,percentW * 1.4);
            c.fillRect(percentW * 0.6, percentW * -1.5,percentW * 0.3,percentW * 1.4);
            c.fillRect(percentW, percentW * -1.5,percentW * 0.3,percentW * 1.4);
        },
        pickup: function () {
            if (player.weapons[0] == 3) {
                player.ammo[0] += 30;
                return true;
            } else if (player.weapons[1] == 3) {
                player.ammo[1] += 30;
                return true;
            }
        }
    },
    {
        name: "9mm",
        amount: "30",
        draw: function () {
            c.fillStyle = "rgb(150,130,20)";
            c.fillRect(percentW * -0.6, percentW * -1.5,percentW * 0.3,percentW * 1.2);
            c.fillRect(percentW * -0.2, percentW * -1.5,percentW * 0.3,percentW * 1.2);
            c.fillRect(percentW * 0.2, percentW * -1.5,percentW * 0.3,percentW * 1.2);
            c.fillRect(percentW * 0.6, percentW * -1.5,percentW * 0.3,percentW * 1.2);
            c.fillRect(percentW, percentW * -1.5,percentW * 0.3,percentW * 1.2);
        },
        pickup: function () {
            if (player.weapons[0] == 4) {
                player.ammo[0] += 50;
                return true;
            } else if (player.weapons[1] == 4) {
                player.ammo[1] += 50;
                return true;
            }
        }
    },
    {
        name: "7.62mm",
        amount: "8",
        draw: function () {
            c.fillStyle = "rgb(150,130,20)";
            c.fillRect(percentW * -0.6, percentW * -1.5,percentW * 0.4,percentW * 1.5);
            c.fillRect(percentW * -0.1, percentW * -1.5,percentW * 0.4,percentW * 1.5);
            c.fillRect(percentW * 0.4, percentW * -1.5,percentW * 0.4,percentW * 1.5);
            c.fillRect(percentW * 0.9, percentW * -1.5,percentW * 0.4,percentW * 1.5);
            c.fillRect(percentW * -0.5, percentW * -2,percentW * 0.2,percentW * 1.5);
            c.fillRect(0, percentW * -2,percentW * 0.2,percentW * 1.5);
            c.fillRect(percentW * 0.5, percentW * -2,percentW * 0.2,percentW * 1.5);
            c.fillRect(percentW, percentW * -2,percentW * 0.2,percentW * 1.5);
        },
        pickup: function () {
            if (player.weapons[0] == 5) {
                player.ammo[0] += 8;
                return true;
            } else if (player.weapons[1] == 5) {
                player.ammo[1] += 8;
                return true;
            }
        }
    },
    {
        name: "Musket rounds",
        amount: "8",
        draw: function () {
            c.fillStyle = "rgb(150,130,20)";
            c.fillRect(percentW * -0.6, percentW * -1.5,percentW * 0.4,percentW * 1.5);
            c.fillRect(percentW * -0.1, percentW * -1.5,percentW * 0.4,percentW * 1.5);
            c.fillRect(percentW * 0.4, percentW * -1.5,percentW * 0.4,percentW * 1.5);
            c.fillRect(percentW * 0.9, percentW * -1.5,percentW * 0.4,percentW * 1.5);
            c.fillRect(percentW * -0.5, percentW * -2,percentW * 0.2,percentW * 1.5);
            c.fillRect(0, percentW * -2,percentW * 0.2,percentW * 1.5);
            c.fillRect(percentW * 0.5, percentW * -2,percentW * 0.2,percentW * 1.5);
            c.fillRect(percentW, percentW * -2,percentW * 0.2,percentW * 1.5);
        },
        pickup: function () {
            if (player.weapons[0] == 6) {
                player.ammo[0] += 8;
                return true;
            } else if (player.weapons[1] == 6) {
                player.ammo[1] += 8;
                return true;
            }
        }
    }
]

var score = 0;

var background;
function background() {
    this.color = "rgb(20,10,30)";
    this.draw = function () {
        c = gameArea.context;
        c.fillStyle = this.color;
        c.fillRect(0,0,100 * percentW,100 * percentW);
    }
}

var player;
function player() {
    this.x = 50 * percentW;
    this.y = 10 * percentW;
    this.width =  3 * percentW;
    this.height = 5 * percentW;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.yVelocityMax = 1.1;
    this.yAnchor = this.y += this.height;
    this.grounded = false;
    this.jumping = false;
    this.directionX = 1;
    this.directionY = 0;
    this.shootCooldown = 0;
    this.weapon = 0;
    this.weapons = [7,0];
    this.magazine = [10,0];
    this.ammo = [100,0];
    this.reloading = false;
    this.reloadStage = 0;
    this.acceptC = true;
    this.bullets = [];
    this.bulletCasings = [];
    this.health = 3;
    this.healthMax = 3;
    this.death = false;
    this.invulnerable = 0;
    this.draw = function () {
        if (this.health > 0) {
            c = gameArea.context;

            c.save();
            c.scale(1,1);
            if (this.invulnerable != 0) {
                c.globalAlpha = 0.3;
            }
            c.translate(this.x,this.y);
            c.fillStyle = "rgb(255,0,0)";
            c.fillRect(0,0,this.width,this.height);
            weapons[this.weapons[this.weapon]].draw(this.width,this.height,this.directionX,this.shootCooldown);
            c.restore();

            if (this.bulletCasings.length != 0) {
                for (var i = 0; i < this.bulletCasings.length; i++) {
                    this.bulletCasings[i].draw();
                    if (this.bulletCasings[i].update()) {
                        this.bulletCasings.splice(i,1);
                        i -= 1;
                    }
                }
            }
            lightSources.push(new lightSource(this.x + this.width / 2, this.y + this.height / 2, 30 * percentW, "rgba(50,50,30,0.5)"));
        }
    }
    this.update = function () {
        if (this.health > 0) {
            if (this.ammo[0] + this.ammo[1] < 5 && drops.length == 0) {
                dropAmmo(this.x + 5 * percentW, -5 * percentW);
            }
            if (this.reloading == true) {
                this.reloadStage += 1
                if (this.reloadStage == weapons[this.weapons[this.weapon]].reload) {
                    this.reloading = false;
                    this.reloadStage = 0;
                    if (weapons[this.weapons[this.weapon]].magazine <= this.ammo[this.weapon]) {
                        this.magazine[this.weapon] = weapons[this.weapons[this.weapon]].magazine;
                        this.ammo[this.weapon] -= weapons[this.weapons[this.weapon]].magazine;
                    } else {
                        this.magazine[this.weapon] = this.ammo[this.weapon];
                        this.ammo[this.weapon] = 0;
                    }
                    stats.newWeapon = 1;
                }
            }

            if (this.xVelocity * percentW > percentW / 10 && this.x >= 65 * percentW && enemiesSpawn.bossfight == false) {
                scrollSpeed = this.xVelocity * percentW;
                this.x = 65 * percentW;
            } else if (enemiesSpawn.bossfight && enemiesSpawn.bossfightTease > 500) {
                scrollSpeed = 0;
            } else {
                scrollSpeed = percentW / 10;
            }

            this.x -= scrollSpeed;

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
            if (this.shootCooldown != 0) {
                this.shootCooldown -= 1;
            }
            this.x += this.xVelocity * percentW;
            if (this.xVelocity > 0) {
                this.xVelocity -= 0.02;
            } else if (this.xVelocity < 0) {
                this.xVelocity += 0.02;
            }
            if (Math.abs(this.xVelocity) < 0.02) {
                this.xVelocity = 0;
            }
            if (this.invulnerable > 0) {
                this.invulnerable -= 1;
                if (this.invulnerable > 75) {
                    lighting.globalAlpha = 0.7 + (this.invulnerable - 75) / 25 * 0.1;
                    lighting.darkColor = "rgb(" + (this.invulnerable - 75) / 25  * 20 + ",0,0)";
                }
            }
            if (this.x < 0) {
                this.x = 0;
                this.xVelocity = 0.1;
            } else if (this.x + this.width > 100 * percentW) {
                this.x = 100 * percentW - this.width;
                this.xVelocity = -0.1;
            }
        } else if (this.death == false) {
            this.death = true;
            for (var i = 0; i < 10; i++) {
                enemyBodypartParticles.push( new bodypartParticle(this.x + i * this.width / 10,this.y + this.height * Math.random(),this.width / 10 + Math.random() * 2 * percentW,this.height / 10 + Math.random() * 2 * percentW,"rgb(255,0,0)",this.directionX,this.xVelocity));
                scrollSpeed = 0;
            }
        }
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
            if (this.xVelocity > -0.6) {
                this.xVelocity -= 0.06;
            }
            this.directionX = -1;
        }
        if (keyRight) {
            if (this.xVelocity < 0.6) {
                this.xVelocity += 0.06;
            }
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
        if (keyX && this.shootCooldown == 0 && this.magazine[this.weapon] > 0) {
            this.magazine[this.weapon] -= 1;
            this.shootCooldown = weapons[this.weapons[this.weapon]].cooldown;
            var light = 0;
            for (var i=0; i < weapons[this.weapons[this.weapon]].multiShot; i++) {
                this.bullets.push(weapons[this.weapons[this.weapon]].bullet(this.directionX,weapons[this.weapons[this.weapon]].damage,light,weapons[this.weapons[this.weapon]].accuracy,weapons[this.weapons[this.weapon]].pierceChance,weapons[this.weapons[this.weapon]].xOriginOffset));
                light = 1;
            }
            this.bulletCasings.push(new playerBulletCasing(this.directionX));
        }
        if (keyX && this.magazine[this.weapon] == 0 && this.reloading == false && this.ammo[this.weapon] > 0) {
            this.reloading = true;
        }
        if (keyC && this.acceptC && this.weapons[1] != 0) {
            if (this.weapon == 1) {
                this.weapon = 0;
            } else {
                this.weapon = 1;
            }
            this.acceptC = false;
            this.reloading = false;
            this.reloadStage = 0;
            stats.newWeapon = 1;
        }
        if (!keyC && !this.acceptC) {
            this.acceptC = true;
        }
    }
}

function playerBullet(direction,damage,light,accuracy,pierceChance,xOffset) {
    this.direction = direction;
    this.life = 10;
    this.damage = damage;
    this.accuracy = (1 - accuracy) * (Math.random() * 0.2 - 0.1) * percentW;
    this.y = player.y + player.height / 2 - percentW / 2;
    this.xOrigin = player.x + player.width / 2 - percentW / 2 + this.direction * 2 * percentW + this.direction * percentW * xOffset;
    this.light = light;
    this.pierceChance = pierceChance;
    this.searching = true;
    while (this.searching) {
        var lowestDistX = 300 * percentW, xDist = 300 * percentW, indexTemp = NaN;
        for (var i = 0; i < enemies.length; i++) {
            if (lowestDistX > Math.abs(enemies[i].x - this.xOrigin) && 0 < (enemies[i].x - this.xOrigin) * this.direction && this.y + Math.abs(this.xOrigin - enemies[i].x) * this.accuracy > enemies[i].y && this.y + Math.abs(this.xOrigin - enemies[i].x) * this.accuracy < enemies[i].y + enemies[i].height && enemies[i].hitByAccuracy != this.accuracy) {
                lowestDistX = Math.abs(enemies[i].x - this.xOrigin);
                xDist = enemies[i].x
                indexTemp = i;
            }
        }
        if (xDist == 300 * percentW) {
            xDist *= this.direction;
        }
        this.xEnd = xDist;
        this.yEnd = this.y + Math.abs(this.xOrigin - xDist) * this.accuracy;
        this.searching = false;
        if (!isNaN(indexTemp)) {
            enemies[indexTemp].health -= this.damage;
            enemies[indexTemp].penetrationY = this.yEnd;
            enemies[indexTemp].penetrationX = this.xEnd;
            enemies[indexTemp].hitByAccuracy = this.accuracy;
            enemies[indexTemp].hit();
            if (stats.healthbar) {
                var damageList = [];
                damageList.push(enemies[indexTemp].health);
                damageList.push(this.damage)
                damageList.push(0.8);
                stats.damages.push(damageList);
            }
            if (Math.random() > this.pierceChance) {
                this.searching = true;
            }
        }
    }
    this.update = function () {
        this.x -= scrollSpeed;
        this.life -= 1;
        if (this.life == 0) {
            return true;
        }
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.globalCompositeOperation = 'lighter';
        c.beginPath();
        c.moveTo(this.xOrigin, this.y);
        c.lineTo(this.xEnd, this.yEnd);
        c.strokeStyle = "rgba(250,250,100," + this.life / 10 + ")";
        c.lineWidth = percentW / (15 - this.life);
        c.stroke();
        c.restore();
        if (this.light == 0) {
            if (this.life > 5) {
                lightSourcesBack.push(new lightSource(this.xOrigin + this.direction * percentW,this.y,this.life / 10 * percentW, "rgba(255,255,100,0.3)"));
                lightSources.push(new lightSource(this.xOrigin + this.direction * percentW,this.y,percentW * 40, "rgba(20,20,0," + this.life / 15 + ")"));
            }
        }
    }
}

function playerBulletCasing(direction) {
    this.direction = direction;
    this.y = player.y + player.height / 2 - percentW / 2;
    this.x = player.x + player.width / 2 - percentW / 2 + this.direction * 2 * percentW;
    this.grounded = false;
    this.rotation = 0;
    this.rotationSpeed = Math.random() * 20 + 20;
    this.width = percentW * 0.8;
    this.height = percentW * 0.4;
    this.yVelocity = Math.random() * -0.5 + -1;
    this.xVelocity = Math.random() * this.direction * -0.5 - this.direction * 0.1;
    this.yVelocityMax = 2;
    this.update = function () {
        this.x -= scrollSpeed;
        if (this.grounded) {
            if (this.rotationSpeed > 0.1) {
                this.rotationSpeed *= 0.8;
            } else {
                this.rotationSpeed = 0;
            }
            if (Math.abs(this.xVelocity) > 0.01) {
                this.xVelocity *= 0.9;
            } else {
                this.xVelocity = 0;
            }
            if (this.x < -10 * percentW) {
                return true;
            }
        } else {
            this.y += this.yVelocity * percentW;
            if (!this.grounded) {
                this.yVelocity = gravityUpdate(this.yVelocity, this.yVelocityMax);
            }
            this.collision = gravityCollision(this.y,this.y + this.height,this.x,this.x + this.width)
            if (this.collision) {
                this.y = this.collision - this.height;
                this.yVelocity = 0;
                this.grounded = true;
            }
        }
        this.x += this.xVelocity * percentW;
        this.rotation += this.rotationSpeed;
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(this.x,this.y);
        c.fillStyle = "rgb(200,150,0)";
        c.rotate(this.rotation * Math.PI / 180);
        c.fillRect(this.width / -2,this.height / -2,this.width,this.height);
        c.restore();
    }
}

function randomDrops(x,y,width,height) {
        if (Math.random() > 0.97 + 0.03 * (score - 50) / 200 && score > 49 && player.weapons[1] != 2 && player.weapons[0] != 2) {
            drops.push(new drop(x + width / 2,y + height / 2, 3 * percentW, 2 * percentW, weapons[2].draw, weapons[2].pickup,1));
        } else if (Math.random() > 0.97 + 0.03 * score / 150 && player.weapons[1] != 6 && player.weapons[0] != 6) {
            drops.push(new drop(x + width / 2,y + height / 2, 3 * percentW, 2 * percentW, weapons[6].draw, weapons[6].pickup,1));
        } else if (Math.random() > 0.98 + 0.02 * (score - 50) / 200 && score > 49 && player.weapons[1] != 3 && player.weapons[0] != 3) {
            drops.push(new drop(x + width / 2,y + height / 2, 3 * percentW, 2 * percentW, weapons[3].draw, weapons[3].pickup,1));
        } else if (Math.random() > 0.98 + 0.02 * (score - 150) / 250 && score > 149 && player.weapons[1] != 4 && player.weapons[0] != 4) {
            drops.push(new drop(x + width / 2,y + height / 2, 3 * percentW, 2 * percentW, weapons[4].draw, weapons[4].pickup,1));
        } else if (Math.random() > 0.99 + 0.01 * (score - 150) / 250 && score > 149 && player.weapons[1] != 5 && player.weapons[0] != 5) {
            drops.push(new drop(x + width / 2,y + height / 2, 3 * percentW, 2 * percentW, weapons[5].draw, weapons[5].pickup,1));
        }

        if (Math.random() > 0.95 - score / 8000 + player.ammo[0] / weapons[player.weapons[0]].ammo * 0.02 + player.ammo[1] / weapons[player.weapons[1]].ammo * 0.02) {
            dropAmmo(x,y);
        } else if (Math.random() > 0.995 && player.health < player.healthMax) {
            dropHealth(x,y);
        }
        return true;
}

var enemies = [];
function enemy(x,y,width,height) {
    this.x = x;
    this.y = y - height;
    this.width = width;
    this.height = height;
    this.health = 1;
    this.damage = 1;
    this.directionX = -1;
    this.movementStage = 51;
    this.penetrationY = 0;
    this.penetrationX = 0;
    this.hitByAccuracy = 69;
    this.eye = new lightSource(0,Math.random() * this.height / 3 + this.height / 4,percentW / 2, "rgb(150,120,10)",1);
    this.slowness = Math.random() * 30 + 60;
    this.color = "rgb(" + (20 + (Math.random() * 30)) + "," + (40 + (Math.random() * 20)) + "," + "0)";
    this.hit = function () {
        var enemyGore = Math.random() * 10;
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX * -1,0.5,1.8));
        }
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX,1.1,0.4));
        }
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX * -1,1,0.4));
        }
    }
    this.update = function () {
        this.x -= scrollSpeed;
        if (this.movementStage < 35) {
            this.x += 0.1 * percentW * this.directionX;
        } else if (this.movementStage > this.slowness) {
            this.movementStage = 0;
            if (this.x < player.x + player.width / 2) {
                this.directionX = 1;
            } else {
                this.directionX = -1;
            }
        }
        this.movementStage += 1;
        if (this.health <= 0) {
            var enemyGore = Math.round(Math.random() * 5 + 3);
            for (var i = 0; i < enemyGore; i++) {
                enemyBodypartParticles.push(new bodypartParticle(this.x + this.width / enemyGore * i,this.y + this.height * Math.random(), this.width / enemyGore + Math.random() * 2 * percentW, this.height / enemyGore + Math.random() * 2 * percentW, this.color,this.directionX,0));
            }
            enemyGore = Math.random() * 20 + 30;
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX * -1,1,1.8));
            }
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX,1.3,0.4));
            }
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX * -1,1.3,0.4));
            }
            score += 1;
            
            randomDrops(this.x,this.y,this.width,this.height);
            return true;
        }
        if (this.y - this.height < player.y + player.height && player.invulnerable == 0 && ((player.x < this.x + this.width / 2 && player.x + player.width > this.x + this.width / 2) || (player.x + player.width > this.x - this.width / 2 && player.x < this.x - this.width / 2))) {
            player.health -= this.damage;
            player.invulnerable = 100;
        }
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(this.x,this.y);
        c.fillStyle = this.color;
        c.fillRect(this.width / -2,0,this.width,this.height);
        this.eye.draw();
        c.translate(this.width / 3 * this.directionX,0);
        this.eye.draw();
        c.restore();
    }
}

function runner(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = 1;
    this.damage = 1;
    this.directionX = 1;
    this.penetrationY = 0;
    this.penetrationX = 0;
    this.hitByAccuracy = 69;
    this.xVelocity = 0;
    this.grounded = false;
    this.yVelocity = 0;
    this.xVelocityMax = 0.45;
    this.yVelocityMax = 1;
    this.color = "rgb(" + (50 + (Math.random() * 30)) + "," + (70 + (Math.random() * 20)) + "," + "0)";
    this.eye = new lightSource(0,Math.random() * this.height / 3 + this.height / 4,percentW / 2, "rgb(200,80,10)",1);
    this.hit = function () {
        var enemyGore = Math.random() * 10 + 5;
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX * -1,0.5,1.8));
        }
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX,1.1,0.4));
        }
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX * -1,1,0.4));
        }
    }
    this.update = function () {
        this.x -= scrollSpeed;
        this.x += this.xVelocity * percentW;
        if (Math.abs(this.xVelocity + this.directionX * 0.03) < this.xVelocityMax) {
            this.xVelocity += 0.03 * this.directionX;
        }
        if (this.grounded) {
            if (this.x < player.x + player.width / 2) {
                this.directionX = 1;
            } else {
                this.directionX = -1;
            }
            if (Math.random() > 0.9) {
                this.yVelocity = -0.3;
                this.grounded = false;
            }
        } else {
            this.y += this.yVelocity * percentW;
            if (!this.grounded) {
                this.yVelocity = gravityUpdate(this.yVelocity, this.yVelocityMax,0.03);
            }
            this.collision = gravityCollision(this.y,this.y + this.height,this.x,this.x + this.width)
            if (this.collision) {
                this.y = this.collision - this.height;
                this.yVelocity = 0;
                this.grounded = true;
            }
        }
        
        if (this.health <= 0) {
            var enemyGore = Math.round(Math.random() * 5 + 3);
            for (var i = 0; i < enemyGore; i++) {
                enemyBodypartParticles.push(new bodypartParticle(this.x + this.width / enemyGore * i,this.y + this.height * Math.random(), this.width / enemyGore + Math.random() * 2 * percentW, this.height / enemyGore + Math.random() * 2 * percentW, this.color,this.directionX,this.xVelocity));
            }
            enemyGore = Math.random() * 20 + 30;
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX * -1,1,1.8));
            }
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX,1.3,0.4));
            }
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX * -1,1.3,0.4));
            }
            score += 1;
            randomDrops(this.x,this.y,this.width,this.height);
            return true;
        }
        if (this.y < player.y + player.height && player.invulnerable == 0 && ((player.x < this.x + this.width / 2 && player.x + player.width > this.x + this.width / 2) || (player.x + player.width > this.x - this.width / 2 && player.x < this.x - this.width / 2))) {
            player.health -= this.damage;
            player.invulnerable = 100;
        }
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(this.x,0);
        c.fillStyle = this.color;
        c.fillRect(this.width / -2,this.y,this.width,this.height);
        c.translate(0,this.y);
        this.eye.draw();
        c.translate(this.width / 3 * this.directionX,0);
        this.eye.draw();
        c.restore();
    }
}

function enemyBig(x,y,width,height) {
    this.x = x;
    this.y = y - height;
    this.width = width;
    this.height = height;
    this.health = 5;
    this.damage = 1;
    this.directionX = -1;
    this.movementStage = 51;
    this.penetrationY = 0;
    this.penetrationX = 0;
    this.hitByAccuracy = 69;
    this.slowness = Math.random() * 30 + 90;
    this.eye = new lightSource(0,Math.random() * this.height / 3 + this.height / 3,percentW / 2, "rgb(150,100,10)",1);
    this.color = "rgb(" + (20 + (Math.random() * 30)) + "," + (40 + (Math.random() * 20)) + "," + "0)";
    this.hit = function () {
        var enemyGore = Math.random() * 20 + 5;
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX * -1,0.5,1.8));
        }
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX,1.1,0.4));
        }
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX * -1,1,0.4));
        }
    }
    this.update = function () {
        this.x -= scrollSpeed;
        if (this.movementStage < 35) {
            this.x += 0.1 * percentW * this.directionX;
        } else if (this.movementStage > this.slowness) {
            this.movementStage = 0;
            if (this.x < player.x + player.width / 2) {
                this.directionX = 1;
            } else {
                this.directionX = -1;
            }
        }
        this.movementStage += 1;
        if (this.health <= 0) {
            var enemyGore = Math.round(Math.random() * 5 + 3);
            for (var i = 0; i < enemyGore; i++) {
                enemyBodypartParticles.push(new bodypartParticle(this.x + this.width / enemyGore * i,this.y + this.height * Math.random(), this.width / enemyGore + Math.random() * 2 * percentW, this.height / enemyGore + Math.random() * 2 * percentW, this.color,this.directionX,0));
            }
            enemyGore = Math.random() * 20 + 30;
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX * -1,1,1.8));
            }
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX,2,0.4));
            }
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX * -1,2,0.4));
            }
            score += 1;
            randomDrops(this.x,this.y,this.width,this.height);
            return true;
        }
        if (this.y - this.height < player.y + player.height && player.invulnerable == 0 && ((player.x < this.x + this.width / 2 && player.x + player.width > this.x + this.width / 2) || (player.x + player.width > this.x - this.width / 2 && player.x < this.x - this.width / 2))) {
            player.health -= this.damage;
            player.invulnerable = 100;
        }
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(this.x,this.y);
        c.fillStyle = this.color;
        c.fillRect(this.width / -2,0,this.width,this.height);
        this.eye.draw();
        c.translate(this.width / 3 * this.directionX,0);
        this.eye.draw();
        c.restore();
    }
}

var enemyBodypartParticles = [];
function bodypartParticle(x,y,width,height,color,direction,xSpeed) {
    this.direction = direction;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.grounded = false;
    this.rotation = 0;
    this.rotationSpeed = Math.random() * -10 * this.direction;
    this.yVelocity = Math.random() * -0.7;
    if (xSpeed) {
        this.xVelocity = Math.random() * 0.2 * xSpeed + xSpeed * 0.8;
    } else {
        this.xVelocity = Math.random() * 0.7 - 0.1;
    }
    this.yVelocityMax = 1;
    this.update = function () {
        this.x -= scrollSpeed;
        if (this.grounded) {
            if (this.rotationSpeed > 0.1) {
                this.rotationSpeed *= 0.6;
            } else {
                this.rotationSpeed = 0;
            }
            if (Math.abs(this.xVelocity) > 0.1) {
                this.xVelocity *= 0.6;
            } else {
                this.xVelocity = 0;
            }
            if (this.x < -10 * percentW) {
                return true;
            }
        } else {
            this.y += this.yVelocity * percentW;
            if (!this.grounded) {
                this.yVelocity = gravityUpdate(this.yVelocity, this.yVelocityMax);
            }
            this.collision = gravityCollision(this.y,this.y - this.height / 3,this.x,this.x + this.width)
            if (this.collision) {
                this.y = this.collision;
                this.yVelocity = 0;
                this.grounded = true;
            }
        }
        this.x += this.xVelocity * percentW;
        this.rotation += this.rotationSpeed;
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(this.x,this.y);
        c.fillStyle = this.color;
        c.rotate(this.rotation * Math.PI / 180);
        c.fillRect(this.width / -2,this.height / -2,this.width,this.height);
        c.restore();
    }
}

var bloodParticles = [];
function bloodParticle(x,y,direction,size,xspeed) {
    this.direction = direction;
    this.x = x;
    this.y = y;
    this.color = "rgba(" + (Math.random() * 40 + 200) + ",0,0,";
    this.radius = (Math.random() * percentW / 5 + percentW / 10) * size;
    this.grounded = false;
    this.yVelocity = Math.random() * -1;
    this.xVelocity = (Math.random() * this.direction * -1) * xspeed;
    this.yVelocityMax = 2;
    this.life = Math.floor(25 * size);
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color + "1)";
        c.fill();
        c.restore();
    }
    this.update = function () {
        this.x -= scrollSpeed;
        this.life -= 1
        this.y += this.yVelocity * percentW;
        if (!this.grounded) {
            this.yVelocity = gravityUpdate(this.yVelocity, this.yVelocityMax);
        }
        this.collision = gravityCollision(this.y,this.y - this.height / 3,this.x,this.x + this.width)
        if (this.collision) {
            this.y = this.collision - this.height / 3;
            this.yVelocity = 0;
            this.grounded = true;
        }
        if (this.life == 0) {
            return true;
        }
        this.radius -= this.radius / this.life;
        this.x += this.xVelocity * percentW;
    }
}

function enemiesUpdate() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].update()) {
            enemies.splice(i,1);
            i -= 1;
        }
    }
}

function drawBodyPartParticles() {
    for (var i = 0; i < enemyBodypartParticles.length; i++) {
        if (enemyBodypartParticles[i].update()) {
            enemyBodypartParticles.splice(i,1);
            i -= 1;
        }
    }
    if (enemyBodypartParticles.length > 0) {
        for (var i = 0; i < enemyBodypartParticles.length; i++) {
            enemyBodypartParticles[i].draw();
        }
    }
}

function enemiesDraw() {
    if (enemies.length > 0) {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].draw();
        }
    }
}

var explosions = [];
function explosion(x,y,radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.life = 15;
    this.update = function () {
        this.radius -= this.radius / (this.life + 2) / 5;
        lightSources.push(new lightSource(this.x, this.y, this.radius, "rgba(120,100,0," + this.life / 10 + ")"));
        if (this.life == 1) {
            return true;
        }
        this.life -= 0.5;
    }
}

function updateExplosions() {
    for (var i = 0; i < explosions.length; i++) {
        if (explosions[i].update()) {
            explosions.splice(i,1);
            i -= 1;
        }
    }
}

function tire(x,bouncing,direction,speed) {
    this.x = x;
    this.radius = 3 * percentW;
    this.y = 50 * percentW - this.radius;
    this.bouncing = Boolean(bouncing);
    this.side = direction;
    this.grounded = false;
    this.yVelocity = 0;
    this.xVelocity = speed;
    if (this.bouncing == false) {this.xVelocity *= 1.7;}
    this.yVelocityMax = 1;
    this.damage = 1;
    this.update = function () {
        this.x -= scrollSpeed;
        if (this.grounded && this.bouncing) {
            this.yVelocity = -1.1;
            this.grounded = false;
        } else if (!this.grounded) {
            this.y += this.yVelocity * percentW;
            if (!this.grounded) {
                this.yVelocity = gravityUpdate(this.yVelocity, this.yVelocityMax,0.03);
            }
            this.collision = gravityCollision(this.y,this.y + this.radius * 1.3,this.x,this.x + this.radius)
            if (this.collision) {
                this.y = this.collision - this.radius * 1.3;
                this.yVelocity = 0;
                this.grounded = true;
            }
        }
        if (((player.y < this.y + this.radius * 0.8 && player.y + player.height > this.y + this.radius * 0.8) || (player.y + player.height > this.y - this.radius * 0.8 && player.y < this.y - this.radius * 0.8)) && player.invulnerable == 0 && ((player.x < this.x + this.radius * 0.8 && player.x + player.width > this.x + this.radius * 0.8) || (player.x + player.width > this.x - this.radius * 0.8 && player.x < this.x - this.radius * 0.8))) {
            player.health -= this.damage;
            player.invulnerable = 100;
        }
        this.x += this.xVelocity * percentW;
        if ((this.x < -26 * percentW && this.side == 1) || (this.x > 126 * percentW && this.side == 0)) {
                return true;
        }
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.beginPath();
        c.lineWidth = 2 * percentW;
        c.strokeStyle = "rgb(30,20,20)";
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.stroke();
        c.restore();
        
        lightSources.push(new lightSource(this.x,this.y, this.radius / 1.8 + Math.random() * percentW / 2,"rgba(120,100,0,1)",0.5));
        lightSourcesBack.push(new lightSource(this.x,this.y, this.radius * 3.8 + Math.random() * percentW / 2,"rgba(120,100,0,1)"));
        
        for (var i = 0; i < Math.random() * 12; i++) {
            fireParticles.push(new fireParticle(this.x + Math.random() * this.radius * 2 - this.radius,this.y + Math.random() * this.radius * 2 - this.radius));
        }
    }
}

function fire() {
    this.x = 125 * percentW;
    this.y = 40 * percentW;
    this.width = Math.random() * percentW + 1 * percentW;
    this.damage = 1;
    this.update = function () {
        this.x -= scrollSpeed;
        if (player.grounded && player.invulnerable == 0 && ((player.x < this.x + this.width && player.x + player.width > this.x + this.width) || (player.x + player.width > this.x - this.width && player.x < this.x - this.width))) {
            player.health -= this.damage;
            player.invulnerable = 100;
        }
        if (this.x < -26 * percentW) {
                return true;
        }
    }
    this.draw = function () {
        lightSources.push(new lightSource(this.x,this.y - this.width, this.width * 2 + Math.random() * percentW / 2,"rgba(120,100,0,0.7)"));
        lightSourcesBack.push(new lightSource(this.x,this.y, this.width * 3.8 + Math.random() * percentW / 2,"rgba(120,100,0,0)"));
        
        for (var i = 0; i < Math.random() * 12; i++) {
            fireParticles.push(new fireParticle(this.x + Math.random() * this.width * 4 - this.width * 2,this.y));
        }
    }
}

var fireParticles = [];
function fireParticle(x,y) {
    this.x = x;
    this.y = y;
    this.color = "rgba(" + (Math.random() * 40 + 200) + "," + (Math.random() * 40 + 150) + ",0,";
    this.yVelocity = Math.random() * -1;
    this.xVelocity = Math.random() * 0.5 - 0.25;
    this.life = Math.floor(Math.random() * 30);
    this.lifeMax = this.life
    this.radius = percentW * this.life / 30;
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color + "1)";
        c.fill();
        c.restore();
        
        lightSourcesBack.push(new lightSource(this.x,this.y, this.radius,"rgba(120,100,0,0.8)"))
        lightSources.push(new lightSource(this.x,this.y, this.radius / 1.5,"rgba(120,100,0,0.5)"))
    }
    this.update = function () {
        this.x -= scrollSpeed;
        this.life -= 1
        this.y += this.yVelocity * percentW;
        if (this.life < 0.1) {
            return true;
        }
        this.radius -= this.radius / this.life;
        this.x += this.xVelocity * percentW;
    }
}

function flickerLights() {
    flicker = 0.2 + Math.random() * 0.4;
}

function boss1() {
    this.x = percentW * 50;
    this.y = percentW * -50;
    this.width = percentW * 8;
    this.height = percentW * 8;
    this.health = 100;
    this.healthMax = 100;
    this.damage = 1;
    this.directionX = 1;
    this.penetrationY = 0;
    this.penetrationX = 0;
    this.hitByAccuracy = 69;
    this.xVelocity = 0;
    this.grounded = false;
    this.slowness = 70;
    this.action = false;
    this.actionStage = 0;
    this.yVelocity = 0;
    this.xVelocityMax = 0.45;
    this.yVelocityMax = 2;
    stats.damages = [];
    this.flickerCount = 0;
    this.color = "rgb(" + (50 + (Math.random() * 30)) + "," + (70 + (Math.random() * 20)) + "," + "0)";
    this.eye = new lightSource(0,this.height * 0.6,percentW / 2,"rgb(250,50,10)",1);
    this.hit = function () {
        var enemyGore = Math.random() * 10 + 5;
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX * -1,0.5,1.8));
        }
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX,1.1,0.4));
        }
        for (var i = 0; i < enemyGore; i++) {
            bloodParticles.push(new bloodParticle(this.penetrationX + this.directionX * this.width / 2,this.penetrationY,this.directionX * -1,1,0.4));
        }
    }
    this.update = function () {
        stats.health = this.health;
        this.x -= scrollSpeed;
        this.x += this.xVelocity * percentW;
        if (this.grounded) {
            if (this.action == false && this.actionStage == 0) {
                if (this.x < player.x + player.width / 2) {
                    this.directionX = 1;
                } else {
                    this.directionX = -1;
                }
                this.slowness -= 1;
                this.xVelocity = 0;
            } else if (this.action == false && this.actionStage == 1) {
                this.xVelocity = -0.5 * this.directionX;
                this.grounded = false;
                this.yVelocity = -0.6;
                this.actionStage = 2;
                if (this.action != 1) {
                    this.flickerCount = 10;
                    for (var i = 0; i < player.bulletCasings.length; i++) {
                        if (player.bulletCasings[i].grounded) {
                            player.bulletCasings[i].yVelocity = -0.4 - Math.random() * 0.5;
                            player.bulletCasings[i].grounded = false;
                            player.bulletCasings[i].rotationSpeed = Math.random() * 20 - 10;
                        }
                    }
                    if (player.grounded) {
                        player.yVelocity = -0.4;
                        player.grounded = false;
                    }
                    if (Math.random() > 0.9) {
                        dropAmmo(40 * percentW + 20 * Math.random() * percentW, -5 * percentW);
                    }
                }
            }
        } else {
            this.y += this.yVelocity * percentW;
            if (!this.grounded) {
                this.yVelocity = gravityUpdate(this.yVelocity, this.yVelocityMax,0.1);
            }
            this.collision = gravityCollision(this.y,this.y + this.height,this.x,this.x + this.width)
            if (this.collision) {
                this.y = this.collision - this.height;
                this.yVelocity = 0;
                this.grounded = true;
                this.slowness = 70;
                enemiesSpawn.bossfightTease = 602;
                if (this.action != 1 && this.actionStage != 2) {
                    this.action = false;
                    this.actionStage = 0;
                } else if (this.actionStage != 2) {
                    this.actionStage = 1;
                }
                this.xVelocity = 0;
                lighting.darkColor = "rgb(10,0,0)";
                stats.healthbar = true;
                stats.healthMax = this.healthMax;
                if (this.action != 1 && this.actionStage != 2) {
                    this.flickerCount = 10;
                    for (var i = 0; i < player.bulletCasings.length; i++) {
                        if (player.bulletCasings[i].grounded) {
                            player.bulletCasings[i].yVelocity = -0.4 - Math.random() * 0.5;
                            player.bulletCasings[i].grounded = false;
                            player.bulletCasings[i].rotationSpeed = Math.random() * 20 - 10;
                        }
                    }
                    if (player.grounded) {
                        player.yVelocity = -0.4;
                        player.grounded = false;
                    }
                    if (Math.random() > 0.9) {
                        dropAmmo(40 * percentW + 20 * Math.random() * percentW, -5 * percentW);
                    }
                }
                if (this.actionStage == 2) {
                    this.actionStage = 0;
                }
            }
        }
        
        if (this.flickerCount > 0) {
            flickerLights();
            this.flickerCount -= 1;
        }
        
        if (this.slowness < 1 && this.action == false) {
            if (Math.random() > 0.4 && (this.x < 96 * percentW|| this.x > 4 * percentW)) {
                this.action = 1;
            } else {
                this.action = 2;
            }
            this.actionStage = 0;
        }
        
        //charge
        if (this.action == 1) {
            if (this.actionStage == 0 && this.grounded) {
                this.yVelocity = -0.6;
                this.grounded = false;
            }
            if (this.actionStage == 1) {
                this.xVelocity += 0.03 * this.directionX;
                if (this.x + this.xVelocity * percentW < 4 * percentW) {
                    this.xVelocity = (4 * percentW - this.x) / percentW;
                    this.action = false;
                } else if (this.x + this.xVelocity * percentW > 96 * percentW) {
                    this.xVelocity = (96 * percentW - this.x) / percentW;
                    this.action = false;
                }
            }
        }
        
        //jump
        if (this.action == 2) {
            this.actionStage += 1;
            if (this.actionStage < 2) {
                this.yVelocity = -2.3;
                this.grounded = false;
                this.xVelocity = (player.x + player.width / 2 - this.x) / percentW / 50 + Math.random() * 0.2;
                if (this.xVelocity * 50 * percentW + this.x > 94 * percentW) {
                    this.xVelocity = (94 * percent - this.x) / percentW / 50;
                } else if (this.xVelocity * 50 * percentW + this.x < 6 * percentW) {
                    this.xVelocity = ((6 * percentW - this.x) / percentW / 50);
                }
            }
        }
        
        if (this.health <= 0) {
            var enemyGore = Math.round(Math.random() * 5 + 3);
            for (var i = 0; i < enemyGore; i++) {
                enemyBodypartParticles.push(new bodypartParticle(this.x + this.width / enemyGore * i,this.y + this.height * Math.random(), this.width / enemyGore + Math.random() * 2 * percentW, this.height / enemyGore + Math.random() * 2 * percentW, this.color,this.directionX,this.xVelocity));
            }
            enemyGore = Math.random() * 20 + 40;
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX * -1,3,1.8));
            }
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX,1.6,0.4));
            }
            for (var i = 0; i < enemyGore; i++) {
                bloodParticles.push(new bloodParticle(this.penetrationX,this.penetrationY,this.directionX * -1,6,0.4));
            }
            score += 1;
            randomDrops(this.x,this.y,this.width,this.height);
            lighting.darkColor = "rgb(0,0,0)";
            enemiesSpawn.boss1 = true;
            stats.healthbar = false;
            drops.push(new drop(this.x,this.y,4 * percentW, 2 * percentW, droplist[1].draw,droplist[1].pickup,0,1,2));
            return true;
        }
        if (((this.y < player.y + player.height && player.y < this.y + this.height) || (player.y + player.height > this.y && player.y < this.y)) && player.invulnerable == 0 && ((player.x < this.x + this.width / 2 && player.x + player.width > this.x + this.width / 2) || (player.x + player.width > this.x - this.width / 2 && player.x < this.x - this.width / 2))) {
            player.health -= this.damage;
            player.invulnerable = 100;
        }
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(this.x,0);
        c.fillStyle = this.color;
        c.fillRect(this.width / -2,this.y,this.width,this.height);
        c.translate(0,this.y);
        this.eye.draw();
        c.translate(this.width / 3 * this.directionX,0);
        this.eye.draw();
        c.restore();
    }
}

var enemiesSpawn;
function enemiesSpawn() {
    this.count = 0;
    this.bossfight = false;
    this.boss1 = false;
    this.bossfightTease = 0;
    this.update = function () {
        if (this.bossfight == false) {
            if (score < 350) {
                this.count += (1 + Math.sqrt(score) / 3) * (scrollSpeed / (percentW / 10));
            } else {
                this.count += 6 * (scrollSpeed / (percentW / 10));
            }
        }
        if (score > 249 && this.boss1 == false && this.bossfight == false) {
            this.bossfight = 1;
            this.count = 0;
            this.bossfightTease = 50;
        }
        if (this.bossfight == 1 && enemies.length == 0 && this.bossfightTease < 601) {
            this.bossfightTease += 1;
            if (this.bossfightTease % 3 == 0 && ((this.bossfightTease < 151 && this.bossfightTease > 99) || (this.bossfightTease < 351 && this.bossfightTease > 300) || (this.bossfightTease < 500 && this.bossfightTease > 399))) {
                flicker = 0.2 + Math.random() * 0.4;
            }
            if (this.bossfightTease > 500) {
                flicker = 1;
            }
            if (this.bossfightTease > 600) {
                enemies.push(new boss1);
            }
        }
        if (this.bossfight == 1 && this.bossfightTease == 601) {
            flicker = 1;
        }
        if (this.count > 200) {
            if (Math.random() > 0.3 + score / 1200) {
                enemies.push(new enemy(percentW * 104,40 * percentW,Math.random() * 2 * percentW + 4 * percentW,Math.random() * 2 * percentW + 4 * percentW));
            } else if (Math.random() > 0.9) {
                enemies.push(new enemyBig(percentW * 104,40 * percentW,Math.random() * 4 * percentW + 9 * percentW,Math.random() * 4 * percentW + 9 * percentW));
            } else if (score > 100 && Math.random() > 0.8) {
                enemies.push(new runner(percentW * 150 * Math.round(Math.random()) - 25 * percentW,40 * percentW,Math.random() * 2 * percentW + 4 * percentW,Math.random() * 2 * percentW + 4 * percentW));
            }
            this.count = this.count - 200;
            if (Math.random() > 1 - score / 4525 && score < 500) {
                var explosionSide = Math.round(Math.random());
                explosions.push(new explosion(150 * percentW * explosionSide - 25 * percentW, 30 * percentW, 50 * percentW));
                enemies.push(new tire(150 * percentW * explosionSide - 25 * percentW, Math.round(Math.random()), explosionSide, (Math.random() * -0.4 - score / 1666 - 0.1) * (explosionSide * 2 - 1)));
                if (explosionSide == 1 && Math.random() > 0.7) {
                    enemies.push(new fire());
                }
            } else if (score > 499 && Math.random() > 0.9) {
                var explosionSide = Math.round(Math.random());
                explosions.push(new explosion(150 * percentW * explosionSide - 25 * percentW, 30 * percentW, 50 * percentW));
                enemies.push(new tire(150 * percentW * explosionSide - 25 * percentW, Math.round(Math.random()), explosionSide, (Math.random() * -0.3 - 0.5) * (explosionSide * 2 - 1)));
            }
        }
    }
}

function updateParticles() {
    for (var i = 0; i < bloodParticles.length; i++) {
        if (bloodParticles[i].update()) {
            bloodParticles.splice(i,1);
            i -= 1;
        }
    }
    for (var i = 0; i < fireParticles.length; i++) {
        if (fireParticles[i].update()) {
            fireParticles.splice(i,1);
            i -= 1;
        }
    }
}

function drawParticles() {
    if (bloodParticles.length > 0) {
        for (var i = 0; i < bloodParticles.length; i++) {
            bloodParticles[i].draw();
        }
    }
    if (fireParticles.length > 0) {
        for (var i = 0; i < fireParticles.length; i++) {
            fireParticles[i].draw();
        }
    }
}

var collision = [];

var platform;
function platform(x,y,width,height) {
    this.x = x * percentW;
    this.y = y * percentW;
    this.width = width * percentW;
    this.height = height * percentW;
    collision.push([this.x,this.y,this.width,this.height]);
    this.draw = function() {
        c = gameArea.context;
        c.fillStyle = "rgb(80,80,120)";
        c.fillRect(this.x,this.y,this.width,this.height);
        var lightGradient = c.createLinearGradient(0,this.y,0,this.y + this.height);
        lightGradient.addColorStop(1,"rgba(0,0,0,0.8)");
        lightGradient.addColorStop(0,"rgba(0,0,0,0)");
        c.fillStyle = lightGradient;
        c.fillRect(this.x,this.y,this.width,this.height);
    }
}

var lighting = new lighting();
function lighting() {
    this.darkColor = "rgba(0,0,0)";
    this.globalAlpha = 0.7;
    this.drawDark = function () {
        c = gameArea.context;
        c.globalAlpha = this.globalAlpha;
        c.fillStyle = this.darkColor;
        c.fillRect(0,0,100 * percentW, 50 * percentW);
        c.globalAlpha = 1;
    }
}

function lightSource(x,y,radius,color1, opacity) {
    this.x = x;
    this.y = y;
    this.radius = radius
    this.color1 = color1;
    if (opacity) {
        this.opacity = opacity;
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.globalCompositeOperation = 'lighter';
        c.globalAlpha = this.opacity;
        var lightGradient = c.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius);
        lightGradient.addColorStop(0, this.color1);
        lightGradient.addColorStop(1,"rgb(0,0,0)");
        c.fillStyle = lightGradient;
        c.filter = "blur(" + percentW + ")";
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fill();
        c.restore();
    }
}

var lightSources = [], flicker = 0.05;
function drawLightSources() {
    if (lightSources.length > 0) {
        c.save();
        c.globalAlpha = 1 - flicker + Math.random() * (1-flicker) / 2;
        for (var i = 0; i < lightSources.length; i++) {
            lightSources[i].draw();
        }
        c.restore();
    }
    lightSources = [];
}

var lightSourcesBack = [];
function drawLightSourcesBack() {
    if (lightSourcesBack.length > 0) {
        c.save();
        c.globalAlpha = 1 - flicker + Math.random() * (1-flicker) / 2;
        for (var i = 0; i < lightSourcesBack.length; i++) {
            lightSourcesBack[i].draw();
        }
        c.restore();
    }
    lightSourcesBack = [];
}

var streetlightSpawn = 0, streetlights = [];
function spawnstreetlights() {
    streetlightSpawn += 1 * (scrollSpeed / (percentW / 10));
    if (streetlightSpawn > 450) {
        streetlights.push(new streetLight);
        streetlightSpawn = streetlightSpawn - 450;
    }
    for (var i = 0; i < streetlights.length; i++) {
        if (streetlights[i].update()) {
            streetlights.splice(i,1);
            i -= 1;
        }
    }
    if (streetlights.length > 0) {
        for (var i = 0; i < streetlights.length; i++) {
            streetlights[i].draw();
        }
    }
}

function streetLight() {
    this.x = 110 * percentW;
    this.y = percentW * 10;
    this.draw = function () {
        c = gameArea.context;
        c.fillStyle = "rgb(50,50,50)";
        c.fillRect(this.x,this.y,percentW,percentW * 30);
        c.fillRect(this.x-percentW,this.y-percentW,percentW*3,percentW);
        c.fillStyle = "rgb(250,250,250)";
        c.fillRect(this.x,this.y,percentW,percentW);
        
        lightSourcesBack.push(new lightSource(this.x + percentW/2,this.y + percentW/2, percentW * 5, "rgba(100,100,50,1)"));
    }
    this.update = function () {
        this.x -= scrollSpeed;
        lightSources.push(new streetLightLight(this.x,this.y));
        if (this.x < -10 * percentW) {
            return true;
        }
    }
}

function drawBullets() {
    if (player.bullets.length != 0) {
            for (var i = 0; i < player.bullets.length; i++) {
                player.bullets[i].draw();
                if (player.bullets[i].update()) {
                    player.bullets.splice(i,1);
                    i -= 1;
                }
            }
        }
}

function streetLightLight(x,y) {
    this.x = x;
    this.y = y;
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.globalCompositeOperation = 'lighter';
        c.beginPath();
        c.moveTo(this.x - percentW, this.y);
        c.lineTo(this.x + 2 * percentW, this.y);
        c.lineTo(this.x + percentW + percentW * 7, this.y + 30 * percentW);
        c.lineTo(this.x - percentW * 7, this.y + 30 * percentW);
        c.lineTo(this.x - percentW, this.y);
        c.closePath();
        var lightGradient = c.createLinearGradient(0,0,0,30 * percentW);
        lightGradient.addColorStop(0,"rgba(200,200,150,0.8)");
        lightGradient.addColorStop(1,"rgba(100,100,50,0.2)");
        c.filter = "blur(" + percentW + ")";
        c.fillStyle = lightGradient;
        c.fill();
        c.restore();
    }
}

var drops = [];
function drop(x,y,width,height,draw,pickup,rotate,press,health,weapon) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.graphics = draw;
    this.pickup = pickup;
    this.grounded = false;
    this.yVelocity = Math.random() * -0.1 -0.3;
    this.xVelocity = Math.random() * 0.6 - 0.3;
    if (health) {
        this.health = health;
    }
    if (this.health == 2) {
        this.xVelocity = (percentW * 50 - this.x) / 140 / percentW;
        this.yVelocity = -0.5;
    }
    if (weapon == player.weapon) {
        this.weapon = weapon;
        this.ammo = player.ammo[this.weapon];
        this.magazine = player.magazine[this.weapon];
    }
    this.yVelocityMax = 1;
    this.floating = 0;
    this.rotate = rotate;
    this.press = press;
    this.canpickup = false;
    this.canpickupcount = 0;
    this.floatingSpeed = 0;
    this.update = function () {
        this.x -= scrollSpeed;
        if (this.grounded) {
            if (Math.abs(this.xVelocity) > 0.01) {
                this.xVelocity *= 0.95;
            } else {
                this.xVelocity = 0;
            }
            if (this.x < -10 * percentW) {
                return true;
            }
            if (this.y - this.height < player.y + player.height && ((player.x < this.x + this.width / 2 && player.x + player.width > this.x + this.width / 2) || (player.x + player.width > this.x - this.width / 2 && player.x < this.x - this.width / 2))) {
                if (this.press == 1) {
                    if (this.pickup() == true) {
                        return true;
                    }
                }
                if (!this.canpickup && !keyC) {
                    this.canpickup = true;
                }
            } else {
                this.canpickup = false;
            }
            if (!keyC && this.canpickup == true) {
                this.canpickupcount = 0;
                player.acceptC = false;
            }
            if (this.canpickup && keyC) {
                this.canpickupcount += 1;
            }
            if (this.canpickupcount == 5) {
                if (this.pickup()) {
                    if (this.weapon == 0 || this.weapon == 1) {
                        player.ammo[player.weapon] = this.ammo;
                        player.magazine[player.weapon] = this.weapon;
                    }
                    return true;
                }
            }
        } else {
            this.y += this.yVelocity * percentW;
            if (!this.grounded) {
                this.yVelocity = gravityUpdate(this.yVelocity, this.yVelocityMax, 0.01);
            }
            this.collision = gravityCollision(this.y,this.y - this.height,this.x,this.x + this.width)
            if (this.collision) {
                this.y = this.collision;
                this.yVelocity = 0;
                this.grounded = true;
            }
        }
        this.x += this.xVelocity * percentW;
    }
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.translate(this.x,this.y);
        c.translate(this.width / -2, this.height / -2);
        if (this.rotate == 1) {
            c.rotate(300 * Math.PI / 180);
        }
        this.graphics(0,0,1,0);
        c.globalCompositeOperation = 'lighter';
        this.graphics(0,0,1,0);
        c.restore();
        
        if (this.health == 1) {
            lightSources.push(new lightSource(this.x - percentW / 2,this.y - percentW * 2, 3 * percentW,"rgba(200,50,50,0.7)",0.2));
            lightSources.push(new lightSource(this.x - percentW / 2,this.y - percentW * 2, 10 * percentW,"rgba(200,50,50,0.7)",0.4));
        } else if (this.health == 2) {
            lightSources.push(new lightSource(this.x - percentW * 1.25 ,this.y - percentW * 3.5, 5 * percentW,"rgba(200,200,200,0.7)",0.2));
            lightSources.push(new lightSource(this.x - percentW * 1.25 ,this.y - percentW * 3.5, 16 * percentW,"rgba(200,200,200,0.7)",0.4));
        } else {
            lightSourcesBack.push(new lightSource(this.x - this.width / 3,this.y - this.height * 1.5, this.width * 3, "rgba(100,100,50,0.1)"));
            lightSources.push(new lightSource(this.x - this.width / 3,this.y - this.height * 1.5, this.width,"rgba(80,50,50,0.1)"));
        }
    }
}

function dropsUpdate() {
    for (var i = 0; i < drops.length; i++) {
        if (drops[i].update()) {
            drops.splice(i,1);
            i -= 1;
        }
    }
}

function dropsDraw() {
    if (drops.length > 0) {
        for (var i = 0; i < drops.length; i++) {
            drops[i].draw();
        }
    }
}

function dropAmmo(x,y) {
    this.x = x;
    this.y = y;
    if (player.weapons[1] > 0 && Math.random() > 0.5) {
        drops.push(new drop(this.x,this.y,2 * percentW, percentW, ammo[player.weapons[1]].draw,ammo[player.weapons[1]].pickup,0,1));
    } else if (player.weapons[0] > 0) {
        drops.push(new drop(this.x,this.y,2 * percentW, percentW, ammo[player.weapons[0]].draw,ammo[player.weapons[0]].pickup,0,1));
    }
}

function dropHealth(x,y) {
    this.x = x;
    this.y = y;
    drops.push(new drop(this.x,this.y,2 * percentW, percentW, droplist[0].draw,droplist[0].pickup,0,1,1));
}

var stats = new stats();
function stats() {
    this.healthbar = false;
    this.damages = [];
    this.newHeart = 0;
    this.newWeapon = 0;
    this.draw = function () {
        c = gameArea.context;
        c.save();
        c.scale(0.5,0.5);
        c.translate(4 * percentW, 5 * percentW);
        for (var i = 0; i < player.healthMax; i++) {
            if (i > player.health - 1) {
                droplist[0].draw("rgba(255,255,255,0.3)");
            } else {
                droplist[0].draw("rgba(255,0,0,0.8)");
                if (i == player.healthMax - 1 && this.newHeart > 0) {
                    droplist[0].draw("rgba(255,255,255," + this.newHeart + ")");
                    this.newHeart -= 0.05;
                }
            }
            c.translate(6 * percentW, 0);
        }
        c.restore();
        c.font = percentW * 2 + "px Arial";
        c.strokeStyle = "rgba(255,0,0,0.8)";
        c.textAlign = "right";
        c.strokeText("Zombies killed: " + score, 99 * percentW, percentW * 3);
        if (score < 11) {
            c.textAlign = "center";
            c.strokeText("Left and right arrow keys to move.",50 * percentW, percentW * 3);
            c.strokeText("[Z] to jump.",50 * percentW, percentW * 5.5);
            c.strokeText("[X] to shoot.",50 * percentW, percentW * 8);
            c.strokeText("[C] to switch/pick up weapons.",50 * percentW, percentW * 10.5);
        }
        
        c.save()
        c.translate(3 * percentW, 5 * percentW);
        c.scale(2,2);
        c.textAlign = "right";
        c.font = percentW / 2 + "px Arial";
        if (!player.reloading) {
            if (player.magazine[player.weapon] == 0 && player.ammo[player.weapon] == 0) {
                c.strokeStyle = "rgba(255,0,0,0.3)";
                c.strokeText(player.magazine[player.weapon] + " / " + player.ammo[player.weapon], 5 * percentW, percentW * 4);
                weapons[player.weapons[player.weapon]].draw(0,3 * percentW,1,0,"rgba(255,0,0,0.3)");
            } else {
                c.strokeText(player.magazine[player.weapon] + " / " + player.ammo[player.weapon], 5 * percentW, percentW * 4);
                weapons[player.weapons[player.weapon]].draw(0,3 * percentW,1,0,"rgba(255,0,0,0.8)");
            }
        } else {
            c.strokeStyle = "rgba(255,0,0,0.3)";
            c.strokeText("Reloading... / " + player.ammo[player.weapon], 5 * percentW, percentW * 4);
            weapons[player.weapons[player.weapon]].draw(0,3 * percentW,1,0,"rgba(255,0,0,0.3)");
        }
        c.strokeStyle = "rgba(255,0,0,0.8)";
        if (this.newWeapon > 0) {
            weapons[player.weapons[player.weapon]].draw(0,3 * percentW,1,0,"rgba(255,255,255," + this.newWeapon + ")");
            this.newWeapon -= 0.05;
        }
        c.translate(9 * percentW, 0);
        weapons[player.weapons[1 - player.weapon]].draw(0,3 * percentW,1,0,"rgba(255,0,0,0.3)");
        c.restore();
        if (this.healthbar) {
            c.fillStyle = "rgba(255,0,0,0.3)";
            c.fillRect(percentW,percentW * 45,percentW * 96,percentW * 2);
            c.fillStyle = "rgba(255,0,0,0.8)";
            c.fillRect(percentW,percentW * 45, percentW * 96 * this.health / this.healthMax,percentW * 2);
            for (var i = 0; i < this.damages.length; i++) {
                c.fillStyle = "rgba(255,0,0," + this.damages[i][2] + ")";
                c.fillRect(percentW + (this.damages[i][0] / this.healthMax) * 96 * percentW, percentW * 45, percentW * 96 * (this.damages[i][1] / this.healthMax), percentW * 2);
                this.damages[i][2] -= 0.1;
                if (this.damages[i][2] < 0.1) {
                    this.damages.splice(i,1);
                    i -= 1;
                }
            }
        }
        
    }
}

function gameTick() {
    flicker = 0.05;
    gameArea.clear();
    
    enemiesSpawn.update();
    
    player.controls();
    player.update();
    enemiesUpdate();
    updateParticles();
    updateExplosions();
    dropsUpdate();
    background.draw();
    
    spawnstreetlights();
    drawBullets();
    drawBodyPartParticles();
    
    drawLightSourcesBack();
    player.draw();
    enemiesDraw();
    drawParticles();
    dropsDraw();
    platform.draw();
    lighting.drawDark();
    drawLightSources();
    stats.draw();
}

function gameInit() {
    gameArea.init();
    player = new player();
    platform = new platform(0,40,100,10);
    enemiesSpawn = new enemiesSpawn();
    background = new background();
    
    document.addEventListener("keydown",keyDownFunction);
    document.addEventListener("keyup",keyUpFunction);
}

gameInit();