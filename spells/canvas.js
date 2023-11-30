//muh api very good nyes
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame})();

//Percent of width and height
var percentW;

var documentBody = document.body;
function requestFullScreen(element) {
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) {
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

//Defining the canvas area
var gameArea = {
    canvas : document.createElement("canvas"),
    init : function () {
        this.canvas.width = percentW * 240;
        this.canvas.height = percentW * 135;
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        document.getElementById("gameContainer").appendChild(this.canvas);
        document.getElementById("gameContainer").children[1].style.transform = "scale(" + document.documentElement.clientWidth / 960 + "," + document.documentElement.clientWidth / 960 + ")";
    },
    clear : function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var keyLeft = false, keyUp = false, keyRight = false, keyDown = false, keyZ = false, keyX = false, keyC = false,keyTab = false, keyA = false;
function keyDownFunction(e) {
    var key = e.keyCode;
    if (key == 37) {
        keyLeft = true;
    } else if (key == 38) {
        keyUp = true;
    } else if (key == 39) {
        keyRight = true;
    } else if (key == 40) {
        keyDown = true;
    } else if (key == 90) {
        keyZ = true;
    } else if (key == 88) {
        keyX = true;
        if (game == false) {
            requestFullScreen(documentBody);
            gameInit();
        }
    } else if (key == 67) {
        keyC = true;
    } else if (key == 9) {
        keyTab = true;
    } else if (key == 65) {
        keyA = true;
    }
}

function keyUpFunction(e) {
    var key = e.keyCode;
    if (key == 37) {
        keyLeft = false;
    } else if (key == 38) {
        keyUp = false;
    } else if (key == 39) {
        keyRight = false;
    } else if (key == 40) {
        keyDown = false;
    } else if (key == 90) {
        keyZ = false;
    } else if (key == 88) {
        keyX = false;
    } else if (key == 67) {
        keyC = false;
    } else if (key == 9) {
        keyTab = false;
    } else if (key == 65) {
        keyA = false;
    }
}
