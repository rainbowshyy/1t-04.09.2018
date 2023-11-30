var background = {
    canvas : document.createElement("canvas"),
    init : function () {
        this.canvas.width = 960;
        this.canvas.height = 540;
        percentW = this.canvas.width / 240;
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        document.getElementById("gameContainer").innerHTML = "";
      document.getElementById("gameContainer").style.textAlign = "left";
        document.getElementById("gameContainer").appendChild(this.canvas);
        document.getElementById("gameContainer").children[0].style.transform = "scale(" + document.documentElement.clientWidth / 960 + "," + document.documentElement.clientWidth / 960 + ")";
    },
    clear : function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var backgrounds = [
    {
        name: "stone wall",
        sprite: "sprites/stone_wall.png",
    }
]

function backgroundDraw() {
    for (var i = 0; i < backgroundTiles.length; i++) {
        backgroundTiles[i].draw();
    }
}

var backgroundTiles = [];
function backgroundTile(x,y,id) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 75;
    this.id = id;
    this.sprite = new Image();
    this.sprite.src = backgrounds[this.id].sprite;
    this.draw = function () {
        if ((this.x * percentW + camera.x * percentW > 240 * percentW ||
           this.x * percentW + this.width * percentW + camera.x * percentW < 0) ||
            (this.y * percentW + camera.y * percentW > 135 * percentW ||
            this.y * percentW + this.height * percentW + camera.y * percentW < 0)) {
            return;
        } else {
            c = background.context;
            c.save();
            c.translate(camera.x * percentW,camera.y * percentW);
            c.drawImage(this.sprite,this.x * percentW, this.y * percentW, 75 * percentW, 75 * percentW);
            c.restore();
        }
    }
}