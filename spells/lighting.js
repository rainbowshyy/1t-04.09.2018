var lighting = {
    canvas : document.createElement("canvas"),
    init : function () {
        this.canvas.width = percentW * 240;
        this.canvas.height = percentW * 135;
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        document.getElementById("gameContainer").appendChild(this.canvas);
        document.getElementById("gameContainer").children[2].style.transform = "scale(" + document.documentElement.clientWidth / 960 + "," + document.documentElement.clientWidth / 960 + ")";
    },
    clear : function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function lightsource(alpha,direction,lighter,x,y,width,height,image,originX,originY,originWidth,originHeight,color) {
    this.alpha = alpha;
    this.direction = direction;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = image;
    this.lighter = lighter;
    this.color = color;
    if (originX != undefined) {
        this.originX = originX;
        this.originY = originY;
        this.originWidth = originWidth;
        this.originHeight = originHeight;
    }
    this.draw = function () {
        c = lighting.context;
        c.save();
        c.globalAlpha = this.alpha + 0.01 * Math.random();
        if (this.lighter) {
            c.globalCompositeOperation = "destination-out";
        }
        if (this.color) {
            c.filter = "hue-rotate(" + playerColors[player.color].hue + "deg)";
        }
        c.translate(camera.x * percentW,camera.y * percentW);
        if (this.direction == -1) {
            c.translate(10 * percentW,0);
        }
        c.scale(this.direction,1);
        if (this.originHeight) {
            c.drawImage(this.sprite,this.originX,this.originY,this.originWidth,this.originHeight,this.x * percentW,this.y * percentW,this.width * percentW,this.height * percentW);
        } else {
            c.drawImage(this.sprite,this.x * percentW,this.y * percentW,this.width * percentW,this.height * percentW);
        }
        c.restore();
    }
}

var lightsources = [];
function lightsourcesDraw() {
    for (var i=0; i<lightsources.length;i++) {
        lightsources[i].draw();
    }
    lightsources = [];
}

function platformsDraw() {
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }
}

function decorationsDraw() {
    for (var i = 0; i < decorations.length; i++) {
        decorations[i].update();
        decorations[i].draw();
    }
}

function decorationsForegroundDraw() {
    for (var i = 0; i < decorationsForeground.length; i++) {
        decorationsForeground[i].draw();
    }
}

var darkness;
function darknessShading() {
    this.color = "rgb(3,0,0)";
    this.alpha = 0.8;   
    this.draw = function () {
        c = lighting.context;
        c.save();
        c.globalAlpha = this.alpha;
        c.fillStyle = this.color;
        c.fillRect(0,0,240 * percentW, 135 * percentW);
        c.restore();
    }
}