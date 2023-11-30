game.BloodParticle = function(x,y,angle,speed) {
  this.x = x;
  this.y = y;
  this.xVelocity = Math.cos(angle) * speed;
  this.yVelocity = Math.sin(angle) * speed;
  this.yVelocityMax = 5;
  this.z = Math.round(Math.random() * 16);
  
  this.Update = function() {
    if (this.y >= 216 - this.z) {
      this.y = 216 - this.z
      this.yVelocity = 0;
      this.xVelocity = 0;
    }
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.yVelocity = Gravity(this);
  }
  this.Render = function() {
    c = layer1.context;
    
    c.save();
    c.translate(camera.x, 0);

    c.drawImage(game.particles.list[0].sprite,
                this.x,
                this.y,
                1,
                1
               );
    c.restore();
  }
}

game.particles = {};

game.particles = {
  current : [
  ],
  Update : function() {
    var particleDelta = game.particles.current.length - 500;
    if (particleDelta > 0) {
      game.particles.current.splice(0,particleDelta);
    }
    for (var i = 0; i < game.particles.current.length; i++) {
      game.particles.current[i].Update();
    }
  },
  Render : function() {
    for (var i = 0; i < game.particles.current.length; i++) {
      game.particles.current[i].Render();
    }
  },
  Hitbox : function() {
    for (var i = 0; i < game.particles.current.length; i++) {
      game.particles.current[i].Hitbox();
    }
  }
}

game.particles.list = [
  {
    src : "sprites/blood.png"
  }
]

game.LoadParticleSprites = function() {
  for (var i = 0; i < game.particles.list.length; i++) {
    game.particles.list[i].sprite = new Image();
    game.particles.list[i].sprite.src = game.particles.list[i].src;
  }
}