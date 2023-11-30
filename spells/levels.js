var levelCurrent = 0, floorCurrent = 1;

var levels = [
    {
        name: "abandoned prison",
        floors: [
            [rooms[0]],
            [false,20,30,[0],0.98,1,1],
            [false,40,50,[0],0.97,1,1],
            [false,50,60,[0,1],0.97,0.95,4],
            [false,60,70,[0,1],0.96,0.95,5],
            [false,60,80,[0,1,2],0.96,0.95,5],
            [false,80,100,[0,1,2],0.96,0.95,5],
            [false,80,100,[0,1,2],0.96,0.94,5],
            [false,80,100,[0,1,2],0.96,0.94,5],
            [false,80,100,[0,1,2],0.96,0.94,5],
        ],
        cleared: false,
    },
]