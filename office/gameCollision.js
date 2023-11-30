function Gravity(object,gravityCustom) {
    var gravity;
    if (gravityCustom) {
        gravity = gravityCustom;
    } else {
        gravity = 0.2;
    }
    var yVelocityNew = object.yVelocity + gravity;
    if (yVelocityNew > object.yVelocityMax) {
        return object.yVelocityMax;
    } else {
        return yVelocityNew;
    }
}

function Collision(rect1, rect2) {
  if (rect1.x <= rect2.x + rect2.width &&
   rect1.x + rect1.width >= rect2.x &&
   rect1.y >= rect2.y - rect2.height &&
   rect1.y - rect1.height <= rect2.y) {
    return true;
  } else {
    return false;
  }
}