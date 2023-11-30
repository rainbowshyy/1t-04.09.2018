var height = window.innerHeight;

var sexDestroyerHeight, sexDestroyerForce, mouseY, mouseX;
function sexDestroyerMove(e) {
    e = window.event || e;
    mouseX = e.clientX; 
    mouseY = e .clientY;
    document.getElementById("sexDestroyer").style.transform = "translate(-80%, -90%) rotate(" + (360 - mouseY / height * 50) + "deg)";
    if (360 - mouseY / height * 50 < 322 && packetLeft > 60 && packetLeft < 100 && sexDestroyerForce < 0.055) {
        document.getElementById("sexDestroyer").style.transform = "translate(-80%, -90%) rotate(" + 322 + "deg)";
    }
}

const randomSymbols = [
    "%","&","#","@","¤","/","$","!","?","Þ","Œ","Ƃ","Ɓ","Ƨ"
]

function randomText() {
    var text = "", i;
    for (i=0; i<10; i++) {
        text += randomSymbols[Math.floor(Math.random() * (randomSymbols.length - 1))];
    }
    return text;
}

const packetURL =
      [
          ["w","w","w",".","b","u","s","i","n","e","s","s",".","c","o","m"],
          ["w","w","w",".","S","E","X",".","c","o","m"]
      ]

var packetLeft = -40, packetSpeed = 0.2, packetTextStage = 0, packetSex = 1, packetText = "", score = 0, life = 3;
function tick() {
    sexDestroyerForce = mouseY / height - sexDestroyerHeight;
    sexDestroyerHeight = mouseY / height;
    
    packetText = "";
    document.getElementById("packet").style.left = packetLeft - 20 + "%";
    packetLeft += packetSpeed;
    packetTextStage += packetSpeed;
    var i;
    for (i=0; i < packetTextStage / 12; i++) {
        packetText += packetURL[packetSex][i];
    }
    document.getElementById("packetText").innerHTML = packetText + randomText();
    if (sexDestroyerHeight > 0.9 && packetLeft > 60 && packetLeft < 100 && sexDestroyerForce > 0.055) {
        packetLeft = Math.random() * -40;
        if (packetSex == 1) {
            score += 1;
            packetSpeed += 0.05;
            document.getElementById("score").innerHTML = "Score: " + score + " Life: " + life;
            packetTextStage = 0;
        } else {
            packetTextStage = 0;
            life = life - 1;
            document.getElementById("score").innerHTML = "Score: " + score + " Life: " + life;
            if (life == 0) {
                document.getElementById("gameOver").style.display = "block";
                clearInterval(game);
            }
        }
        packetSex = Math.floor(Math.random() * 2);
    }
    if (packetLeft > 120) {
        if (packetSex == 1) {
            life += -1;
            document.getElementById("score").innerHTML = "Score: " + score + " Life: " + life;
            if (life == 0) {
                document.getElementById("gameOver").style.display = "block";
                clearInterval(game);
            }
        }
        packetTextStage = 0;
        packetLeft = Math.random() * -40;
        packetSex = Math.floor(Math.random() * 2);
    }
}

var game = setInterval(tick, 20);