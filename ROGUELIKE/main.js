//All values should be stored in the game object.
var game = {};

function CollisionRect(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.y + rect1.height > rect2.y) {
    return true;
  }
}

//Adding all values
game.Init = function() {
  
  //Defining the size of each point so that it fits within the viewport
  this.point = (Math.floor(document.body.clientWidth / 400) < Math.floor(document.body.clientHeight / 225)) ? Math.floor(document.body.clientWidth / 400) : Math.floor(document.body.clientHeight / 225) ;
  
  //Canvas has an aspect ratio of 4:3
  this.canvas = document.createElement("canvas");
  this.canvas.width = 400 * this.point;
  this.canvas.height = 225 * this.point;
  
  //Setting the 2d context and its parameters
  this.context = this.canvas.getContext("2d");
  this.context.imageSmoothingEnabled = false;
  
  this.clear = function(){this.context.clearRect(0,0,400 * this.point, 225 * this.point);this.backgroundContext.clearRect(0,0,400 * this.point, 225 * this.point);};
  
  //layers babey
  this.background = document.createElement("canvas");
  this.background.width = 400 * this.point;
  this.background.height = 225 * this.point;
  this.backgroundContext = this.background.getContext("2d");
  this.backgroundContext.imageSmoothingEnabled = false;
  document.getElementById("wrapper").appendChild(this.background);
  
  game.background.Render = function() {
    c = game.backgroundContext;
    c.drawImage(SPRITESHEETS[sprites.Backgrounds[game.Combat.background.sprite].src],
              sprites.Backgrounds[game.Combat.background.sprite].frames[game.Combat.background.frame].x,
              sprites.Backgrounds[game.Combat.background.sprite].frames[game.Combat.background.frame].y,
              sprites.Backgrounds[game.Combat.background.sprite].frames[game.Combat.background.frame].w,
              sprites.Backgrounds[game.Combat.background.sprite].frames[game.Combat.background.frame].h,
              0,
              0,
              400 * game.point,
              225 * game.point
             )
  }
  
  //Inserting the canvas element
  document.getElementById("wrapper").appendChild(this.canvas);
  
  this.actions = [
    {
      name : "dashRight",
      icon : 2,
      action : function() {
        game.Player.x += 30;
        game.Player.animation.changeX = (game.Player.x - game.Player.animation.x) / sprites.Player[game.Player.variant][game.Player.animation.name].frames.length;
      }
    },
    {
      name : "dashLeft",
      icon : 3,
      action : function() {
        game.Player.x -= 30;
        game.Player.animation.changeX = (game.Player.x - game.Player.animation.x) / sprites.Player[game.Player.variant][game.Player.animation.name].frames.length;
      }
    },
    {
      name : "punch",
      icon : 4
    },
  ]
  
  //MOUSE
  this.ClickEvent = function(e) {
    if (game.phase == 0) {  
      for (var i = 0; i < game.Player.Actions.coords.length; i++) {
        if (
          e.clientX - document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length - 1].offsetLeft > game.Player.Actions.coords[i].x + 1 &&
          e.clientX - document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length - 1].offsetLeft < game.Player.Actions.coords[i].x + game.Player.Actions.coords[i].w - 1 &&
          e.clientY - document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length - 1].offsetTop > game.Player.Actions.coords[i].y + 1 &&
          e.clientY - document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length - 1].offsetTop < game.Player.Actions.coords[i].y + game.Player.Actions.coords[i].h - 1
        ) {
          game.phase = 1;
          game.Player.animation.frame = 0;
          game.Player.animation.name = game.Player.Actions.current[i].name; //change to logic
          game.Player.Actions.current[i].action();
        }
      }
    }
  }
  
  this.UpdateMousePos = function(e) {
    if (game.phase == 0) {
      game.Player.Actions.hover = NaN;
      for (var i = 0; i < game.Player.Actions.coords.length; i++) {
        if (
          e.clientX - document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length - 1].offsetLeft > game.Player.Actions.coords[i].x + 1 &&
          e.clientX - document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length - 1].offsetLeft < game.Player.Actions.coords[i].x + game.Player.Actions.coords[i].w - 1 &&
          e.clientY - document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length - 1].offsetTop > game.Player.Actions.coords[i].y + 1 &&
          e.clientY - document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length - 1].offsetTop < game.Player.Actions.coords[i].y + game.Player.Actions.coords[i].h - 1
        ) {
          game.Player.Actions.hover = i;
        }
      }
    }
  }
  
  document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length - 1].addEventListener("mousemove", game.UpdateMousePos);
  document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length - 1].addEventListener("click", game.ClickEvent);
  
  //PHASES = 0 : ACTION, 1 : ANIMATION, 2 : ENEMY ACTION, 3 : ANIMATION
  this.phase = 0;
  game.Player.Actions.Update();
  
  //The Render function
  game.frameLast = Date.now();
  game.frameInterval = 40; //aseprite per 60ms, here it's 75ms???
  this.Render = function() {
    requestAnimationFrame(game.Render);
    var now = Date.now();
    var delta = now - game.frameLast;
    if (delta > game.frameInterval) {
      game.frameLast = now - (delta % game.frameInterval);
      game.clear();
      game.background.Render();
      
      game.Combat.enemies.Render();
      
      game.Player.Render();
      game.Player.Actions.Render();
    }
  }
  
  requestAnimationFrame(game.Render)
}