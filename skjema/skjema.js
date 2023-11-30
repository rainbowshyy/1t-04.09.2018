function submitForm() {
    
    
    alert("hah");
}

var birthDate = new Date(0);

function changeDate(amount) {
    birthDate.setDate(birthDate.getDate() + amount);
    document.getElementById("birthDate").innerHTML = birthDate.toDateString();
}

var active = 0
function createLetter(letter) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = mouseY + "px";
    div.style.left = mouseX + "px";
    div.innerHTML = letter;
    div.style.color = "rgb(250,250,250)";
    div.classList.add("active");
    div.style.cursor = "grab"
    active = 1;
    document.getElementById("letters").appendChild(div);
}

var mouseX, mouseY;
function cursor(e) {
    e = window.event || e;
    mouseX = e.clientX; 
    mouseY = e .clientY;
    updateLetter();
}
;
var letters = [];
function clearActive() {
    if (active == 1) {
        document.getElementsByClassName("active")[0].classList.remove("active");
    }
}

function updateLetter() {
    if (active == 1) {
        document.getElementsByClassName("active")[0].style.top = mouseY + "px";
        document.getElementsByClassName("active")[0].style.left = mouseX + "px";
    }
}

var lastX = 0, lastY = 0;
function submitHover() {
    var button = document.getElementById("submit");
    button.style.bottom = Math.random * 100 + "px";
    var negative = 1;
    if (Math.random() < 0.5) {
        negative = -1;
    }
    
    var randomY, randomX, no = 1;
    while(no == 1) {
        randomY = Math.random() * 60 * negative;
        randomX = Math.random() * 400;
        if (Math.abs(lastX-randomX)+Math.abs(lastY-randomY) > 100) {
            no = 0;
        }
    }
    lastX = randomX;
    lastY = randomY;
    
    button.style.top = randomY + "px";
    button.style.left = randomX + "px";
}

var sliderActive = 0;
var slider = document.getElementById("gender");
var sliderSpeed = 0;
function sliderRelease() {
    if (slider.value > 1) {
        sliderActive = 1;
    }
}

function updateSlider() {
    if (sliderActive == 1) {
        sliderSpeed += 1;
        slider.value -= sliderSpeed;
        if (slider.value < 10) {
            sliderSpeed = 0;
            slider.value = 1;
            sliderActive = 0;
        }
    }
}

setInterval(updateSlider,20);