function Tile (x,y,id,type) {
  this.x = x;
  this.y = y;
  this.id = id;
  this.type = type;
  
  this.sprite = new Image();
  this.sprite.src = "sprites/" + TileTypes[this.type].name;
  
  this.spriteX = TileTypes[this.type].tiles[this.id].x;
  this.spriteY = TileTypes[this.type].tiles[this.id].y;
  this.width = TileTypes[this.type].tiles[this.id].width;
  this.height = TileTypes[this.type].tiles[this.id].height;
  
  this.Render = function () {
    c = layer1.context;
    c.save();
    c.translate(Math.floor(camera.x), 0);
    
    c.drawImage(
      this.sprite,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height,
      Math.floor(this.x) * 16,
      Math.floor(this.y) * 16,
      this.width,
      this.height
    );
    c.restore();
  }
}

var TileTypes = [
  {
    name : "office.png",
    tiles : [
      {
        x : 0,
        y : 0,
        width : 16,
        height : 16
      },
      {
        x : 16,
        y : 0,
        width : 16,
        height : 16
      },
      {
        x : 0,
        y : 16,
        width : 16,
        height : 16
      },
      {
        x : 32,
        y : 0,
        width : 16,
        height : 16
      },
      {
        x : 48,
        y : 0,
        width : 16,
        height : 16
      },
      {
        x : 16,
        y : 16,
        width : 32,
        height : 16
      },
      {
        x : 48,
        y : 16,
        width : 16,
        height : 16
      },
      {
        x : 0,
        y : 32,
        width : 16,
        height : 16
      }
    ]
  }
]