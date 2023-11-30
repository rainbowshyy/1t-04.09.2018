var tileId = [
    {
        name: "block",
        color: "rgb(0,255,0)",
        height: 1,
        sprite: "sprites/stone_brick.png",
        damage: 0,
        updateState: function (index) {
            var state;
            if (map.mapArray[index - 1] == 0 && map.mapArray[index - map.y] == 1 && map.mapArray[index + map.y] == 1 && map.mapArray[index + 1] == 1) {
                state = 1; // ground
            } else if (map.mapArray[index - 1] == 0 && map.mapArray[index - map.y] == 1 && map.mapArray[index + map.y] == 1 && map.mapArray[index + 1] != 1) {
                state = 2; //ground and ceil
            } else if (map.mapArray[index - 1] == 0 && map.mapArray[index - map.y] == 1 && map.mapArray[index + map.y] != 1 && map.mapArray[index + 1] != 1) {
                state = 3; //ground and ceil and wall on right
            } else if (map.mapArray[index - 1] == 0 && map.mapArray[index - map.y] != 1 && map.mapArray[index + map.y] == 1 && map.mapArray[index + 1] != 1) {
                state = 4; //ground and ceil and wall on left
            } else if (map.mapArray[index - 1] != 1 && map.mapArray[index - map.y] != 1 && map.mapArray[index + map.y] != 1 && map.mapArray[index + 1] != 1) {
                state = 5; //single block
            } else if (map.mapArray[index - 1] == 0 && map.mapArray[index - map.y] == 1 && map.mapArray[index + map.y] != 1 && map.mapArray[index + 1] == 1) {
                state = 6; //ground and wall on right
            } else if (map.mapArray[index - 1] == 0 && map.mapArray[index - map.y] != 1 && map.mapArray[index + map.y] == 1 && map.mapArray[index + 1] == 1) {
                state = 7; //ground and wall on left
            } else if (map.mapArray[index - 1] == 0 && map.mapArray[index - map.y] != 1 && map.mapArray[index + map.y] != 1 && map.mapArray[index + 1] == 1) {
                state = 8; //ground and wall on both
            } else if (map.mapArray[index - 1] == 1 && map.mapArray[index - map.y] == 1 && map.mapArray[index + map.y] == 0 && map.mapArray[index + 1] == 1) {
                state = 9; //wall on right
            } else if (map.mapArray[index - 1] == 1 && map.mapArray[index - map.y] == 0 && map.mapArray[index + map.y] == 1 && map.mapArray[index + 1] == 1) {
                state = 10; //wall on left
            } else if (map.mapArray[index - 1] == 1 && map.mapArray[index - map.y] == 0 && map.mapArray[index + map.y] == 0 && map.mapArray[index + 1] == 1) {
                state = 11; //wall on both
            } else if (map.mapArray[index - 1] == 1 && map.mapArray[index - map.y] == 1 && map.mapArray[index + map.y] == 1 && map.mapArray[index + 1] != 1) {
                state = 12; //ceil
            } else if (map.mapArray[index - 1] == 1 && map.mapArray[index - map.y] == 1 && map.mapArray[index + map.y] != 1 && map.mapArray[index + 1] != 1) {
                state = 13; //ceil and wall on right
            } else if (map.mapArray[index - 1] == 1 && map.mapArray[index - map.y] != 1 && map.mapArray[index + map.y] == 1 && map.mapArray[index + 1] != 1) {
                state = 14; //ceil and wall on left
            } else if (map.mapArray[index - 1] == 1 && map.mapArray[index - map.y] != 1 && map.mapArray[index + map.y] != 1 && map.mapArray[index + 1] != 1) {
                state = 15; //ceil and wall on both
            } else {
                state = 0;
            }
            return state;
        }
    },
    {
        name: "spikes",
        color: "rgb(200,60,0)",
        height: 0.9,
        sprite: "sprites/spikes.png",
        damage: 1,
        updateState: function (index) {
            var state;
            if (map.mapArray[index - 1] != 1 && map.mapArray[index - map.y] != 1 && map.mapArray[index + map.y] == 1 && map.mapArray[index + 1] == 1) {
                state = 1; // wall on right
            } else if (map.mapArray[index - 1] != 1 && map.mapArray[index - map.y] == 1 && map.mapArray[index + map.y] != 1 && map.mapArray[index + 1] == 1) {
                state = 2; // wall on right
            } else {
                state = 0;
            }
            return state;
        }
    },
    {
        name: "platform",
        color: "rgb(200,60,0)",
        height: 1,
        sprite: "sprites/platform.png",
        damage: 0,
        updateState: function (index) {
            var state;
            if (map.mapArray[index - map.y] == 3 && map.mapArray[index + map.y] == 3) {
                state = 0; // wall on right
            } else if (map.mapArray[index - map.y] == 3 && map.mapArray[index + map.y] != 3) {
                state = 1; // wall on right
            } else if (map.mapArray[index - map.y] != 3 && map.mapArray[index + map.y] == 3) {
                state = 2; // wall on right
            } else {
                state = 0;
            }
            return state;
        }
    }
]

var decorationId = [
    {
        name: "cobweb",
        height: 1,
        sprite: "sprites/cobweb.png",
        spriteWidth: 8,
        spriteHeight: 8,
        variatons: 6,
        stages: 0,
        updateState: function (index) {
            return 0;
        },
        update: function (stage) {
            return stage;
        }
    },
    {
        name: "chain",
        height: 2,
        sprite: "sprites/chain.png",
        spriteWidth: 8,
        spriteHeight: 16,
        variatons: 4,
        stages: 0,
        updateState: function (index) {
            return 0;
        },
        update: function (stage) {
            return stage;
        }
    },
    {
        name: "fire",
        height: 2,
        sprite: "sprites/fire.png",
        spriteWidth: 8,
        spriteHeight: 16,
        variatons: 1,
        stages: 7,
        updateState: function (index) {
            return 0;
        },
        update: function (count,stage,stages) {
            var updateCount = count;
            updateCount += 1;
            if (updateCount >= 5) {
                if (stage >= stages) {
                    return [0,0];
                } else {
                    return [0,stage + 1];
                }
            } else {
                return [updateCount,stage];
            }
        },
        light: function(x,y) {
            var image = new Image();
            image.src = "sprites/fire_light1.png";
            return new lightsource(0.8,1,true,x-115,y-115,230,230,image);
        }
    },
    {
        name: "hanging fire",
        height: 1,
        sprite: "sprites/hanging_lamp.png",
        spriteWidth: 8,
        spriteHeight: 8,
        variatons: 1,
        stages: 0,
        updateState: function (index) {
            return 0;
        },
        update: function (stage) {
            return [0,0];
        }
    },
    {
        name: "standing torch",
        height: 2,
        sprite: "sprites/standing_torch1.png",
        spriteWidth: 8,
        spriteHeight: 16,
        variatons: 1,
        stages: 4,
        updateState: function (index) {
            return 0;
        },
        update: function (count,stage,stages) {
            var updateCount = count;
            updateCount += 1;
            if (updateCount >= 5) {
                if (stage >= stages) {
                    return [0,0];
                } else {
                    return [0,stage + 1];
                }
            } else {
                return [updateCount,stage];
            }
        },
        light: function(x,y) {
            var image = new Image();
            image.src = "sprites/fire_light2.png";
            return new lightsource(0.8,1,true,x-45,y-45,90,90,image);
        }
    },
    {
        name: "bones",
        height: 1,
        sprite: "sprites/bones1.png",
        spriteWidth: 8,
        spriteHeight: 8,
        variatons: 6,
        stages: 0,
        updateState: function (index) {
            return 0;
        },
        update: function (count,stage,stages) {
            return [0,0];
        },
    },
]