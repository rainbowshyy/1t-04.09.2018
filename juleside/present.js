var presents = [
    "img/gnome.png",
    "img/gardengnome.png",
    "img/eldergnome.png",
    "img/surfergnome.png",
    "img/fork.png",
    "img/penicl.png",
    "img/shoe.png",
    "img/door.png",
    "img/frog.png",
    "img/banana.png",
    "img/croc.png",
    "img/clock.png",
    "img/hammer.png"
]

var wow = [
    "Wow! So lucky!",
    "I wish I was you right now!",
    "Merry christmas!",
    "That's a present alright.",
    "Lucky!",
    "That's hot!",
    "What a present!",
    "I want a present like that!",
    "What a nice present!",
    "Lucky you!",
    "I love you.",
    "Hope you like it.",
    "I found this in the garbage.",
    "I worked very hard on this."
]

function openPresent() {
    document.getElementById("present").style.pointerEvents = "none"
    document.getElementById("spookText").style.opacity = 0;
    document.getElementById("presentBox").style.top = "15%";
    document.getElementById("presentCover").style.top = "0px";
    setTimeout(function(){document.getElementById("present").style.opacity = 0;},1000);
    setTimeout(function(){
        document.getElementById("spookText").style.opacity = 1;
        document.getElementById("presentContent").style.backgroundImage = "url(" + presents[Math.floor(Math.random() * presents.length)] + ")";
        document.getElementById("presentContent").style.opacity = 1;
        document.getElementById("spookText").innerHTML = wow[Math.floor(Math.random() * wow.length)];
        document.getElementById("presentBox").style.top = "10%";
        document.getElementById("presentCover").style.top = "15%";
    },2000);
    setTimeout(function(){
        document.getElementById("spookText").style.opacity = 0;
         document.getElementById("presentContent").style.opacity = 0;
    },5000);
    setTimeout(function(){
        document.getElementById("spookText").style.opacity = 1;
        document.getElementById("spookText").innerHTML = "What's in the box...?";
        document.getElementById("present").style.pointerEvents = ""
        document.getElementById("present").style.opacity = 1;
    },6000)
}