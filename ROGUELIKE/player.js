game.Player = {
  variant : 0,
  animation : {
    name : "idle",
    frame : 0,
    x : 50,
    y : 200,
    changeX : 0,
  },
  
  x : 50,
  y : 200,

  equipment : {
    mainHand : false,
    head : false,
    torso : false,
    legs : false,
    arms : false,
    back : false
  },
  
  Render : function () {
    c = game.context;
    
    //jeez
    c.drawImage(
      SPRITESHEETS[sprites.Player[this.variant][this.animation.name].src],
      sprites.Player[this.variant][this.animation.name].frames[this.animation.frame].x,
      sprites.Player[this.variant][this.animation.name].frames[this.animation.frame].y,
      sprites.Player[this.variant][this.animation.name].frames[this.animation.frame].w,
      sprites.Player[this.variant][this.animation.name].frames[this.animation.frame].h,
      (this.animation.x + sprites.Player[this.variant][this.animation.name].frames[this.animation.frame].pushX) * game.point,
      this.animation.y * game.point - sprites.Player[this.variant][this.animation.name].frames[this.animation.frame].h * game.point,
      sprites.Player[this.variant][this.animation.name].frames[this.animation.frame].w * game.point,
      sprites.Player[this.variant][this.animation.name].frames[this.animation.frame].h * game.point
    );
    
    //shadow
    game.backgroundContext.drawImage(
      SPRITESHEETS[sprites.Player[this.variant].shadow.src],
      sprites.Player[this.variant].shadow.x,
      sprites.Player[this.variant].shadow.y,
      sprites.Player[this.variant].shadow.w,
      sprites.Player[this.variant].shadow.h,
      (this.animation.x - 5) * game.point,
      (this.animation.y - 9) * game.point,
      sprites.Player[this.variant].shadow.w * game.point,
      sprites.Player[this.variant].shadow.h * game.point
    )
    
    //next frame + eventual loop
    this.animation.frame += 1;
    this.animation.x += this.animation.changeX;
    if (this.animation.frame >= sprites.Player[this.variant][this.animation.name].frames.length - 1) {
      if (sprites.Player[this.variant][this.animation.name].loop) {  
        this.animation.frame = 0;
      } else {
        this.animation.changeX = 0;
        this.animation.name = "idle";
        this.animation.frame = 0;
      }
    }
  },
  Actions : {
    current : [],
    coords : [],
    Update : function () {
      game.Player.Actions.coords = [];
      game.Player.Actions.current = [game.actions[1], game.actions[0]];
      if (!game.Player.equipment.mainHand) {
        game.Player.Actions.current.push(game.actions[2]);
      }
    },
    Render : function () {
      if (game.phase != 0) {
        return
      }
      c = game.context;
      
      game.Player.Actions.coords = [];
      for (var i = 0; i < game.Player.Actions.current.length; i++) {
        c.drawImage(
          SPRITESHEETS[sprites.Buttons[game.Player.Actions.current[i].icon].src],
          sprites.Buttons[game.Player.Actions.current[i].icon].frames[0].x,
          sprites.Buttons[game.Player.Actions.current[i].icon].frames[0].y,
          sprites.Buttons[game.Player.Actions.current[i].icon].frames[0].w,
          sprites.Buttons[game.Player.Actions.current[i].icon].frames[0].h,
          i % 2 == 0 ? (game.Player.x - 12 - 4 * Math.floor(i / 2)) * game.point : (game.Player.x + 36 + 4 * Math.floor(i / 2)) * game.point,
          (game.Player.y - 96 + 16 * Math.floor(i / 2)) * game.point,
          sprites.Buttons[game.Player.Actions.current[i].icon].frames[0].w * game.point,
          sprites.Buttons[game.Player.Actions.current[i].icon].frames[0].h * game.point
        );
        if (game.Player.Actions.hover != i) {
          c.drawImage(
            SPRITESHEETS[sprites.Buttons[game.Player.Actions.current[i].icon].src],
            sprites.Buttons[0].frames[0].x,
            sprites.Buttons[0].frames[0].y,
            sprites.Buttons[0].frames[0].w,
            sprites.Buttons[0].frames[0].h,
            i % 2 == 0 ? (game.Player.x - 12 - 4 * Math.floor(i / 2)) * game.point : (game.Player.x + 36 + 4 * Math.floor(i / 2)) * game.point,
            (game.Player.y - 96 + 16 * Math.floor(i / 2)) * game.point,
            sprites.Buttons[0].frames[0].w * game.point,
            sprites.Buttons[0].frames[0].h * game.point
          );
        } else {
          c.drawImage(
            SPRITESHEETS[sprites.Buttons[game.Player.Actions.current[i].icon].src],
            sprites.Buttons[1].frames[0].x,
            sprites.Buttons[1].frames[0].y,
            sprites.Buttons[1].frames[0].w,
            sprites.Buttons[1].frames[0].h,
            i % 2 == 0 ? (game.Player.x - 12 - 4 * Math.floor(i / 2)) * game.point : (game.Player.x + 36 + 4 * Math.floor(i / 2)) * game.point,
            (game.Player.y - 96 + 16 * Math.floor(i / 2)) * game.point,
            sprites.Buttons[0].frames[0].w * game.point,
            sprites.Buttons[0].frames[0].h * game.point
          );
        }
        game.Player.Actions.coords.push(
          {
            x : i % 2 == 0 ? (game.Player.x - 12 - 4 * Math.floor(i / 2)) * game.point : (game.Player.x + 36 + 4 * Math.floor(i / 2)) * game.point,
            y : (game.Player.y - 96 + 16 * Math.floor(i / 2)) * game.point,
            w : sprites.Buttons[game.Player.Actions.current[i].icon].frames[0].w * game.point,
            h : sprites.Buttons[game.Player.Actions.current[i].icon].frames[0].h * game.point
          }
        )
      }
    },
  }
}