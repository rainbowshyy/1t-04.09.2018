var font = new Image();
font.src = "sprites/font.png";

function write(x,y,text,alpha) {
    var line = 0,lines = 0,text = text.toLowerCase(), word = [];
    for (var i = 0; i < text.length; i++) {
        if (text[i] != " " && i != text.length - 1) {
            word.push(text[i]);
        } else {
            var index = [],wordWidth = [];
            for (var ix = 0; ix < word.length; ix++) {
                if (word[ix] == "a") {
                    wordWidth.push(4);
                    index.push(0);
                } else if (word[ix] == "b") {
                    wordWidth.push(5);
                    index.push(4);
                } else if (word[ix] == "c") {
                    wordWidth.push(4);
                    index.push(9);
                } else if (word[ix] == "d") {
                    wordWidth.push(4);
                    index.push(13);
                } else if (word[ix] == "e") {
                    wordWidth.push(4);
                    index.push(17);
                } else if (word[ix] == "f") {
                    wordWidth.push(4);
                    index.push(21);
                } else if (word[ix] == "g") {
                    wordWidth.push(4);
                    index.push(25);
                } else if (word[ix] == "h") {
                    wordWidth.push(4);
                    index.push(29);
                } else if (word[ix] == "i") {
                    wordWidth.push(2);
                    index.push(33);
                } else if (word[ix] == "j") {
                    wordWidth.push(3);
                    index.push(35);
                } else if (word[ix] == "k") {
                    wordWidth.push(4);
                    index.push(38);
                } else if (word[ix] == "l") {
                    wordWidth.push(4);
                    index.push(42);
                } else if (word[ix] == "m") {
                    wordWidth.push(6);
                    index.push(46);
                } else if (word[ix] == "n") {
                    wordWidth.push(5);
                    index.push(52);
                } else if (word[ix] == "o") {
                    wordWidth.push(4);
                    index.push(57);
                } else if (word[ix] == "p") {
                    wordWidth.push(4);
                    index.push(61);
                } else if (word[ix] == "q") {
                    wordWidth.push(5);
                    index.push(65);
                } else if (word[ix] == "r") {
                    wordWidth.push(4);
                    index.push(70);
                } else if (word[ix] == "s") {
                    wordWidth.push(4);
                    index.push(74);
                } else if (word[ix] == "t") {
                    wordWidth.push(4);
                    index.push(78);
                } else if (word[ix] == "u") {
                    wordWidth.push(4);
                    index.push(82);
                } else if (word[ix] == "v") {
                    wordWidth.push(4);
                    index.push(86);
                } else if (word[ix] == "w") {
                    wordWidth.push(6);
                    index.push(90);
                } else if (word[ix] == "x") {
                    wordWidth.push(4);
                    index.push(96);
                } else if (word[ix] == "y") {
                    wordWidth.push(4);
                    index.push(100);
                } else if (word[ix] == "z") {
                    wordWidth.push(4);
                    index.push(104);
                } else if (word[ix] == "0") {
                    wordWidth.push(4);
                    index.push(108);
                } else if (word[ix] == "1") {
                    wordWidth.push(3);
                    index.push(112);
                } else if (word[ix] == "2") {
                    wordWidth.push(4);
                    index.push(115);
                } else if (word[ix] == "3") {
                    wordWidth.push(4);
                    index.push(119);
                } else if (word[ix] == "4") {
                    wordWidth.push(4);
                    index.push(123);
                } else if (word[ix] == "5") {
                    wordWidth.push(4);
                    index.push(127);
                } else if (word[ix] == "6") {
                    wordWidth.push(4);
                    index.push(131);
                } else if (word[ix] == "7") {
                    wordWidth.push(4);
                    index.push(135);
                } else if (word[ix] == "8") {
                    wordWidth.push(4);
                    index.push(139);
                } else if (word[ix] == "9") {
                    wordWidth.push(4);
                    index.push(143);
                } else if (word[ix] == ".") {
                    wordWidth.push(2);
                    index.push(147);
                } else if (word[ix] == "!") {
                    wordWidth.push(2);
                    index.push(149);
                } else if (word[ix] == "?") {
                    wordWidth.push(4);
                    index.push(151);
                } else if (word[ix] == ":") {
                    wordWidth.push(2);
                    index.push(155);
                } else if (word[ix] == ",") {
                    wordWidth.push(2);
                    index.push(157);
                }
            }
            var width = 0;
            for (var ix = 0; ix < wordWidth.length; ix++) {
                width += wordWidth[ix];
            }
            if (x + line * 1.25 + width * 1.25 > 240) {
                lines += 1;
                line = 0;
            }
            line += 3;
            for (var ix = 0; ix < word.length; ix++) {
                c = hud.context;
                c.save();
                if (alpha) {
                    c.globalAlpha = alpha;
                }
                c.drawImage(font,index[ix],0,wordWidth[ix],7,(x + line) * 1.25 * percentW, (y + lines * 7 * 1.25) * percentW, wordWidth[ix] * 1.25 * percentW,7 * 1.25 * percentW);
                line += wordWidth[ix];
                c.restore();
            }
            word = [];
        }
    }
}

var textQueue = [];
function drawTextQueue() {
    for (var i = 0; i < textQueue.length; i++) {
        write(textQueue[i][0],textQueue[i][1],textQueue[i][2],textQueue[i][3]);
    }
    textQueue = [];
}

var dialogue;
function dialogueBox() {
    this.active = false;
    this.writing = false;
    this.done = false;
    this.text = "";
    this.textWritten = "";
    this.stage = 0;
    this.draw = function () {
        
    }
}