function Level(progress) {
  this.progress = progress;
  this.size = Math.round(Math.sqrt(this.progress) + 2);
  this.floors = Math.floor(-8/(Math.pow(this.progress,0.1)) + 9)
  
  this.chunks = [];
  
  this.Generate = function() {
    for (var i = 0; i < this.size; i++) {
      this.chunks.push(new Chunk(i * 30,0));
      this.chunks[i].Generate();
    }
  };
  this.Render = function() {
    for (var i = 0; i < this.chunks.length; i++) {
      if (this.chunks[i].x * 16 + camera.x > -480 && this.chunks[i].x * 16 + camera.x < 420) {
        this.chunks[i].Render();
      }
    }
  }
}

function Chunk(x,id) {
  this.x = x;
  this.tiles = [];
  this.Generate = function() {
    //floor base
    for (var ix = 0; ix < 30; ix++) {
      this.tiles.push(new Tile(this.x + ix,13,0,0));
    }
    //floor upper
    for (var ix = 0; ix < 30; ix++) {
      this.tiles.push(new Tile(this.x + ix,12,2,0));
    }
    //wall
    for (var ix = 0; ix < 30; ix++) {
      for (var iy = 0; iy < 12; iy++) {
        this.tiles.push(new Tile(this. x + ix,11 - iy,1,0));
      }
    }
    //wall decoration
    for (var ix = 0; ix < 30; ix++) {
      for (var iy = 0; iy < 4; iy++) {
        if (Math.random() > 0.8) {
          var roll = Math.random();
          if (roll > 0.8) {
            this.tiles.push(new Tile(this.x + ix,10 - iy,3,0));
          } else if (roll > 0.6) {
            this.tiles.push(new Tile(this.x + ix,10 - iy,4,0));
          } else if (roll > 0.55) {
            this.tiles.push(new Tile(this.x + ix,10 - iy,5,0));
          } else if (roll > 0.5) {
            this.tiles.push(new Tile(this.x + ix,9 - iy,6,0));
          } else if (roll > 0.3) {
            this.tiles.push(new Tile(this.x + ix,10 - iy,7,0));
          }
        }
      }
    }
    
    if (this.x != 0 && this.x != (game.level.size - 1) * 30) {
      for (var i = 0; i < 2 + Math.sqrt(game.level.progress) * Math.random(); i++) {
        var id = Math.floor(Math.random() * game.level.progress / 2);
        game.enemies.current.push(new Enemy(this.x * 16 + Math.round(Math.random() * 28) * 16,212,id));
        for (var ix = 0; ix < game.enemies.current.length; ix++) {
          if (Collision(game.enemies.current[i],game.enemies.current[ix]) && game.enemies.current[i] != game.enemies.current[ix]) {
            if (game.enemies.current[i].xCenter > game.enemies.current[ix].xCenter) {
              game.enemies.current[i].x += game.enemies.current[ix].x + game.enemies.current[ix].width - game.enemies.current[i].x + 1;
            } else {
              game.enemies.current[i].x += game.enemies.current[ix].x - game.enemies.current[i].x - game.enemies.current[i].width - 1;
            }
            ix = 0;
          }
        }
      }
    }
  },
    this.Render = function() {
    for (var i = 0; i < this.tiles.length; i++) {
      this.tiles[i].Render();
    }
  }
}