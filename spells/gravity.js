function gravity(object,gravityCustom) {
    var gravity;
    if (gravityCustom) {
        gravity = gravityCustom;
    } else {
        gravity = 0.1;
    }
    var yVelocityNew = object.yVelocity + gravity;
    if (yVelocityNew > object.yVelocityMax) {
        return object.yVelocityMax;
    } else {
        return yVelocityNew;
    }
}

function collision(object) {
    for (var i = 0; i < platforms.length; i++) {
        if (object.x < platforms[i].x + platforms[i].width && object.x + object.width > platforms[i].x && object.y < platforms[i].y + platforms[i].height && object.height + object.y > platforms[i].y) {
            return i;
        }
    }
    return -1;
}

function collisionDamage(object) {
    for (var i = 0; i < platforms.length; i++) {
        if (object.x < platforms[i].x + platforms[i].width && object.x + object.width > platforms[i].x && object.y + 1 < platforms[i].y + platforms[i].height && object.height + object.y + 1 > platforms[i].y) {
            return platforms[i].damage;
        }
    }
    return 0;
}

function collisionX(object) {
    for (var i = 0; i < platforms.length; i++) {
        if (object.x - object.width * 0.1 < platforms[i].x + platforms[i].width && object.x + object.width * 1.1 > platforms[i].x && object.y < platforms[i].y + platforms[i].height && object.height + object.y > platforms[i].y && !platforms[i].platform) {
            var vectorX = object.xCenter - platforms[i].xCenter;
            if (vectorX > 0) {
                return -1;
            } else {
                return 1;
            }
        }
    }
    return 0;
}

function collideWith(object1,object2) {
    if (object1.x < object2.x + object2.width && object1.x + object1.width > object2.x && object1.y < object2.y + object2.height && object1.height + object1.y > object2.y) {
        return true;
    } else {
        return false;
    }
}

function collisionDirection(object) {
    if (object.collideLeft || object.collideRight) {
        return true;
    }
    for (var i = 0; i < platforms.length; i++) {
        if (object.x + object.width * object.directionX < platforms[i].x + platforms[i].width && object.x + object.width * 0.5 + object.width * object.directionX > platforms[i].x && object.y + object.height * 0.5 < platforms[i].y + platforms[i].height && object.height * 1.5 + object.y > platforms[i].y) {
            if (platforms[i].damage >= 1) {
                return true;
            } else {
                return false;
            }
        }
    }
    return true;
}

function collisionResolve(object,platformIndex) { 
    var vectorX = object.xCenter - platforms[platformIndex].xCenter, vectorY = object.yCenter - platforms[platformIndex].yCenter;
    if (vectorY * vectorY > vectorX * vectorX) {
        if (vectorY > 0) {
            if (platforms[platformIndex].platform) {
                return [object.x,object.y,object.xVelocity,object.yVelocity,false,false,false];
            } else {
                return [object.x,platforms[platformIndex].y + platforms[platformIndex].height,object.xVelocity,0];
            }
        } else {
            if (platforms[platformIndex].platform && ((object.drop && object.y + object.height + 1 > platforms[platformIndex].y && object.yVelocity >= 0) || object.jumping || object.yVelocity < 0 || object.y + object.height > platforms[platformIndex].y + platforms[platformIndex].height / 4)) {
                return [object.x,object.y,object.xVelocity,object.yVelocity,false,false,false];
            } else {
                return [object.x,platforms[platformIndex].y - object.height,object.xVelocity,0,true];
            }
        }
    } else {
        if (vectorX > 0) {
            if (platforms[platformIndex].platform) {
                return [object.x,object.y,object.xVelocity,object.yVelocity,false,false,false];
            } else {
                return [platforms[platformIndex].x + platforms[platformIndex].width,object.y,0,object.yVelocity,false,false,true];
            }
        } else {
            if (platforms[platformIndex].platform) {
                return [object.x,object.y,object.xVelocity,object.yVelocity,false,false,false];
            } else {
                return [platforms[platformIndex].x - object.width,object.y,0,object.yVelocity,false,true];
            }
        }
    }
}