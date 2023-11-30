var trees = [
    {
        name: "Oak",
        cp: 5,
        sp: 2,
        dp: 8,
        taste: "Bitter",
        image: "img/oak.png",
        comment: "A bit unconventional, but still an original and decently good choice."
    },
    {
        name: "Birch",
        cp: 6,
        sp: 2,
        dp: 9,
        taste: "Umami",
        image: "img/birch.png",
        comment: "Very alike to it's oak brother, yet it possesses just a little more christmas thanks to its white regal colour."
    },
    {
        name: "Spruce",
        cp: 8,
        sp: 9,
        dp: 7,
        taste: "Salty",
        image: "img/spruce.png",
        comment: "A very safe and popular choice. This tree might be a little lacking in interesting places to put decorations, however it more than makes up for it by emphazising the star due to its shape."
    },
    {
        name: "Maple",
        cp: 6,
        sp: 2,
        dp: 10,
        taste: "Sweet",
        image: "img/maple.png",
        comment: "This one can be little bit tricky, but if you are able to have christmas at the exact time this tree turns its trademark christmas red you will have an amazing christmas tree."
    },
    {
        name: "Palm",
        cp: 5,
        sp: 8,
        dp: 2,
        taste: "Sour",
        image: "img/palm.png",
        comment: "With this unconvential choice, you will definetely have an original christmas tree. It has a very decent place to put a star, however it gives you very little space to put other decorations."
    },
    {
        name: "Sakura",
        cp: 8,
        sp: 3,
        dp: 9,
        taste: "Sweet",
        image: "img/sakura.png",
        comment: "A tree with a very prominent pink color. It might limit your creative freedom, but if utilized correctly it will definetely become quite eye-catching."
    },
    {
        name: "Dandelion",
        cp: 5,
        sp: 10,
        dp: 1,
        taste: "Bitter",
        image: "img/dandelion.png",
        comment: "If you need a modest christmas tree, this is the tree for you. It is very budget friendly too, as it has its own natural star."
    },
    {
        name: "Minecraft",
        cp: 8,
        sp: 8,
        dp: 8,
        taste: "Sour",
        image: "img/minecraft.png",
        comment: "A very minimalistically designed tree, perfect if you are trying to achieve a more modern christmas look."
    },
    {
        name: "Knerten",
        cp: 9,
        sp: 9,
        dp: 9,
        taste: "Don't eat",
        image: "img/knerten.png",
        comment: "If you are lucky enough to have this handome boy as your christmas tree, your christmas will definetely be a banger."
    },
    {
        name: "Firewood",
        cp: 2,
        sp: 1,
        dp: 3,
        taste: "Sour",
        image: "img/firewood.png",
        comment: "Not only does this tree require more work to aquire, it is also miles benath almost any other tree in terms of quality."
    },
    {
        name: "Stick",
        cp: 4,
        sp: 5,
        dp: 3,
        taste: "Umami",
        image: "img/stick.png",
        comment: "I suppose this one will do in a pinch. Economically speaking it is good value, but don't bother with this one if you can afford it."
    },
    {
        name: "Bookshelf",
        cp: 6,
        sp: 2,
        dp: 10,
        taste: "Bitter",
        image: "img/bookshelf.png",
        comment: "This tree is suited for those who find the more common trees to be too unorganized. This one has a clean and open space for decorations, but good luck finding a good place for that star."
    },
    {
        name: "Coat hanger",
        cp: 6,
        sp: 10,
        dp: 2,
        taste: "Salty",
        image: "img/coathanger.png",
        comment: "The polar opposite of its bookshelf counterpart, this coat hanger is great for people who only care about the star."
    },
    {
        name: "Cactus",
        cp: 9,
        sp: 9,
        dp: 9,
        taste: "Pain",
        image: "img/cactus.png",
        comment: "If you have a lively house and need to keep little Timmy from knocking over the christmas tree, this is the choice for you. He will think twice about running into this one."
    },
]

var currentTree = 0;
function TreeDisplay() {
    document.getElementById("name").innerHTML = trees[currentTree].name;
    document.getElementById("christmas").innerHTML = trees[currentTree].cp + "/10";
    document.getElementById("star").innerHTML = trees[currentTree].sp + "/10";
    document.getElementById("decoration").innerHTML = trees[currentTree].dp + "/10";
    document.getElementById("taste").innerHTML = trees[currentTree].taste;
    document.getElementById("treeQuote").innerHTML = trees[currentTree].comment;
    document.getElementById("treeImage").style.backgroundImage = "url(" + trees[currentTree].image + ")";
}

function TreeCycle(amount) {
    currentTree += amount;
    if (currentTree < 0) {
        currentTree = trees.length - 1;
    } else if (currentTree >= trees.length) {
        currentTree = 0;
    }
    TreeDisplay();
}

TreeDisplay();