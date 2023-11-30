var SPRITESHEETURL = [
  "sprites/human-skinA-stanceA-idle.png",
  "sprites/human-skinA-stanceA-punchA.png",
  "sprites/human-skinA-stanceA-1handA.png",
  "sprites/buttons.png",
  "sprites/human-skinA-stanceA-dashA.png",
  "sprites/human-skinA-stanceA-dashB.png",
  "sprites/dungeon.png",
  "sprites/playerShadow.png",
  "sprites/rat.png"
]
var SPRITESHEETS = []

var sprites = {
  Player : [
    {
      name : "skin-tone 1",
      idle : {
        src : 0,
        loop : true,
        frames : [
          {
            x : 0,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
          {
            x : 0,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
          {
            x : 39,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
          {
            x : 39,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
          {
            x : 78,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {
            x : 78,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {
            x : 117,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {
            x : 117,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {
            x : 156,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
          {
            x : 156,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
          {
            x : 195,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
          {
            x : 195,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
          {
            x : 234,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
          {
            x : 234,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
          {
            x : 273,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {
            x : 273,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {
            x : 312,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {
            x : 312,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {
            x : 351,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
          {
            x : 351,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : 0
          },
        ]
      },
      punch : {
        src : 1,
        loop : false,
        frames : [
          {//0
            x : 0,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//0
            x : 0,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//1
            x : 39,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//1
            x : 39,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//2
            x : 78,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//2
            x : 78,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//3
            x : 117,
            y : 0,
            w : 39,
            h : 66,
            pushX : -1,
            pushY : -1
          },
          {//3
            x : 117,
            y : 0,
            w : 39,
            h : 66,
            pushX : -1,
            pushY : -1
          },
          {//4
            x : 157,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//4
            x : 157,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//5
            x : 196,
            y : 0,
            w : 40,
            h : 66,
            pushX : -1,
            pushY : -1
          },
          {//5
            x : 196,
            y : 0,
            w : 40,
            h : 66,
            pushX : -1,
            pushY : -1
          },
          {//6
            x : 236,
            y : 0,
            w : 40,
            h : 66,
            pushX : -1,
            pushY : -1
          },
          {//6
            x : 236,
            y : 0,
            w : 40,
            h : 66,
            pushX : -1,
            pushY : -1
          },
          {//7
            x : 276,
            y : 0,
            w : 40,
            h : 66,
            pushX : -1,
            pushY : -1
          },
          {//7
            x : 276,
            y : 0,
            w : 40,
            h : 66,
            pushX : -1,
            pushY : -1
          },
          //empty
          {//9
            x : 363,
            y : 0,
            w : 47,
            h : 66,
            pushX : 3,
            pushY : -1
          },
          {//9
            x : 363,
            y : 0,
            w : 47,
            h : 66,
            pushX : 3,
            pushY : -1
          },
          {//10
            x : 410,
            y : 0,
            w : 47,
            h : 66,
            pushX : 3,
            pushY : -1
          },
          {//10
            x : 410,
            y : 0,
            w : 47,
            h : 66,
            pushX : 3,
            pushY : -1
          },
          {//11
            x : 463,
            y : 0,
            w : 58,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//11
            x : 463,
            y : 0,
            w : 58,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//12
            x : 521,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//12
            x : 521,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//13
            x : 560,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//13
            x : 560,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//14
            x : 599,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
        ]
      },
      oneHandLight : {
        src : 2,
        loop : false,
        frames : [
          {//0
            x : 0,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//1
            x : 39,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//2
            x : 78,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//3
            x : 117,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//4
            x : 156,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//5
            x : 195,
            y : 0,
            w : 39,
            h : 67,
            pushX : 0,
            pushY : -2
          },
          {//6
            x : 234,
            y : 0,
            w : 39,
            h : 67,
            pushX : 0,
            pushY : -2
          },
          {//7
            x : 273,
            y : 0,
            w : 56,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//8
            x : 329,
            y : 0,
            w : 58,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//9
            x : 387,
            y : 0,
            w : 62,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//10
            x : 449,
            y : 0,
            w : 60,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//11
            x : 509,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//12
            x : 548,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//13
            x : 587,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//14
            x : 626,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//15
            x : 665,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
        ]
      },
      dashRight : {
        src : 4,
        loop : false,
        frames : [
          {//0
            x : 0,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//1
            x : 39,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//2
            x : 78,
            y : 0,
            w : 43,
            h : 65,
            pushX : -4,
            pushY : -1
          },
          {//3
            x : 121,
            y : 0,
            w : 43,
            h : 65,
            pushX : -4,
            pushY : -1
          },
          {//4
            x : 164,
            y : 0,
            w : 43,
            h : 65,
            pushX : -3,
            pushY : -1
          },
          {//5
            x : 207,
            y : 0,
            w : 43,
            h : 65,
            pushX : -3,
            pushY : -1
          },
          {//6
            x : 250,
            y : 0,
            w : 43,
            h : 65,
            pushX : -3,
            pushY : -1
          },
          {//7
            x : 293,
            y : 0,
            w : 42,
            h : 65,
            pushX : -3,
            pushY : -1
          },
          {//8
            x : 335,
            y : 0,
            w : 43,
            h : 65,
            pushX : -3,
            pushY : -1
          },
          {//9
            x : 378,
            y : 0,
            w : 43,
            h : 65,
            pushX : -2,
            pushY : -1
          },
        ],
      },
      dashLeft : {
        src : 5,
        loop : false,
        frames : [
          {//0
            x : 0,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
          {//1
            x : 39,
            y : 0,
            w : 39,
            h : 65,
            pushX : 0,
            pushY : -1
          },
          {//2
            x : 78,
            y : 0,
            w : 41,
            h : 65,
            pushX : 0,
            pushY : -1
          },
          {//3
            x : 119,
            y : 0,
            w : 39,
            h : 63,
            pushX : 0,
            pushY : -1
          },
          {//4
            x : 158,
            y : 0,
            w : 41,
            h : 63,
            pushX : 0,
            pushY : -1
          },
          {//5
            x : 199,
            y : 0,
            w : 43,
            h : 63,
            pushX : 0,
            pushY : -1
          },
          {//6
            x : 242,
            y : 0,
            w : 39,
            h : 63,
            pushX : 0,
            pushY : -1
          },
          {//7
            x : 281,
            y : 0,
            w : 41,
            h : 65,
            pushX : 0,
            pushY : -1
          },
          {//8
            x : 322,
            y : 0,
            w : 38,
            h : 64,
            pushX : 0,
            pushY : -1
          },
          {//9
            x : 360,
            y : 0,
            w : 39,
            h : 66,
            pushX : 0,
            pushY : -1
          },
        ]
      },
      shadow : {
        src : 7,
        x : 0,
        y : 0,
        w : 48,
        h : 16
      }
    },
    
    {
      name : "skin-tone 2",
    },
    
    {
      name : "skin-tone 3",
    },
  ],
  Buttons : [
    {
      name : "buttonFrame",
      src : 3,
      frames : [
        {
          x : 0,
          y : 0,
          w : 16,
          h : 16
        }
      ]
    },
    {
      name : "buttonFrameSelected",
      src : 3,
      frames : [
        {
          x : 0,
          y : 16,
          w : 16,
          h : 16
        }
      ]
    },
    {
      name : "buttonDashRight",
      src : 3,
      frames : [
        {
          x : 16,
          y : 0,
          w : 16,
          h : 16
        }
      ]
    },
    {
      name : "buttonDashLeft",
      src : 3,
      frames : [
        {
          x : 32,
          y : 0,
          w : 16,
          h : 16
        }
      ]
    },
    {
      name : "buttonPunch",
      src : 3,
      frames : [
        {
          x : 48,
          y : 0,
          w : 16,
          h : 16
        }
      ]
    },
    {
      name : "buttonStrike",
      src : 3,
      frames : [
        {
          x : 64,
          y : 0,
          w : 16,
          h : 16
        }
      ]
    }
  ],
  Enemies : {
    rat : {
      name : "rat",
      idle : {
        src : 8,
        loop : false,
        frames : [
          {//0
            x : 0,
            y : 0,
            w : 39,
            h : 12,
            pushX : 0,
          },
          {//1
            x : 39,
            y : 0,
            w : 42,
            h : 12,
            pushX : 0,
          },
          {//2
            x : 81,
            y : 0,
            w : 44,
            h : 12,
            pushX : 0,
          },
          {//3
            x : 125,
            y : 0,
            w : 41,
            h : 13,
            pushX : 0,
          },
          {//4
            x : 166,
            y : 0,
            w : 42,
            h : 13,
            pushX : 0,
          },
          {//5
            x : 208,
            y : 0,
            w : 44,
            h : 13,
            pushX : 0,
          },
          {//6
            x : 252,
            y : 0,
            w : 43,
            h : 14,
            pushX : 0,
          },
          {//7
            x : 295,
            y : 0,
            w : 44,
            h : 12,
            pushX : 0,
          },
          {//8
            x : 339,
            y : 0,
            w : 44,
            h : 12,
            pushX : 0,
          },
        ]
      }
    }
  },
  Backgrounds : {
    dungeon : {
      src : 6,
      frames : [
        {
          x : 0,
          y : 0,
          w : 400,
          h : 225
        }
      ]
    }
  }
}

var SPRITES = [];
for (var i = 0; i < SPRITESHEETURL.length; i++) {
  var sprite = new Image();
  sprite.src = SPRITESHEETURL[i];
  SPRITESHEETS.push(sprite);
}