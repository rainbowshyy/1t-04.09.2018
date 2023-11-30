var player = {
  x : 16,
  y : 212,
  width : 16,
  height : 46,
  xCenter : this.x + this.width / 2,
  xVelocity : 0,
  yVelocity : 0,
  yVelocityMax : 6,
  
  lastGrounded : 0,
  doubleJumpBoost : 0,
  
  dash : 0,
  dashPause : 0,
  dashAir : 1,
  
  xFacing : "right",
  animation : 1,
  frame : 0,
  frameDuration : 0,
  
  newJump : true,
  newDash : true,
  doubleJump : true,
  
  health : 5,
  invulnerable : 0,
  
  atlas : [
    [
      {
        x : 0,
        y : 0,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 20
      },
      {
        x : 48,
        y : 0,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 20
      },
      {
        x : 96,
        y : 0,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 20
      },
      {
        x : 144,
        y : 0,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 20
      }
    ],
    [
      {
        x : 0,
        y : 48,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 20
      },
      {
        x : 48,
        y : 48,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 20
      },
      {
        x : 96,
        y : 48,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 20
      },
      {
        x : 144,
        y : 48,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 20
      }
    ],
    [
      {
        x : 0,
        y : 96,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 48,
        y : 96,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 96,
        y : 96,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 144,
        y : 96,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 192,
        y : 96,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 240,
        y : 96,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      }
    ],
    [
      {
        x : 0,
        y : 144,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 48,
        y : 144,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 96,
        y : 144,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 144,
        y : 144,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 192,
        y : 144,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 240,
        y : 144,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      }
    ],
    [
      {
        x : 0,
        y : 192,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 2
      },
      {
        x : 48,
        y : 192,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 2
      }
    ],
    [
      {
        x : 0,
        y : 240,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 2
      },
      {
        x : 48,
        y : 240,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 2
      }
    ],
    [
      {
        x : 0,
        y : 288,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : -30,
        duration : 2
      },
      {
        x : 48,
        y : 288,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : -30,
        duration : 2
      },
      {
        x : 96,
        y : 288,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : -30,
        duration : 2
      },
      {
        x : 144,
        y : 288,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : -30,
        duration : 2
      },
      {
        x : 192,
        y : 288,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : -30,
        duration : Infinity,
      }
    ],
    [
      {
        x : 0,
        y : 336,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : -30,
        duration : 2
      },
      {
        x : 48,
        y : 336,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : -30,
        duration : 2
      },
      {
        x : 96,
        y : 336,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : -30,
        duration : 2
      },
      {
        x : 144,
        y : 336,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : -30,
        duration : 2
      },
      {
        x : 192,
        y : 336,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : -30,
        duration : Infinity,
      }
    ],
    [
      {
        x : 0,
        y : 384,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 48,
        y : 384,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 6
      },
      {
        x : 96,
        y : 384,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 5
      },
      {
        x : 144,
        y : 384,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 3
      },
      {
        x : 192,
        y : 384,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 3,
      },
      {
        x : 240,
        y : 384,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : Infinity,
      }
    ],
    [
      {
        x : 0,
        y : 432,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 4
      },
      {
        x : 48,
        y : 432,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 6
      },
      {
        x : 96,
        y : 432,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 5
      },
      {
        x : 144,
        y : 432,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 3
      },
      {
        x : 192,
        y : 432,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : 3,
      },
      {
        x : 240,
        y : 432,
        width : 48,
        height : 48,
        xOffset : -16,
        yOffset : 0,
        duration : Infinity,
      }
    ]
  ],
  
  Init : function () {
    this.sprite = new Image();
    this.sprite.src = "sprites/atlas.png";
  },
  
  AnimationSet : function (animation) {
    if (this.animation != animation) {
      this.frameDuration = 0;
      this.frame = 0;
    }
    this.animation = animation;
  },
  
  Damage : function (number, angle) {
    if (this.invulnerable == 0 && this.dash == 0) {
      this.health -= number;
      game.Damage();
      this.invulnerable = 80;
      this.yVelocity = Math.sin(angle) * -5;
      this.xVelocity = Math.cos(angle) * 5;
    }
  },
  
  Update : function () {
    this.x += this.xVelocity;
    this.xVelocity *= 0.95;
    if (Math.abs(this.xVelocity) < 0.5) {
      this.xVelocity = 0;
    }
    if (this.invulnerable != 0) {
      this.invulnerable -= 1;
    }
    this.xCenter = this.x + this.width / 2;
    if (this.height != 46) {
      this.height = 46;
    }
    
    if (this.dash) {
      if (this.dashX == 1) {
        this.AnimationSet(8);
      } else {
        this.AnimationSet(9);
      }
    } else if ((this.y < 212) && !this.dash) {
      if (this.xFacing == "right") {
        this.AnimationSet(4);
      } else {
        this.AnimationSet(5);
      }
    } else if (keyDown && !this.dash) {
      this.height = 16;
      this.y += 30;
      if (this.animation != 7 && this.xFacing == "right") {
        this.AnimationSet(6);
      } else if (this.animation != 6) {
        this.AnimationSet(7);
      }
    } else if ((keyRight && !keyLeft) || (!keyRight && keyLeft)) {
      if (this.xFacing == "right") {
        this.AnimationSet(2);
      } else {
        this.AnimationSet(3);
      }
    } else {
      if (this.xFacing == "right") {
        this.AnimationSet(0);
      } else {
        this.AnimationSet(1);
      }
    }
    
    if (!this.dash) {
      if (keyRight && !keyLeft && !keyDown && this.x < game.level.size * 480 - 16) {
        this.x += 2;
      } else if (keyLeft && !keyRight && !keyDown && this.x > 0) {
        this.x -= 2;
      }
      if (player.x - (cursor.x - camera.x) < 0) {
        this.xFacing = "right";
      } else {
        this.xFacing = "left";
      }
    }
    
    this.y += this.yVelocity;
    if ((this.y == 212 || this.lastGrounded < 16) && keyUp && this.newJump) {
      this.yVelocity = -4;
      this.lastGrounded += 1;
      this.doubleJump = false;
    } else if (this.y < 212) { //ADD COLLISION
      this.yVelocity = Gravity(this, 0.4);
      this.lastGrounded = 30;
      this.newJump = false;
      if (!keyUp && this.doubleJumpBoost == 0) {
        this.doubleJump = true;
      } else if (this.doubleJump && this.doubleJumpBoost < 30 && keyUp) {
        this.doubleJumpBoost += 1;
        this.yVelocity += -2;
        if (this.yVelocity < -3) {
          this.yVelocity = -3
        }
      } else if (!keyUp) {
        this.doubleJumpBoost = 30;
        this.doubleJump = false;
      }
      if (this.y < this.height) {
        this.y = this.height;
        this.yVelocity = 0;
      }
    } else {
      this.doubleJumpBoost = 0;
      this.yVelocity = 0;
      this.y = 212;
      this.lastGrounded = 0;
      this.dashAir = 1;
      this.doubleJump = false;
    }
    
    if (this.y == 212 && !keyUp) {
      this.newJump = true;
    }
    
    if (!this.dash && keyShift && !this.dashPause && this.dashAir && this.newDash) {
      if (keyLeft) {
        this.dashX = -1;
        this.dash = 1;
        this.dashAir = 0;
        this.newDash = false;
      } else if (keyRight) {
        this.dashX = 1;
        this.dash = 1;
        this.dashAir = 0;
        this.newDash = false;
      }
    } else if (!this.dash && !keyShift && !this.dashPause && this.dashAir) {
      this.newDash = true;
    }
    
    if (this.dash) {
      this.dash += 1;
      this.yVelocity = 0;
      if (this.dash < 4 || this.dash > 26) {
        var speed = 1 * this.dashX;
      } else {
        var speed = 5 * this.dashX;
      }
      this.x += speed;
      if (this.dash > 32) {
        this.dash = 0;
        this.dashPause = 10;
      }
    }
    
    if (this.dashPause) {
      this.dashPause -= 1;
    }
    
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > game.level.size * 480 - 16) {
      this.x = game.level.size * 480 - 15;
    }
    
  },
  
  Render : function () {
    
    c = layer1.context;
    
    c.save();
    c.translate(camera.x, 0);
    
    if (this.invulnerable) {
      if (this.invulnerable % 40 < 20) {
        c.filter = "brightness(50%)";
      } else {
        c.filter = "brightness(150%)";
      }
    }
    
    c.drawImage(this.sprite,
                this.atlas[this.animation][this.frame].x,
                this.atlas[this.animation][this.frame].y,
                this.atlas[this.animation][this.frame].width,
                this.atlas[this.animation][this.frame].height,
                Math.round(this.x) + this.atlas[this.animation][this.frame].xOffset,
                Math.round(this.y) + this.atlas[this.animation][this.frame].yOffset - 2 - this.height,
                this.atlas[this.animation][this.frame].width,
                this.atlas[this.animation][this.frame].height
               );
    this.frameDuration += 1;
    if (this.frameDuration > this.atlas[this.animation][this.frame].duration) {
      this.frameDuration = 0;
      this.frame += 1;
      if (this.frame == this.atlas[this.animation].length) {
        this.frame = 0;
      }
    }
    c.restore();
  },
  Hitbox : function () {
    c = layer1.context;
    c.save();
    c.translate(camera.x, 0);
    c.strokeStyle = "rgb(0,255,0)";
    c.strokeRect(this.x,this.y - this.height,this.width,this.height);
    c.restore();
  }
}