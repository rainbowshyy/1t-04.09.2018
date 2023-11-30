var width = window.innerWidth;

function handToCursor(e) {
    e = window.event || e;
    var mouseX = e.clientX, mouseY = e .clientY;

    document.getElementById("windowHand").style.transform = "translate(-40%, -20%)";
    document.getElementById("windowHand").style.left = mouseX + "px";
    document.getElementById("windowHand").style.top = mouseY + "px";
}