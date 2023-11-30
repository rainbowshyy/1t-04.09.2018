var layer1 = {
  canvas : document.createElement("canvas"),
  Init : function () {
    this.canvas.width = 420;
    this.canvas.height = 300;
    this.context = this.canvas.getContext("2d");
    this.context.imageSmoothingEnabled = false;
    document.getElementById("gameScreen").appendChild(this.canvas);
  },
  Clear : function () {
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  }
}

var game = {
  Init : function () {
    this.tile = 2/*Math.floor((document.body.clientWidth * 0.8) / 420)*/;
    layer1.Init();
    hud.Init();
    
    player.Init();
    
    game.weapon.Init();
    
    game.LoadEnemySprites();
    
    game.LoadParticleSprites();
    
    game.enemies = {
      current : [
      ],
      Update : function() {
        for (var i = 0; i < game.enemies.current.length; i++) {
          game.enemies.current[i].Update();
          if (game.enemies.current[i].dead) {
            game.enemies.current.splice(i,1);
            i -= 1;
          }
        }
      },
      Render : function() {
        for (var i = 0; i < game.enemies.current.length; i++) {
          game.enemies.current[i].Render();
        }
      },
      Hitbox : function() {
        for (var i = 0; i < game.enemies.current.length; i++) {
          game.enemies.current[i].Hitbox();
        }
      }
    }
    
    document.addEventListener("keydown",KeyDownFunction);
    document.addEventListener("keyup",KeyUpFunction);
    document.addEventListener("click",cursor.Click);
    document.getElementsByTagName("canvas")[1].addEventListener("mousemove",cursor.Update);
    
    this.level = new Level(3);
    this.level.Generate();
    
    this.UpdateSize();
    
    requestAnimationFrame(game.Tick);
  },
  UpdateSize : function () {
    this.tile = Math.floor(document.body.clientHeight / 300);
    for (var i = 0; i < document.getElementById("gameScreen").childElementCount; i++) {
      document.getElementById("gameScreen").children[i].style.transform = "scale(" + this.tile + "," + this.tile + ")";
    }
    document.getElementById("gameScreen").style.width = 420 * this.tile;
    document.getElementById("gameScreen").style.height = 300 * this.tile;
    
    var rect = document.getElementById("gameScreen").getBoundingClientRect();
    this.xOffset = rect.left;
    this.yOffset = rect.top;
  },
  tile : 0,
  debug : false,
  pause : false,
  frameInterval : 18,
  frameLast : Date.now(),
  damage : 0,
  
  Damage : function() {
    this.damage = 20;
  },
  
  Tick : function () {
    requestAnimationFrame(game.Tick);
    var now = Date.now();
    var delta = now - game.frameLast;
    if (delta > game.frameInterval) {
      if (game.damage == 0) {
        player.Update();
        camera.Update();
        game.weapon.Update();
        game.enemies.Update();
        game.particles.Update();
        game.Render();
      } else {
        game.damage -= 1;
      }
      game.frameLast = now - (delta % game.frameInterval);
    }
  },
  Render : function () {
    if (!this.pause) {
      layer1.Clear();
      hud.Clear();
      
      hud.Render();
      
      game.level.Render();
      
      game.particles.Render();
      
      game.enemies.Render();
      
      game.weapon.Render();
      
      player.Render();
      
      if (game.debug) {
        player.Hitbox();
        game.enemies.Hitbox();
        game.weapon.Hitbox();
      }
    }
  }
}
var keyLeft = false, keyUp = false, keyRight = false, keyDown = false,
    keyTab = false, keyShift = false, keySpace = false;
function KeyDownFunction(e) {
    var key = e.keyCode;
    if (key == 65) {
        keyLeft = true;
    } else if (key == 87) {
        keyUp = true;
    } else if (key == 68) {
        keyRight = true;
    } else if (key == 83) {
        keyDown = true;
    } else if (key == 9) {
        keyTab = true;
    } else if (key == 16) {
        keyShift = true;
    } else if (key == 32) {
        keySpace = true;
    }
}

function KeyUpFunction(e) {
    var key = e.keyCode;
    if (key == 65) {
        keyLeft = false;
    } else if (key == 87) {
        keyUp = false;
    } else if (key == 68) {
        keyRight = false;
    } else if (key == 83) {
        keyDown = false;
    } else if (key == 9) {
        keyTab = false;
    } else if (key == 16) {
        keyShift = false;
    } else if (key == 32) {
        keySpace = false;
    }
}