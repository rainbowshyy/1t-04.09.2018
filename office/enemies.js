game.LoadEnemySprites = function() {
  for (var i = 0; i < Enemies.length; i++) {
    Enemies[i].sprite = new Image();
    Enemies[i].sprite.src = Enemies[i].src;
  }
}

var Enemy = function(x,y,id) {
  this.x = x;
  this.y = y;
  this.id = id;
  this.width = Enemies[this.id].width;
  this.height = Enemies[this.id].height;
  this.xCenter = this.x + this.width / 2;
  this.hp = Enemies[this.id].hp;
  this.state = 0;
  this.next = false;
  this.number = Math.random();
  this.xVelocity = 0;
  this.yVelocity = 0;
  this.yVelocityMax = 5;
  this.invulnerable = false;
  this.hurt = true;
  
  this.animation = 0;
  this.frame = 0;
  this.frameDuration = 0;
  this.xFacing = Math.round(Math.random()) * 2 - 1;
  this.dead = false;
  this.lastHit = 0;
  
  this.wasHit = false;
  
  this.AnimationSet = function(animation) {
    if (this.animation != animation) {
      this.frameDuration = 0;
      this.frame = 0;
    }
    this.animation = animation;
  }
  
  this.Update = function() {
    this.xCenter = this.x + this.width / 2;
    Enemies[this.id].Update(this);
    if (this.hurt && Collision(this, player)) {
      if (this.xCenter > player.xCenter) {
        player.Damage(1, Math.PI * 0.7);
      } else {
        player.Damage(1, Math.PI * 0.3);
      }
    }
  };
  this.Render = function(){Enemies[this.id].Render(this)};
  this.Hitbox = function(){Enemies[this.id].Hitbox(this)};
}

var Enemies = [
  {
    name : "employee",
    
    width : 16,
    height : 48,
    hp : 5,
    
    src : "sprites/employee.png",
    animation : [
      {
        loop : true,
        frames : [
          {
            x : 0,
            y : 0,
            width : 23,
            height : 48,
            xOffset : -4,
            yOffset : 0,
            duration : 20
          }
        ]
      },
      {
        loop : false,
        frames : [
          {
            x : 23,
            y : 0,
            width : 23,
            height : 48,
            xOffset : -4,
            yOffset : 0,
            duration : 40
          }
        ]
      },
      {
        loop : true,
        frames : [
          {
            x : 46,
            y : 0,
            width : 31,
            height : 47,
            xOffset : -6,
            yOffset : -1,
            duration : 6
          },
          {
            x : 77,
            y : 0,
            width : 32,
            height : 48,
            xOffset : -7,
            yOffset : 0,
            duration : 6
          },
          {
            x : 109,
            y : 0,
            width : 31,
            height : 47,
            xOffset : -6,
            yOffset : -1,
            duration : 6
          },
          {
            x : 140,
            y : 0,
            width : 26,
            height : 47,
            xOffset : -5,
            yOffset : -1,
            duration : 6
          },
          {
            x : 166,
            y : 0,
            width : 28,
            height : 48,
            xOffset : -6,
            yOffset : 0,
            duration : 6
          },
          {
            x : 194,
            y : 0,
            width : 26,
            height : 47,
            xOffset : -5,
            yOffset : -1,
            duration : 6
          },
        ]
      },
      {
        loop : false,
        frames : [
          {
            x : 220,
            y : 0,
            width : 28,
            height : 48,
            xOffset : -6,
            yOffset : -1,
            duration : 3
          },
          {
            x : 248,
            y : 0,
            width : 23,
            height : 52,
            xOffset : -4,
            yOffset : -5,
            duration : 3
          },
          {
            x : 271,
            y : 0,
            width : 23,
            height : 52,
            xOffset : -4,
            yOffset : -5,
            duration : 3
          },
          {
            x : 294,
            y : 0,
            width : 23,
            height : 52,
            xOffset : -4,
            yOffset : -5,
            duration : 3
          },
          {
            x : 317,
            y : 0,
            width : 23,
            height : 52,
            xOffset : -4,
            yOffset : -5,
            duration : 3
          },
          {
            x : 340,
            y : 0,
            width : 23,
            height : 52,
            xOffset : -4,
            yOffset : -5,
            duration : 3
          },
          {
            x : 363,
            y : 0,
            width : 23,
            height : 52,
            xOffset : -4,
            yOffset : -5,
            duration : 3
          },
          {
            x : 386,
            y : 0,
            width : 23,
            height : 52,
            xOffset : -4,
            yOffset : -5,
            duration : 9
          },
        ]
      },
      {
        loop : false,
        frames : [
          {
            x : 409,
            y : 0,
            width : 44,
            height : 52,
            xOffset : -25,
            yOffset : -5,
            duration : 1
          },
          {
            x : 453,
            y : 0,
            width : 37,
            height : 48,
            xOffset : -18,
            yOffset : -1,
            duration : 4
          },
          {
            x : 490,
            y : 0,
            width : 37,
            height : 48,
            xOffset : -18,
            yOffset : -1,
            duration : 4
          },
        ]
      },
      {
        loop : true,
        frames : [
          {
            x : 527,
            y : 0,
            width : 30,
            height : 31,
            xOffset : -7,
            yOffset : 16,
            duration : 4
          },
        ]
      }
    ],
    Update : function(enemy) {
      enemy.x += enemy.xVelocity;
      enemy.y += enemy.yVelocity;
      if (enemy.y >= 212) {
        enemy.y = 212;
        enemy.yVelocity = 0;
        enemy.xVelocity *= 0.7;
      } else {
        enemy.yVelocity = Gravity(enemy);
      }
      if (Math.abs(enemy.xVelocity) < 0.1) {
        enemy.xVelocity = 0;
      }
      
      if (enemy.state == 0) {
        enemy.AnimationSet(0);
        if (Math.abs(enemy.xCenter - player.xCenter) < 100  || (Math.abs(enemy.xCenter - player.xCenter) < 200 && (enemy.xCenter - player.xCenter) * enemy.xFacing < 0)|| enemy.wasHit) {
          enemy.state = 1;
          enemy.wasHit = false;
          enemy.AnimationSet(1);
        }
      } else if (enemy.state == 1) {
        enemy.AnimationSet(1);
        if (enemy.xCenter - player.xCenter > 0) {
          enemy.xFacing = -1;
        } else {
          enemy.xFacing = 1;
        }
        if (enemy.next) {
          enemy.state = 2;
          enemy.AnimationSet(2);
        }
      } else if (enemy.state == 2) {
        enemy.AnimationSet(2);
        if (enemy.xCenter - player.xCenter > 0) {
          enemy.xFacing = -1;
        } else {
          enemy.xFacing = 1;
        }
        enemy.x += enemy.xFacing;
        
        for (var i = 0; i < game.enemies.current.length; i++) {
          if (Collision(enemy,game.enemies.current[i]) && enemy != game.enemies.current[i]) {
            if (enemy.xCenter > game.enemies.current[i].xCenter) {
              enemy.x += game.enemies.current[i].x + game.enemies.current[i].width - enemy.x + 1;
            } else {
              enemy.x += game.enemies.current[i].x - enemy.x - enemy.width - 1;
            }
          }
        }
        
        if (Math.abs(enemy.xCenter - player.xCenter) < 30) {
          enemy.state = 3;
        }
      } else if (enemy.state == 3) {
        enemy.AnimationSet(3);
        if (enemy.next) {
          enemy.state = 4;
          enemy.AnimationSet(4);
          game.weapon.bullets.push(new Bullet(
            enemy.xCenter + enemy.xFacing * 18 - 11,
            enemy.y - 30,
            24,
            24,
            Math.PI / 2 - enemy.xFacing * Math.PI / 2,
            0,
            3,
            true,
            false,
            0,
            false,
            false
          ));
        }
      } else if (enemy.state == 4) {
        enemy.AnimationSet(4);
        if (enemy.next) {
          enemy.state = 2;
          enemy.AnimationSet(2);
        }
      } else if (enemy.state == 5) {
        enemy.hurt = false;
        enemy.AnimationSet(5);
        enemy.invulnerable = true;
        if (enemy.y >= 212) {
          enemy.dead = true;
          for (var ix = 0; ix < 100; ix++) {
            game.particles.current.push(new game.BloodParticle(enemy.xCenter, enemy.y - 12, Math.random() * -Math.PI, Math.random() * 3 + 2));
          }
        }
      }
      if (enemy.hp <= 0 && enemy.state != 5) {
        enemy.state = 5;
        enemy.AnimationSet(5);
        if (enemy.xCenter - player.xCenter > 0) {
          enemy.xFacing = -1;
        } else {
          enemy.xFacing = 1;
        }
        enemy.xVelocity = -enemy.xFacing;
        enemy.yVelocity = -3;
      }
      
      enemy.next = false;
    },
    Render : function(enemy) {
      c = layer1.context;

      c.save();
      c.translate(camera.x + (enemy.xFacing + 1) * enemy.width / 2, 0);
      
      c.scale(enemy.xFacing * -1,1);
      
      c.filter = "brightness(" + (100 + enemy.lastHit) + "%)";
      if (enemy.lastHit > 0) {
        enemy.lastHit -= 10;
      }
      
      c.drawImage(Enemies[enemy.id].sprite,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].x,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].y,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].width,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].height,
                  enemy.x * -enemy.xFacing + Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].xOffset,
                  Math.round(enemy.y) + Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].yOffset - enemy.height,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].width,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].height
                 );
      enemy.frameDuration += 1;
      if (enemy.frameDuration > Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].duration) {
        enemy.frameDuration = 0;
        enemy.frame += 1;
        if (enemy.frame == Enemies[enemy.id].animation[enemy.animation].frames.length) {
          enemy.frame = 0;
          if (!Enemies[enemy.id].animation[enemy.animation].loop) {
            enemy.next = true;
          }
        }
      }
      c.restore();
    },
    Hitbox : function (enemy) {
      c = layer1.context;
      c.save();
      c.translate(camera.x, 0);
      c.strokeStyle = "rgb(255,0,0)";
      c.strokeRect(enemy.x,enemy.y - enemy.height,enemy.width,enemy.height);
      c.beginPath();
      c.moveTo(enemy.xCenter,0);
      c.lineTo(enemy.xCenter,300);
      c.stroke();
      c.restore();
    }
  },
  {
    name : "thrower",
    
    width : 16,
    height : 51,
    hp : 5,
    
    src : "sprites/thrower.png",
    animation : [
      {
        loop : true,
        frames : [
          {
            x : 0,
            y : 0,
            width : 23,
            height : 51,
            xOffset : -4,
            yOffset : 0,
            duration : 20
          }
        ]
      },
      {
        loop : false,
        frames : [
          {
            x : 23,
            y : 0,
            width : 23,
            height : 51,
            xOffset : -4,
            yOffset : 0,
            duration : 40
          }
        ]
      },
      {
        loop : true,
        frames : [
          {
            x : 46,
            y : 0,
            width : 31,
            height : 50,
            xOffset : -6,
            yOffset : -1,
            duration : 6
          },
          {
            x : 77,
            y : 0,
            width : 32,
            height : 51,
            xOffset : -7,
            yOffset : 0,
            duration : 6
          },
          {
            x : 109,
            y : 0,
            width : 31,
            height : 50,
            xOffset : -6,
            yOffset : -1,
            duration : 6
          },
          {
            x : 140,
            y : 0,
            width : 26,
            height : 50,
            xOffset : -5,
            yOffset : -1,
            duration : 6
          },
          {
            x : 166,
            y : 0,
            width : 28,
            height : 51,
            xOffset : -6,
            yOffset : 0,
            duration : 6
          },
          {
            x : 194,
            y : 0,
            width : 26,
            height : 50,
            xOffset : -5,
            yOffset : -1,
            duration : 6
          },
        ]
      },
      {
        loop : false,
        frames : [
          {
            x : 220,
            y : 0,
            width : 25,
            height : 51,
            xOffset : -5,
            yOffset : -1,
            duration : 3
          },
          {
            x : 245,
            y : 0,
            width : 25,
            height : 51,
            xOffset : -5,
            yOffset : -1,
            duration : 3
          },
          {
            x : 270,
            y : 0,
            width : 25,
            height : 51,
            xOffset : -5,
            yOffset : -1,
            duration : 3
          },
          {
            x : 295,
            y : 0,
            width : 25,
            height : 51,
            xOffset : -5,
            yOffset : -1,
            duration : 3
          },
          {
            x : 320,
            y : 0,
            width : 24,
            height : 54,
            xOffset : -5,
            yOffset : -4,
            duration : 3
          },
          {
            x : 344,
            y : 0,
            width : 24,
            height : 54,
            xOffset : -5,
            yOffset : -4,
            duration : 3
          },
          {
            x : 368,
            y : 0,
            width : 24,
            height : 54,
            xOffset : -5,
            yOffset : -4,
            duration : 9
          },
        ]
      },
      {
        loop : false,
        frames : [
          {
            x : 392,
            y : 0,
            width : 37,
            height : 53,
            xOffset : -18,
            yOffset : -3,
            duration : 1
          },
          {
            x : 429,
            y : 0,
            width : 37,
            height : 51,
            xOffset : -18,
            yOffset : -1,
            duration : 8
          },
        ]
      },
      {
        loop : true,
        frames : [
          {
            x : 466,
            y : 0,
            width : 30,
            height : 34,
            xOffset : -7,
            yOffset : 13,
            duration : 4
          },
        ]
      }
    ],
    Update : function(enemy) {
      enemy.x += enemy.xVelocity;
      enemy.y += enemy.yVelocity;
      if (enemy.y >= 212) {
        enemy.y = 212;
        enemy.yVelocity = 0;
        enemy.xVelocity *= 0.7;
      } else {
        enemy.yVelocity = Gravity(enemy);
      }
      if (Math.abs(enemy.xVelocity) < 0.1) {
        enemy.xVelocity = 0;
      }
      
      if (enemy.state == 0) {
        enemy.cooldown = 0;
        enemy.AnimationSet(0);
        if (Math.abs(enemy.xCenter - player.xCenter) < 200  || (Math.abs(enemy.xCenter - player.xCenter) < 300 && (enemy.xCenter - player.xCenter) * enemy.xFacing < 0)|| enemy.wasHit) {
          enemy.state = 1;
          enemy.wasHit = false;
          enemy.AnimationSet(1);
        }
      } else if (enemy.state == 1) {
        enemy.AnimationSet(1);
        if (enemy.xCenter - player.xCenter > 0) {
          enemy.xFacing = -1;
        } else {
          enemy.xFacing = 1;
        }
        if (enemy.next) {
          enemy.state = 2;
          enemy.AnimationSet(2);
        }
      } else if (enemy.state == 2) {
        if (enemy.cooldown > 0) {
          enemy.cooldown -= 1;
        }
        enemy.AnimationSet(2);
        if (enemy.xCenter - player.xCenter > 0) {
          enemy.xFacing = -1;
        } else {
          enemy.xFacing = 1;
        }
        enemy.x += enemy.xFacing;
        
        for (var i = 0; i < game.enemies.current.length; i++) {
          if (Collision(enemy,game.enemies.current[i]) && enemy != game.enemies.current[i]) {
            if (enemy.xCenter > game.enemies.current[i].xCenter) {
              enemy.x += game.enemies.current[i].x + game.enemies.current[i].width - enemy.x + 1;
            } else {
              enemy.x += game.enemies.current[i].x - enemy.x - enemy.width - 1;
            }
          }
        }
        
        if (Math.abs(enemy.xCenter - player.xCenter) < 180 && enemy.cooldown < 1) {
          enemy.state = 3;
        }
      } else if (enemy.state == 3) {
        enemy.AnimationSet(3);
        if (enemy.next) {
          enemy.state = 4;
          enemy.AnimationSet(4);
          game.weapon.bullets.push(new Bullet(
            enemy.xCenter + enemy.xFacing * 18 - 11,
            enemy.y - 30,
            9,
            9,
            Math.PI / 2 - enemy.xFacing * Math.PI / 2,
            2.5,
            200,
            false,
            false,
            0,
            "thrower",
            false
          ));
        }
      } else if (enemy.state == 4) {
        enemy.cooldown = 120;
        enemy.AnimationSet(4);
        if (enemy.next) {
          enemy.state = 2;
          enemy.AnimationSet(2);
        }
      } else if (enemy.state == 5) {
        enemy.hurt = false;
        enemy.AnimationSet(5);
        enemy.invulnerable = true;
        if (enemy.y >= 212) {
          enemy.dead = true;
          for (var ix = 0; ix < 100; ix++) {
            game.particles.current.push(new game.BloodParticle(enemy.xCenter, enemy.y - 12, Math.random() * -Math.PI, Math.random() * 3 + 2));
          }
        }
      }
      if (enemy.hp <= 0 && enemy.state != 5) {
        enemy.state = 5;
        enemy.AnimationSet(5);
        if (enemy.xCenter - player.xCenter > 0) {
          enemy.xFacing = -1;
        } else {
          enemy.xFacing = 1;
        }
        enemy.xVelocity = -enemy.xFacing;
        enemy.yVelocity = -3;
      }
      
      enemy.next = false;
    },
    Render : function(enemy) {
      c = layer1.context;

      c.save();
      c.translate(camera.x + (enemy.xFacing + 1) * enemy.width / 2, 0);
      
      c.scale(enemy.xFacing * -1,1);
      
      c.filter = "brightness(" + (100 + enemy.lastHit) + "%)";
      if (enemy.lastHit > 0) {
        enemy.lastHit -= 10;
      }
      
      c.drawImage(Enemies[enemy.id].sprite,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].x,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].y,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].width,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].height,
                  enemy.x * -enemy.xFacing + Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].xOffset,
                  Math.round(enemy.y) + Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].yOffset - enemy.height,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].width,
                  Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].height
                 );
      enemy.frameDuration += 1;
      if (enemy.frameDuration > Enemies[enemy.id].animation[enemy.animation].frames[enemy.frame].duration) {
        enemy.frameDuration = 0;
        enemy.frame += 1;
        if (enemy.frame == Enemies[enemy.id].animation[enemy.animation].frames.length) {
          enemy.frame = 0;
          if (!Enemies[enemy.id].animation[enemy.animation].loop) {
            enemy.next = true;
          }
        }
      }
      c.restore();
    },
    Hitbox : function(enemy) {
      c = layer1.context;
      c.save();
      c.translate(camera.x, 0);
      c.strokeStyle = "rgb(255,0,0)";
      c.strokeRect(enemy.x,enemy.y - enemy.height,enemy.width,enemy.height);
      c.beginPath();
      c.moveTo(enemy.xCenter,0);
      c.lineTo(enemy.xCenter,300);
      c.stroke();
      c.restore();
    }
  }
]