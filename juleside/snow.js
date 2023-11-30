function SnowParticle() {
    this.x = Math.random() * 1.3 * document.documentElement.clientWidth;
    this.y = -10;
    this.xVel = -0.5 - 0.3 * Math.random();
    this.yVel = 1;
    this.xVel2 = 0;
    this.yVel2 = 0;
    this.update = function () {
        this.xVel2 *= 0.95;
        this.yVel2 *= 0.8
        if (Math.abs(this.xVel2) < 0.1) {
            this.xVel2 = 0;
        }
        if (Math.abs(this.yVel2) < 0.1) {
            this.yVel2 = 0;
        }
        if (this.xVel2 > 4) {
            this.xVel2 = 4;
        }
        if (this.yVel2 > 4) {
            this.yVel2 = 4;
        }
        if (this.xVel2 < -4) {
            this.xVel2 = -4;
        }
        if (this.yVel2 < -4) {
            this.yVel2 = -4;
        }
        this.x += this.xVel * 0.7 + this.xVel * Math.random() * 0.3 + this.xVel2;
        this.y += this.yVel + this.yVel2;
        if (this.x < -10 || this.y > document.documentElement.clientHeight) {
            return true
        } 
    }
    this.draw = function () {
        c = document.getElementById("canvasSnow").getContext("2d");
        c.fillStyle = "rgb(240,240,240)";
        c.fillRect(Math.round(this.x),Math.round(this.y),2,2);
    }
}

var Mouse = {
    x : 0,
    y : 0,
    xVel : 0,
    yVel : 0,
    Update : function(e) {
        this.xVel = e.clientX - this.x;
        this.yVel = e.clientY - this.y;
        this.x = e.clientX;
        this.y = e.clientY;
        if (Math.abs(this.xVel) > 1 || Math.abs(this.yVel) > 1) {
            for (var i = 0; i < snowParticles.length; i++) {
                if (Math.abs(this.x - snowParticles[i].x) < 50 && Math.abs(this.y - snowParticles[i].y) < 50 && Math.abs(this.xVel) + Math.abs(this.yVel) > 5) {
                    snowParticles[i].xVel2 += this.xVel * Math.abs(this.x - snowParticles[i].x) * Math.abs(this.y - snowParticles[i].y) / 10000;
                    snowParticles[i].yVel2 += this.yVel * Math.abs(this.x - snowParticles[i].x) * Math.abs(this.y - snowParticles[i].y) / 10000;
                }
            }
        }
    }
}

document.addEventListener("mousemove",Mouse.Update);

var christmasPhrases = [
    "ho ho ho",
    "merry chris",
    "merry christmas",
    "merry chrysler",
    "merry chrimmast",
    "merry christ",
    "marry me christ",
    "happy christmas",
    "snow is cold",
    "it is chrimsas",
    "christmass tree",
    "crimast wreath",
    "gwosh has festive frogs",
    "chromsler",
    "chrimsas",
    "chrimmast",
    "chromsus",
    "war on chris",
    "christmas hemsworth",
    "merry jesus",
    "chrismas",
    "ho ho ho santa",
    "santa",
    "rudolf the uncontainable",
    "cramsis",
    "happy easter",
    "crhimsas presents",
    "24th of decembbbb",
    "no",
    "daddy december",
    "prepare your christmas",
    "cgristmas is here",
    "turbo christmas",
    "giga chilling for christmsa",
    "how broken is chrims"
]

function addText(e) {
    var x = e.clientX, y = e.clientY;
    texts.push(new ChristmasText(x,y));
}

var texts = [];
function ChristmasText(x,y) {
    this.x = x;
    this.y = y;
    this.life = 100;
    this.text = christmasPhrases[Math.floor(christmasPhrases.length * Math.random())];
    this.update = function () {
        this.life -= 1;
        if (this.life <= 0) {
            return true;
        }
    }
    this.draw = function () {
        c = document.getElementById("canvasSnow").getContext("2d");
        c.fillStyle = "rgb(240,240,240)";
        c.font = "20px Verdana";
        c.textAlign = "center";
        c.save();
        c.globalAlpha = this.life / 100;
        c.fillText(this.text,this.x,this.y);
        c.restore();
    }
}

var snowParticles = [];
function update() {
    c = document.getElementById("canvasSnow").getContext("2d");
    c.clearRect(0,0,document.getElementById("canvasSnow").width,document.getElementById("canvasSnow").height);
    snowParticles.push(new SnowParticle());
    for (var i = 0; i < snowParticles.length; i++) {
        snowParticles[i].draw();
        if (snowParticles[i].update()) {
            snowParticles.splice(i,1);
            i -= 1;
        }
    }
    for (var i = 0; i < texts.length; i++) {
        texts[i].draw();
        if (texts[i].update()) {
            texts.splice(i,1);
            i -= 1;
        }
    }
    requestAnimationFrame(update);
}

function widthAndHeight() {
    document.getElementById("canvasSnow").width = document.documentElement.clientWidth;
    document.getElementById("canvasSnow").height = document.documentElement.clientHeight;
}

widthAndHeight();

document.addEventListener("click",addText);
window.addEventListener("resize",widthAndHeight);
requestAnimationFrame(update);