function enemy(id) {
  this.id = id;
  this.name = game.Enemies[this.id];
  this.stats = game.Enemies[this.id].stats;
  this.hpMax = this.stats.vitality * this.stats.baseHP;
  
  this.animation = {
    name : "idle",
    frame : 0,
    x : 300,
    y : 200,
    changeX : 0,
  }
  
  this.Render = function(){
    c = game.context;
    
    //jeez
    c.drawImage(
      SPRITESHEETS[sprites.Enemies[this.id][this.animation.name].src],
      sprites.Enemies[this.id][this.animation.name].frames[this.animation.frame].x,
      sprites.Enemies[this.id][this.animation.name].frames[this.animation.frame].y,
      sprites.Enemies[this.id][this.animation.name].frames[this.animation.frame].w,
      sprites.Enemies[this.id][this.animation.name].frames[this.animation.frame].h,
      (this.animation.x + sprites.Enemies[this.id][this.animation.name].frames[this.animation.frame].pushX) * game.point,
      this.animation.y * game.point - sprites.Enemies[this.id][this.animation.name].frames[this.animation.frame].h * game.point,
      sprites.Enemies[this.id][this.animation.name].frames[this.animation.frame].w * game.point,
      sprites.Enemies[this.id][this.animation.name].frames[this.animation.frame].h * game.point
    );
    
    //next frame + eventual loop
    this.animation.frame += 1;
    this.animation.x += this.animation.changeX;
    if (this.animation.frame >= sprites.Enemies[this.id][this.animation.name].frames.length - 1) {
      if (sprites.Enemies[this.id][this.animation.name].loop) {  
        this.animation.frame = 0;
      } else {
        this.animation.changeX = 0;
        this.animation.name = "idle";
        this.animation.frame = 0;
      }
    }
  }
}

game.Combat = {
  background : {
    frame : 0,
    sprite : "dungeon"
  },
  enemies : {
    current : [],
    Render : function() {
      for (var i = 0; i < game.Combat.enemies.current.length; i++) {
        game.Combat.enemies.current[i].Render();
      }
    }
  }
}

game.Enemies = {
  rat : {
    name : "giant rat",
    src : "rat",
    stats : {
      strength : 1,
      dexterity : 3,
      intelligence : 1,
      vitality : 2,
      charisma : 1,
      size : "tiny",
      baseHP : 5,
    },
    actions : [
      {
        name : "dashRight"
      },
      {
        name : "dashLeft"
      },
      {
        name : "bite"
      }
    ],
    logic : function(object,player) {
      
    }
  }
}

game.Combat.enemies.current.push(new enemy("rat"));