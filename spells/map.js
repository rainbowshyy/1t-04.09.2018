var platforms = [];
function platform(x,y,width,height,id,index,platform) {
    this.x = x;
    this.width = width;
    this.height = height;
    this.y = y + 10 - height;
    this.xCenter = this.x + this.width / 2;
    this.yCenter = this.y + this.height / 2;
    this.id = id;
    this.index = index;
    this.platform = platform;
    this.color = tileId[this.id].color;
    this.damage = tileId[this.id].damage;
    this.sprite = new Image();
    this.sprite.src = tileId[this.id].sprite;
    
    this.updateState = function () {
        this.state = tileId[this.id].updateState(this.index);
    }
    
    this.draw = function () {
        if ((this.x * percentW + camera.x * percentW > 240 * percentW ||
           this.x * percentW + this.width * percentW + camera.x * percentW < 0) ||
            (this.y * percentW + camera.y * percentW > 135 * percentW ||
            this.y * percentW + this.height * percentW + camera.y * percentW < 0)) {
            return;
        } else {
            c = gameArea.context;
            c.save();
            c.translate(camera.x * percentW,camera.y * percentW);
            c.drawImage(this.sprite,this.state * 8,0,8,8,this.x * percentW,this.y * percentW,this.width * percentW,this.height * percentW);
            c.restore();
        }
    }
}

var decorations = [];
var decorationsForeground = [];
function decoration(x,y,width,height,id,index) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xCenter = this.x + this.width / 2;
    this.yCenter = this.y + this.height / 2;
    this.id = id;
    this.index = index;
    this.sprite = new Image();
    this.sprite.src = decorationId[this.id].sprite;
    this.spriteWidth = decorationId[this.id].spriteWidth;
    this.spriteHeight = decorationId[this.id].spriteHeight;
    this.state = 0;
    this.stage = 0;
    this.count = 0;
    if (decorationId[this.id].light != undefined) {
        this.light = decorationId[this.id].light(this.xCenter,this.yCenter);
    }
    this.updateState = function () {
        this.state = Math.floor(Math.random() * decorationId[this.id].variatons);
    }
    this.update = function () {
        var updateArray = decorationId[this.id].update(this.count,this.stage,decorationId[this.id].stages);
        this.count = updateArray[0];
        this.stage = updateArray[1];
    }
    this.draw = function () {
        if (this.light != undefined) {
            lightsources.push(this.light);
        }
        if ((this.x * percentW + camera.x * percentW > 240 * percentW ||
           this.x * percentW + this.width * percentW + camera.x * percentW < 0) ||
            (this.y * percentW + camera.y * percentW > 135 * percentW ||
            this.y * percentW + this.height * percentW + camera.y * percentW < 0)) {
            return;
        } else {
            c = gameArea.context;
            c.save();
            c.translate(camera.x * percentW,camera.y * percentW);
            c.drawImage(this.sprite,this.state * this.spriteWidth + this.stage * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x * percentW,this.y * percentW,this.width * percentW,this.height * percentW);
            c.restore();
        }
    }
}

var map;

//sizeMin, sizeMax, 
function mapGenerate(mapArray,sizeMin,sizeMax,enemiesM,enemiesChance,spikeChance,spikeMax,decorationsM,decorationsChance) {
    
    this.mapArray = mapArray;
    if (mapArray) {
        this.x = mapArray[0];
        this.y = mapArray[1];
        
        this.rooms = [];
        for (var i = 0; i < mapArray[2].length; i++) {
            this.rooms.push(new room(
                mapArray[2][i][0],
                mapArray[2][i][1],
                mapArray[2][i][2],
                mapArray[2][i][3],
                i
            ));
        }
        
        this.mapArray = [];
        for (var i = 0; i < this.x; i++) {
            for (var iy = 0; iy < this.y; iy++) {
                this.mapArray.push(mapArray[3][iy][i]);
            }
        }
        this.decorationsFArray = [];
        for (var i = 0; i < this.x; i++) {
            for (var iy = 0; iy < this.y; iy++) {
                this.decorationsFArray.push(mapArray[4][iy][i]);
            }
        }
        player.x = mapArray[5];
        player.y = mapArray[6];
    }
    
    this.size = sizeMin;
    this.max = sizeMax;
    this.enemies = enemiesM;
    this.enemiesChance = enemiesChance;
    this.spikeChance = spikeChance;
    this.spikeMax = spikeMax;
    this.decorations = decorationsM;
    this.decorationsChance = decorationsChance;
    
    this.generate = function() {
        if (!this.mapArray) {
            this.done = false;
            while (this.done == false) {
                this.rooms = [];

                for (var i = 0; i < Math.random() * 300 + 500; i++) {
                    if (Math.random() > 0.02) {
                        this.rooms.push(new room(Math.floor(Math.random() * 400),10,Math.floor(Math.random() * 20 + 10),Math.floor(Math.random() * 2 + 4),i));
                    } else if (Math.random() > 0.6) {
                        this.rooms.push(new room(Math.floor(Math.random() * 400),10,Math.floor(Math.random() * 40 + 10),Math.floor(Math.random() * 2 + 2),i));
                    } else {
                        this.rooms.push(new room(Math.floor(Math.random() * 400),10,Math.floor(Math.random() * 50 + 10),Math.floor(Math.random() * 15 + 8),i));
                    }
                }

                var didMove = true;
                while (didMove == true) {
                    didMove = false;
                    for (var i = 0; i < this.rooms.length; i++) {
                        if (didMove == false) {
                            didMove = this.rooms[i].pushY(1);
                        } else {
                            this.rooms[i].pushY(1);
                        }
                    }
                }
                var roomsAmount = 0;
                for (var ix = 0; ix < this.rooms.length; ix++) {
                    for (var i = 0; i < this.rooms.length; i++) {
                        if (this.rooms[i].isConnected()) {
                            roomsAmount += 1;
                        }
                        if (roomsAmount >= this.max) {
                            i = this.rooms.length;
                            ix = this.rooms.length;
                        }
                    }
                }
                for (var ix = 0; ix < 3; ix++) {
                    for (var i = 0; i < this.rooms.length; i++) {
                        if (roomsAmount >= this.max) {
                            i = this.rooms.length;
                            ix = 3;
                        } else {
                            if (this.rooms[i].center()) {
                                roomsAmount += 1;
                            }
                        }
                    }
                }
                for (var i = 0; i < this.rooms.length; i++) {
                    if (this.rooms[i].connected == false) {
                        this.rooms.splice(i,1);
                        i -= 1;
                    }
                }
                if (this.rooms.length >= this.size && this.rooms.length <= this.max) {
                    this.done = true;
                }
            }

            this.x = 0;
            this.y = 0;

            for (var i = 0; i < this.rooms.length; i++) {
                if (this.rooms[i].x + this.rooms[i].width > this.x) {
                    this.x = this.rooms[i].x + this.rooms[i].width;
                }
                if (this.rooms[i].y + this.rooms[i].height > this.y) {
                    this.y = this.rooms[i].y + this.rooms[i].height;
                }

            }
            this.x += 2;
            this.y += 4;

            this.mapArray = [];
            this.distanceArray = [];
            for (var ix=0;ix<this.x;ix++) {
                for (var iy=0;iy<this.y;iy++) {
                    var tileOpen = false, lastTile, distance = 0;
                    for (var i = 0; i < this.rooms.length; i++) {
                        if(ix < this.rooms[i].x + this.rooms[i].width && 
                            ix> this.rooms[i].x &&
                            iy < this.rooms[i].y + this.rooms[i].height && 
                            iy > this.rooms[i].y) {
                            distance = this.rooms[i].trueDistance;
                            tileOpen = true;
                        }
                    }

                    if (tileOpen == false && lastTile == false) {
                        this.mapArray.push(1);
                        this.distanceArray.push(0);
                    } else {
                        this.mapArray.push(0);
                        this.distanceArray.push(distance);
                    }
                    lastTile = tileOpen;
                }
            }

            //Hazards

            for (var i=0; i<this.mapArray.length;i++) {
                if (Math.random() > this.spikeChance) {
                    var openOver = 0, openOn = 0, openUnder = 0, over = true, on = true, under = true,hazardPotential = [];
                    for (var ix = 0; ix < spikeMax; ix++) {
                        if (map.mapArray[i - 1 + ix * this.y] == 0 && over) {
                            openOver += 1;
                        } else {
                            over = false;
                        }
                        if (map.mapArray[i + ix * this.y] == 1 && on) {
                            openOn += 1;
                            hazardPotential.push(i + ix * this.y);
                        } else {
                            on = false;
                        }
                        if (map.mapArray[i + 1 + ix * this.y] == 1 && under) {
                            openUnder += 1;
                        } else {
                            under = false;
                        }
                    }
                    var open = openOver;
                    if (open > openOn) {
                        open = openOn;
                    }
                    if (open > openUnder) {
                        open = openUnder;
                    }
                    if (open > 3) {
                        for (var ix = 1; ix < hazardPotential.length - 1; ix++) {
                            map.mapArray[hazardPotential[ix]] = 2;
                            if (Math.random() > 0.6 && ix > 3) {
                                ix = hazardPotential.length;
                            }
                        }
                    }
                }
            }

            //Platforms

            for (var i = 0; i < this.mapArray.length; i++) {
                if (this.mapArray[i] == 0 && Math.random() > 0.9) {
                    var height = 1, width = 1;
                    while (this.mapArray[i - height] == 0) {
                        height += 1;
                    }
                    if (height > 6) {
                        var empty = true;
                        while (empty) {
                            for (var ix = 0; ix < height; ix++) {
                                if (this.mapArray[i - ix + width * this.y] != 0) {
                                    empty = false;
                                }
                            }
                            if (empty) {
                                width += 1;
                            }
                        }
                        if (width > 3) {
                            for (var ix = 1; ix < width - 1; ix++) {
                                this.mapArray[i - 2 + ix * this.y] = 3;
                            }
                        }
                    }
                }
            }

            var count = 0,lastTile = 0;
            for (var i = 0; i < this.mapArray.length; i++) {
                if (this.mapArray[i] == 1) {
                    count = 0;
                    lastTile = 1;
                } else if (this.mapArray[i] == 0) {
                    count += 1;
                    lastTile = 0;
                } else if (this.mapArray[i] == 3 && count <= 4) {
                    this.mapArray[i] = 0;
                } else if (this.mapArray[i] == 3) {
                    count = 0;
                    lastTile = 3;
                } else if (this.mapArray[i] == 2) {
                    if (lastTile == 1) {
                        this.mapArray[i] = 1;
                        lastTile = 1;
                    } else {
                        lastTile = 2;
                    }
                }
            }

            for (var iy = 0; iy < this.y; iy++) {
                var length = 0, platformOn = false;
                for (var ix = 0; ix < this.x; ix++) {
                    if (this.mapArray[iy + ix * this.y] == 3) {
                        platformOn = true;
                        length += 1;
                    } else if (this.mapArray[iy + ix * this.y] != 3 && platformOn == true) {
                        if (length < 2) {
                            this.mapArray[iy + ix * this.y - this.y] = 0;
                        }
                        length = 0;
                        platformOn = false;
                    }
                }
            }

            //Array to objects ingame
            for (var i = 0; i < this.mapArray.length; i++) {
                if (this.mapArray[i] == 1) {
                    platforms.push(new platform(Math.floor(i / this.y) * 10,(i % this.y) * 10,10,10,0,i));
                } else if (this.mapArray[i] == 2) {
                    platforms.push(new platform(Math.floor(i / this.y) * 10,(i % this.y) * 10,10,9,1,i));
                } else if (this.mapArray[i] == 3) {
                    platforms.push(new platform(Math.floor(i / this.y) * 10,(i % this.y) * 10,10,10,2,i,true));
                }
            }

            //spooky sex offenders
            var lastTile = 1;
            for (var i = 0; i < this.mapArray.length; i++) {
                if ((this.mapArray[i] == 1 || this.mapArray[i] == 3) && lastTile == 0 && Math.random() > this.enemiesChance) {
                    var spawnEnemy = Math.floor(Math.random() * this.enemies.length);
                    enemies.push(new enemy(Math.floor(i / this.y) * 10,(i % this.y) * 10 - 10,this.enemies[spawnEnemy]));
                }
                lastTile = this.mapArray[i];
            }

            //update tile states
            for (var i = 0; i < platforms.length; i++) {
                platforms[i].updateState();
            }

            //Door time baby! :)
            var lastTile = 0, lastTile2 = 0,distanceLongest = 0, distanceLongestIndex;
            for (var i = 0; i < this.mapArray.length; i++) {
                if (lastTile == 0 && lastTile2 == 0 && this.mapArray[i] == 1 && this.mapArray[i - this.y] == 1 && this.mapArray[i - this.y - 1] == 0 && this.mapArray[i - this.y - 2] == 0 && distanceLongest <= this.distanceArray[i - 2]) {
                    if (distanceLongest < this.distanceArray[i - 2] || Math.random() > 0.8) {
                        distanceLongestIndex = i;
                        distanceLongest = this.distanceArray[i - 2];
                    }
                }
            }

            //decorations
            this.decorationsFArray = [];

            var lastTile = 0, lastTile2 = 0,lastTile3 = 0,spawn = false;
            for (var i = 0; i < this.mapArray.length; i++) {
                if (i == distanceLongestIndex) {
                    this.decorationsFArray.push(0);
                    this.decorationsFArray[i - 1] = 7;
                    this.decorationsFArray[i - 2] = 7;
                    this.decorationsFArray[i - this.y - 1] = 7;
                    this.decorationsFArray[i - this.y - 2] = 7;
                    decorations.push(new door(Math.floor(i / this.y) * 10 - 10,(i % this.y) * 10 - 20,0));
                } else if (Math.floor(i / this.y) == 200 && lastTile == 0 && lastTile2 == 0 && (this.mapArray[i] == 1 || this.mapArray[i] == 3) && spawn == false) {
                    spawn = true;
                    this.decorationsFArray.push(0);
                    this.decorationsFArray[i - 1] == 7;
                    this.decorationsFArray[i - 2] == 7;
                    player.y = (i % this.y) * 10 - 18;
                    decorations.push(new door(Math.floor(i / this.y) * 10 - 10,(i % this.y) * 10 - 20,0,true));
                } else if (((lastTile == 1 && this.mapArray[i] == 0) || this.mapArray[i] == 3) && Math.random() > 0.98) {
                    this.decorationsFArray.push(1);
                    decorationsForeground.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10,10,10,0,i))
                } else if (this.mapArray[i] == 0 && lastTile == 0 && lastTile2 == 1 && this.decorationsFArray[i - 1] == 0 && Math.random() > 0.95) {
                    this.decorationsFArray[i - 1] = 2;
                    this.decorationsFArray.push(2);
                    decorationsForeground.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10 - 10,10,20,1,i))
                } else if (this.mapArray[i] == 0 && lastTile == 0 && lastTile2 == 0 && lastTile3 == 1 && this.decorationsFArray[i - 2] == 0 && Math.random() > 0.95 && (Math.floor(i / this.y) % 6) == 3) {
                    this.decorationsFArray[i - 2] = 3;
                    this.decorationsFArray[i - 1] = 3;
                    this.decorationsFArray.push(3);
                    decorations.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10 - 20,10,20,2,i));
                    decorations.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10,10,10,3,i));
                } else if ((this.mapArray[i] == 1 || this.mapArray[i] == 3) && lastTile == 0 && lastTile2 == 0 && lastTile3 == 0 && this.decorationsFArray[i - 1] == 0 && this.decorationsFArray[i - 2] == 0 && Math.random() > 0.85 && (Math.floor(i / this.y) % 6) == 0) {
                    this.decorationsFArray[i - 2] = 4;
                    this.decorationsFArray[i - 1] = 4;
                    this.decorationsFArray.push(0);
                    decorations.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10 - 20,10,20,4,i));
                } else if ((this.mapArray[i] == 1 || this.mapArray[i] == 3) && lastTile == 0 && this.decorationsFArray[i - 1] == 0 && Math.random() > 0.95) {
                    this.decorationsFArray[i - 1] = 5;
                    this.decorationsFArray.push(0);
                    decorations.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10 - 8.75,10,10,5,i));
                } else if (lastTile == 0 && lastTile2 == 0 && this.mapArray[i] == 1 && this.mapArray[i - this.y] == 1 && this.mapArray[i - this.y - 1] == 0 && this.mapArray[i - this.y - 2] == 0 && this.decorationsFArray[i - 1] == 0 && this.decorationsFArray[i - 2] == 0 && this.decorationsFArray[i - this.y - 1] == 0 && this.decorationsFArray[i - this.y - 2] == 0 && Math.random() > 0.999) {
                    this.decorationsFArray.push(0);
                    this.decorationsFArray[i -1] = 6;
                    this.decorationsFArray[i - 2] = 6;
                    this.decorationsFArray[i - this.y - 1] = 6;
                    this.decorationsFArray[i - this.y - 2] = 6;
                    decorations.push(new chest(Math.floor(i / this.y) * 10 - 10,(i % this.y) * 10 - 20,0));
                } else {
                    this.decorationsFArray.push(0);
                }
                lastTile3 = lastTile2;
                lastTile2 = lastTile;
                lastTile = this.mapArray[i];
            }

            for (var i = 0; i < decorationsForeground.length; i++) {
                decorationsForeground[i].updateState();
            }
            for (var i = 0; i < decorations.length; i++) {
                decorations[i].updateState();
            }

            for (var i = 0; i < this.x / 7.5; i++) {
                for (var ix = 0; ix < this.y / 7.5; ix++) {
                    backgroundTiles.push( new backgroundTile(i * 75,ix * 75,0));
                }
            }
        } else {
            for (var i = 0; i < this.rooms.length; i++) {
                this.rooms[i].connected = true;
            }
            for (var i = 0; i < this.mapArray.length; i++) {
                if (this.mapArray[i] == 1) {
                    platforms.push(new platform(Math.floor(i / this.y) * 10,(i % this.y) * 10,10,10,0,i));
                } else if (this.mapArray[i] == 2) {
                    platforms.push(new platform(Math.floor(i / this.y) * 10,(i % this.y) * 10,10,9,1,i));
                } else if (this.mapArray[i] == 3) {
                    platforms.push(new platform(Math.floor(i / this.y) * 10,(i % this.y) * 10,10,10,2,i,true));
                }
            }
            for (var i = 0; i < platforms.length; i++) {
                platforms[i].updateState();
            }
            for (var i = 0; i < this.decorationsFArray.length; i++) {
                if (this.decorationsFArray[i] == 1) {
                    decorationsForeground.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10,10,10,0,i))
                } else if (this.decorationsFArray[i] == 2) {
                    decorationsForeground.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10 - 10,10,20,1,i))
                } else if (this.decorationsFArray[i] == 3) {
                    decorations.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10 - 20,10,20,2,i));
                    decorations.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10,10,10,3,i));
                } else if (this.decorationsFArray[i] == 4) {
                    decorations.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10 - 10,10,20,4,i));
                } else if (this.decorationsFArray[i] == 5) {
                    decorations.push(new decoration(Math.floor(i / this.y) * 10,(i % this.y) * 10 - 8.75,10,10,5,i));
                } else if (this.decorationsFArray[i] == 6) {
                    decorations.push(new chest(Math.floor(i / this.y) * 10 - 10,(i % this.y) * 10 - 10,0));
                } else if (this.decorationsFArray[i] == 7) {
                    decorations.push(new door(Math.floor(i / this.y) * 10 - 10,(i % this.y) * 10 - 10,0));
                } else if (this.decorationsFArray[i] == 8) {
                    decorations.push(new door(Math.floor(i / this.y) * 10 - 10,(i % this.y) * 10 - 10,0,true));
                }
            }
            for (var i = 0; i < decorationsForeground.length; i++) {
                decorationsForeground[i].updateState();
            }
            for (var i = 0; i < decorations.length; i++) {
                decorations[i].updateState();
            }

            for (var i = 0; i < this.x / 7.5; i++) {
                for (var ix = 0; ix < this.y / 7.5; ix++) {
                    backgroundTiles.push( new backgroundTile(i * 75,ix * 75,0));
                }
            }
        }
    }
    
    this.draw = function () {
        for (var i = 0; i < this.rooms.length; i++) {
            this.rooms[i].draw();
        }
        c = gameArea.context;
        c.fillStyle = "rgb(255,0,0)";
        c.fillRect(player.x / 10 + 300,player.y / 10 - 5,5,5);
    }
}

function room(x,y,width,height,id) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
    this.start = false
    this.connected = false;
    this.distance = 0;
    this.found = false;
    this.explore = function () {
        if ((Math.abs(this.x - player.x / 10) < 8 || Math.abs(this.x + this.width - player.x / 10) < 8 || Math.abs(this.x + this.width / 2 - player.x / 10) < 8) && (Math.abs(this.y - player.y / 10) < 5 || Math.abs(this.y + this.height - player.y / 10) < 5 || Math.abs(this.y + this.height / 2 - player.y / 10) < 5)) {
            this.found = true;
        }
    }
    this.draw = function () {
        if (this.found) {
            c = hud.context;
            c.fillStyle = "rgb(100,0,0)";
            if (this.connected) {
                c.fillStyle = "rgb(255,255,255)"
            }
            c.save();
            c.translate((camera.x / 10) * percentW, (camera.y / 10) * percentW);
            c.fillRect((this.x + 1) * percentW + 108 * percentW,this.y * percentW + 68.5 * percentW,(this.width - 1) * percentW + 1,(this.height) * percentW + 1);
            c.restore();
        }
    }
    this.pushY = function (amount) {
        var collision,moveHappen = false;
        if (this.id == map.rooms.length - 1) {
            this.x = 200 - Math.floor(this.width / 2);
        }
        for (var i = 0; i < map.rooms.length; i++) {
            collision = true;
            if (this.id != i && this.id != map.rooms.length - 1) {
                while (collision == true) {
                    if(this.x < map.rooms[i].x + map.rooms[i].width - 3 && 
                        this.x + this.width > map.rooms[i].x + 3 &&
                        this.y < map.rooms[i].y + map.rooms[i].height && 
                        this.y + this.height > map.rooms[i].y) {
                        collision = true;
                        this.y += amount;
                        moveHappen = true;
                    } else {
                        collision = false;
                    }
                }
            }
        }
        return moveHappen;
    }
    this.center = function () {
        if (this.connected == false) {
            if (this.x + this.width / 2 > 200) {
                this.x -= 1;
            } else {
                this.x += 1;
            }
            for (var i = 0; i < map.rooms.length; i++) {
                if (this.id != i && this.id != map.rooms.length - 1) {
                    if( this.x <= map.rooms[i].x + map.rooms[i].width - 3 && 
                        this.x + this.width >= map.rooms[i].x + 3 &&
                        this.y <= map.rooms[i].y + map.rooms[i].height && 
                        this.y + this.height >= map.rooms[i].y && 
                        map.rooms[i].connected == true) {
                        if (this.distance > map.rooms[i].distance) {
                            this.distance = map.rooms[i].distance + 1;
                        }
                        this.trueDistance = this.distance + this.y / 4;
                        this.connected = true;
                        return true;
                    }
                }
            }
        }
        return false;
    }
    this.isConnected = function () {
        if (this.id == map.rooms.length - 1 && !this.connected) {
            this.connected = true;
            this.start = true;
            return true;
        }
        if (!this.connected) {
            for (var i = 0; i < map.rooms.length; i++) {
                if (this.id != i && this.id != map.rooms.length - 1) {
                    if( this.x <= map.rooms[i].x + map.rooms[i].width - 3 && 
                        this.x + this.width >= map.rooms[i].x + 3 &&
                        this.y <= map.rooms[i].y + map.rooms[i].height && 
                        this.y + this.height >= map.rooms[i].y && 
                        map.rooms[i].connected == true) {
                        if (this.distance > map.rooms[i].distance) {
                            this.distance = map.rooms[i].distance + 1;
                        }
                        this.trueDistance = this.distance + this.y / 4;
                        this.connected = true;
                        return true;
                    }
                }
            }
        }
        return false;
    }
}