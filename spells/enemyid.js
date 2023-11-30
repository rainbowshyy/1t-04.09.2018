//idle movement functions
function SimpleIdle(object) {
    var xVel = object.xVelocityMax / 2 * object.directionX;
    if (collisionDirection(object) && object.grounded) {
        xVel *= -1;
    }
    if (object.x > player.x) {
        object.directionX = -1;
    } else {
        object.directionX = 1;
    }
    object.xVelocity = xVel;
}

function lazyAssBitch(object) {
    return;
}

function SimpleIdleJump(object) {
    var xVel = object.xVelocity, yVel = object.yVelocity, reaction = object.reaction;
    if (object.grounded && reaction > object.reactionTime) {
        reaction = 0;
        xVel = object.directionX * object.xVelocityMax;
        yVel = object.jumpHeight;
        object.grounded = false;
    } else if (object.grounded) {
        xVel = 0;
        yVel = 0;
        reaction += 1;
    }
    object.xVelocity = xVel;
    object.yVelocity = yVel;
    object.reaction = reaction;
    object.directionX = 1;
}

//movement functions
function SimpleWalk(object) {
    var xVel = object.xVelocity;
    if (object.xCenter > player.xCenter) {
        xVel -= object.acceleration;
        if (xVel < object.xVelocityMax * -1) {
            xVel = object.xVelocityMax * -1;
        }
    } else {
        xVel += object.acceleration;
        if (xVel > object.xVelocityMax) {
            xVel = object.xVelocityMax;
        }
    }
    var reaction = object.reaction;
    var yVel = object.yVelocity;
    if ((object.collideLeft || object.collideRight) && object.grounded) {
        if (object.reaction >= object.reactionTime) {
            yVel = object.jumpHeight;
            reaction = 0;
        } else {
            reaction += 1;
        }
    }
    
    var drop;
    if (object.y +  object.height < player.y) {
        if (object.reaction >= object.reactionTime * 2) {
            drop = true;
            
            if (reaction >= object.reactionTime + 10) {
                reaction = 0;
            }
        } else {
            reaction += 1;
        }
    } else {
        drop = false;
    }
    object.xVelocity = xVel;
    object.yVelocity = yVel;
    object.drop = drop;
    object.reaction = reaction;
    if (object.x > player.x) {
        object.directionX = -1;
    } else {
        object.directionX = 1;
    }
}

function SimpleJump(object) {
    var xVel = object.xVelocity, yVel = object.yVelocity, reaction = object.reaction, directionButNotReally;
    if (object.x < player.x) {
        directionButNotReally = 1;
    } else {
        directionButNotReally = -1;
    }
    if (object.grounded && reaction > object.reactionTime) {
        reaction = 0;
        xVel = directionButNotReally * object.xVelocityMax;
        yVel = object.jumpHeight;
        object.grounded = false;
    } else if (object.grounded) {
        xVel = 0;
        yVel = 0;
        reaction += 1;
    }
    object.xVelocity = xVel;
    object.yVelocity = yVel;
    object.reaction = reaction;
}

function Simplefly(object) {
    object.speed += object.acceleration;
    if (object.speed > object.xVelocityMax) {
        object.speed = object.xVelocityMax;
    }
    var radians = Math.atan2(player.yCenter - object.yCenter, player.xCenter - object.xCenter);
    object.xVelocity = Math.cos(radians) * object.speed;
    object.yVelocity = Math.sin(radians) * object.speed;
    if (object.x > player.x) {
        object.directionX = -1;
    } else {
        object.directionX = 1;
    }
}

//alert functions
function SimpleAlert(object) {
    if (Math.abs(object.x-player.x) + Math.abs(object.y-player.y) * 4 < 700) {
        if (object.x < player.x && object.directionX == 1) {
            return true;
        } else if (object.x > player.x && object.directionX == -1) {
            return true;
        }
    } else {
    }
    return false;
}

function SimpleSense(object) {
    if (Math.abs(object.x-player.x) + Math.abs(object.y-player.y) < 400) {
        return true;
    } else {
        return false;
    }
}

var enemyId = [
    {
        name: "skeleton",
        health: 3,
        damage: 1,
        idleFunc: SimpleIdle,
        movementFunc: SimpleWalk,
        alertFunc: SimpleAlert,
        coins: [1,2],
        sprite: "sprites/skeleton1.png",
        spriteWidth: 10,
        spriteHeight: 13,
        variatons: 0,
        gravity: 0.1,
        maxSpeed: 0.4,
        acceleration: 0.1,
        maxY: 2,
        width: 12.5,
        height: 14,
        jumpHeight: -4.5,
        flying: false,
        rectionTime: 50,
        animate: function (object) {
            var animationStage = object.animationStage, animationFrame = object.animationFrame, animation = object.animation;
            animationStage += 1;
            if (!object.dead) {
                if (!object.alert) {
                    animation = 0;
                    if (animationStage > 8) {
                        animationFrame += 1;
                        animationStage = 0;
                    }
                } else {
                    animation = 1;
                    if (animationStage > 5) {
                        animationFrame += 1;
                        animationStage = 0;
                    }
                }
                if (animationFrame > 2) {
                    animationFrame = 0;
                }
            } else {
                if (animation != 2) {
                    animation = 2;
                    animationFrame = 0;
                    animationStage = 0;
                }
                if (animationStage > 2) {
                    animationFrame += 1;
                    animationStage = 0;
                }
                if (animationFrame > 2) {
                    object.trueDeath = true;
                    animationFrame = 2;
                }
            }
            object.animationStage = animationStage;
            object.animationFrame = animationFrame;
            object.animation = animation;
        }
    },
    {
        name: "blue slime",
        health: 3,
        damage: 1,
        idleFunc: SimpleIdleJump,
        movementFunc: SimpleJump,
        alertFunc: SimpleSense,
        coins: [1,3],
        sprite: "sprites/slime_blue.png",
        spriteWidth: 10,
        spriteHeight: 10,
        variatons: 0,
        gravity: 0.1,
        maxSpeed: 0.8,
        acceleration: 0.05,
        maxY: 2,
        width: 12.5,
        height: 12.5,
        jumpHeight: -4,
        flying: false,
        rectionTime: 100,
        animate: function (object) {
            var animationStage = object.animationStage, animationFrame = object.animationFrame, animation = object.animation;
            animationStage += 1;
            if (!object.dead) {
                if (object.grounded) {
                    animation = 0;
                    if (animationStage > 20) {
                        animationFrame += 1;
                        animationStage = 0;
                    }
                } else {
                    animation = 1;
                    if (animationStage > 10) {
                        animationFrame += 1;
                    }
                }
                if (animationFrame > 1) {
                    if (animation == 0) {
                        animationFrame = 0;
                    } else {
                        animationFrame = 1;
                    }
                }
            } else {
                if (animation != 2) {
                    animation = 2;
                    animationFrame = 0;
                    animationStage = 0;
                }
                if (animationStage > 1) {
                    animationFrame += 1;
                    animationStage = 0;
                }
                if (animationFrame > 1) {
                    object.trueDeath = true;
                    animationFrame = 2;
                }
            }
            object.animationStage = animationStage;
            object.animationFrame = animationFrame;
            object.animation = animation;
        }
    },
    {
        name: "bat",
        health: 2,
        damage: 1,
        idleFunc: lazyAssBitch,
        movementFunc: Simplefly,
        alertFunc: SimpleSense,
        coins: [1,4],
        sprite: "sprites/bat.png",
        spriteWidth: 16,
        spriteHeight: 8,
        variatons: 0,
        gravity: 0.1,
        maxSpeed: 0.8,
        acceleration: 0.05,
        maxY: 2,
        width: 14,
        height: 14,
        jumpHeight: -4,
        flying: true,
        rectionTime: 100,
        animate: function (object) {
            var animationStage = object.animationStage, animationFrame = object.animationFrame, animation = object.animation;
            animationStage += 1;
            if (!object.dead) {
                if (animationStage > 20) {
                    animationFrame = 0;
                    animationStage = 0;
                } else if (animationStage > 15) {
                    animationFrame = 2;
                } else if (animationStage > 10) {
                    animationFrame = 0;
                } else if (animationStage > 5) {
                    animationFrame = 1;
                } else {
                    animationFrame = 0;
                }
            } else {
                object.trueDeath = true;
            }
            object.animationStage = animationStage;
            object.animationFrame = animationFrame;
            object.animation = animation;
        }
    }
]