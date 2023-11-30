var hud = {
  canvas : document.createElement("canvas"),
  Init : function () {
    this.canvas.width = 420;
    this.canvas.height = 300;
    this.context = this.canvas.getContext("2d");
    this.context.imageSmoothingEnabled = false;
    document.getElementById("gameScreen").appendChild(this.canvas);
    
    this.atlas = new Image();
    this.atlas.src = "sprites/hud.png"
  },
  Clear : function () {
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  },
  
  Render : function () {
    c = this.context;
    c.drawImage(this.atlas,0,0,9,9,cursor.x - 4, cursor.y - 4, 9, 9);
    
    c.drawImage(this.atlas,0,18,37,9,9, 250, 37, 9);
    for (var i = 0; i < 5; i++) {
      if (i < player.health) {
        c.drawImage(this.atlas,0,9,9,9,51 + 11 * i, 250, 9, 9);
      } else {
        c.drawImage(this.atlas,9,0,9,9,51 + 11 * i, 250, 9, 9);
      }
    }
    
    c.drawImage(this.atlas,0,27,30,9,17, 268, 30, 9);
    for (var i = 0; i < 6; i++) {
      c.drawImage(this.atlas,9,9,7,9,49 + 6 * i, 268, 7, 9);
    }
  }
}