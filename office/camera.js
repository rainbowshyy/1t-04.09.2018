var camera = {
  x : 0,
  y : 0,
  Update : function () {
    this.x = -player.x + (player.x - (cursor.x - camera.x)) / 4 + 200;
  }
}

var cursor = {
  x : 0,
  y : 0,
  Update : function (event) {
    cursor.x = Math.floor((event.clientX - game.xOffset) / game.tile);
    cursor.y = Math.floor((event.clientY - game.yOffset) / game.tile);
  },
  
  Click : function (event) {
    game.weapon.Click();
  }
}