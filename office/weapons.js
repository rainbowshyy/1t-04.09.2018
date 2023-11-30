game.weapon = {
  x : 0,
  y : 0,
  angle : 0,
  id : "keyboard",
  frame : 0,
  frameDuration : 0,
  animation : 0,
  cooldown : 0,
  
  weapons : {
    keyboard : {
      melee : {
        hurt : {
          rad : 0,
          width : 14,
          height : 14,
          reach : 22,
          push : 2,
        },
        dmg : 1,
        cooldown : 10
      },
      ranged : false,
    }
  },
  
  atlas : {
    keyboard : [
      [
        {
          x : 0,
          y : 0,
          width : 43,
          height : 11,
          xOrigo : 0,
          yOrigo : 5,
          duration : 1,
          hurt : false
        }
      ],
      [
        {
          x : 0,
          y : 12,
          width : 48,
          height : 11,
          xOrigo : 0,
          yOrigo : 5,
          duration : 1,
          hurt : true
        },
        {
          x : 0,
          y : 24,
          width : 46,
          height : 11,
          xOrigo : 0,
          yOrigo : 5,
          duration : 1,
          hurt : false
        },
        {
          x : 0,
          y : 36,
          width : 37,
          height : 11,
          xOrigo : 0,
          yOrigo : 5,
          duration : 2,
          hurt : false
        },
      ],
    ]
  },
  
  bulletAtlas : {
    thrower : [
      {
        x : 0,
        y : 0,
        width : 10,
        height : 3,
        rotate : 3,
        duration : 2,
        xOffset : 0,
        yOffset : -6
      }
    ]
  },
  
  Init : function() {
    this.sprite = new Image();
    this.sprite.src = "sprites/weaponAtlas.png";
    this.bulletSprite = new Image();
    this.bulletSprite.src = "sprites/bulletAtlas.png";
  },
  
  AnimationSet : function(animation) {
    if (this.animation != animation) {
      this.frameDuration = 0;
      this.frame = 0;
    }
    this.animation = animation;
  },
  
  Click : function() {
    if (player.height == 46) {
      if (this.cooldown == 0) {
        this.AnimationSet(1);
      }
    }
  },
  
  Update : function() {
    if (this.atlas[this.id][this.animation][this.frame].hurt && this.frameDuration == 0) {
      this.bullets.push(new Bullet(
        Math.round(game.weapon.x + Math.cos(Math.atan2(this.y - cursor.y, this.x + camera.x - cursor.x) - Math.PI) * this.weapons[this.id].melee.hurt.rad - this.weapons[this.id].melee.hurt.width / 2),
        Math.round(game.weapon.y + Math.sin(Math.atan2(this.y - cursor.y, this.x + camera.x - cursor.x) - Math.PI) * this.weapons[this.id].melee.hurt.rad + this.weapons[this.id].melee.hurt.height / 2),
        this.weapons[this.id].melee.hurt.width,
        this.weapons[this.id].melee.hurt.height,
        Math.atan2(this.y - cursor.y, this.x + camera.x - cursor.x) - Math.PI,
        this.weapons[this.id].melee.hurt.reach,
        2,
        true,
        true,
        this.weapons[this.id].melee.hurt.push,
        false,
        true
      ));
    }
    
    for (var i = 0; i < game.weapon.bullets.length; i++) {
      game.weapon.bullets[i].Update();
      if (game.weapon.bullets[i].life <= 0) {
        game.weapon.bullets.splice(i,1);
        i -= 1;
      }
    }
  },
  
  Render : function() {
    this.x = player.xCenter - this.atlas[this.id][this.animation][this.frame].xOrigo;
    this.y = player.y - player.height * 0.6;
    
    c = layer1.context;
    
    c.save();
    c.translate(camera.x + this.x, this.y);
    if (player.height == 46) {
      c.rotate(Math.atan2(this.y - cursor.y, this.x + camera.x - cursor.x) - Math.PI);
      if (
        Math.atan2(this.y - cursor.y, this.x + camera.x - cursor.x) - Math.PI < Math.PI / -2
        &&  Math.atan2(this.y - cursor.y, this.x + camera.x - cursor.x) - Math.PI > Math.PI / -2 - Math.PI
         ) {
        c.scale(1,-1);
      } 
    }
    c.drawImage(this.sprite,
                this.atlas[this.id][this.animation][this.frame].x,
                this.atlas[this.id][this.animation][this.frame].y,
                this.atlas[this.id][this.animation][this.frame].width,
                this.atlas[this.id][this.animation][this.frame].height,
                2,
                -this.atlas[this.id][this.animation][this.frame].yOrigo,
                this.atlas[this.id][this.animation][this.frame].width,
                this.atlas[this.id][this.animation][this.frame].height
               );
    c.restore();
    this.frameDuration += 1;
    
    if (this.cooldown != 0) {
      this.cooldown -= 1;
    }
    
    if (this.frameDuration > this.atlas[this.id][this.animation][this.frame].duration && this.animation != 0) {
      this.frameDuration = 0;
      this.frame += 1;
      if (this.frame == this.atlas[this.id][this.animation].length) {
        this.animation = 0;
        this.cooldown = this.weapons[this.id].melee.cooldown;
        this.frame = 0;
      }
    }
    for (var i = 0; i < game.weapon.bullets.length; i++) {
      game.weapon.bullets[i].Render();
    }
  },
  
  Hitbox : function() {
    for (var i = 0; i < game.weapon.bullets.length; i++) {
      game.weapon.bullets[i].Hitbox();
    }
  },
  
  bullets : [],
}

function Bullet(x,y,width,height,angle,speed,life,pierce,fromPlayer,push,sprite,eat) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.angle = angle;
  this.speed = speed;
  this.life = life;
  this.pierce = pierce;
  this.hit = [];
  this.player = fromPlayer;
  this.push = push;
  this.sprite = sprite;
  this.rotation = 0;
  this.animation = 0;
  this.frame = 0;
  this.frameDuration = 0;
  this.eat = eat;
  
  this.Update = function() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.life -= 1;
    if (this.player) {
      for (var i = 0; i < game.enemies.current.length; i++) {
        if (Collision(this, game.enemies.current[i])) {
          var hit = false;
          for (var ix = 0; ix < this.hit.length; ix++) {
            if (this.hit[ix] == game.enemies.current[i].number) {
              hit = true;
            }
          }
          if (!hit && !game.enemies.current[i].invulnerable) {
            game.enemies.current[i].hp -= 1;
            game.enemies.current[i].lastHit = 80;
            game.enemies.current[i].xVelocity = Math.cos(this.angle) * this.push;
            game.enemies.current[i].yVelocity = Math.sin(this.angle) * this.push;
            this.hit.push(game.enemies.current[i].number);
            if (!this.pierce) {
              this.life = 0;
            }
            for (var ix = 0; ix < 40; ix++) {
              game.particles.current.push(new game.BloodParticle(this.x, this.y, Math.random() * Math.PI * 2, Math.random() * 3 + 1));
            }
          }
        }
      }
      if (this.eat) {
        for (var i = 0; i < game.weapon.bullets.length; i++) {
          if (Collision(this, game.weapon.bullets[i]) && this != game.weapon.bullets[i]) {
            game.weapon.bullets[i].life = 0;
          }
        }
      }
    } else {
      if (Collision(this, player)) {
        if (!this.pierce && player.dash == 0 && player.invulnerable == 0) {
          this.life = 0;
        }
        if (this.angle > Math.PI / 2 && this.angle < 3 * Math.PI / 2) {
          player.Damage(1, Math.PI * 0.7);
        } else {
          player.Damage(1, Math.PI * 0.3);
        }
      }
    }
  }
  
  this.Render = function() {
    if (this.sprite) {
      c = layer1.context;

      c.save();
      c.translate(camera.x + this.x + game.weapon.bulletAtlas[this.sprite][this.frame].width / 2 + game.weapon.bulletAtlas[this.sprite][this.frame].xOffset, this.y + game.weapon.bulletAtlas[this.sprite][this.frame].height / 2 + game.weapon.bulletAtlas[this.sprite][this.frame].yOffset);
      
      c.rotate(this.rotation);
      
      c.drawImage(game.weapon.bulletSprite,
                  game.weapon.bulletAtlas[this.sprite][this.frame].x,
                  game.weapon.bulletAtlas[this.sprite][this.frame].y,
                  game.weapon.bulletAtlas[this.sprite][this.frame].width,
                  game.weapon.bulletAtlas[this.sprite][this.frame].height,
                  -game.weapon.bulletAtlas[this.sprite][this.frame].width / 2,
                  -game.weapon.bulletAtlas[this.sprite][this.frame].height / 2,
                  game.weapon.bulletAtlas[this.sprite][this.frame].width,
                  game.weapon.bulletAtlas[this.sprite][this.frame].height
                 );
      c.restore();
      
      this.frameDuration += 1;

      if (this.frameDuration > game.weapon.bulletAtlas[this.sprite][this.frame].duration) {
        this.rotation -= Math.PI / game.weapon.bulletAtlas[this.sprite][this.frame].rotate;
        if (this.rotation > Math.PI * 2) {
          this.rotation += Math.PI * 2;
        }
        this.frameDuration = 0;
        this.frame += 1;
        if (this.frame == game.weapon.bulletAtlas[this.sprite].length) {
          this.frame = 0;
        }
      }
    }
  }
  
  this.Hitbox = function() {
    c = layer1.context;
    c.save();
    c.translate(camera.x, 0);
    c.strokeStyle = "rgb(0,0,255)";
    c.strokeRect(this.x,this.y - this.height,this.width,this.height);
    c.restore();
  }
}