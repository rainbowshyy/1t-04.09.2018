var windowLast = "";
function windowOpen(windowType) {
    if (windowType != windowLast) {
        if (windowType != 0) {
            var windowCurrent = document.getElementById(windowType);
            windowType.classList.toggle("windowOpen");
            windowType.classList.toggle("hoverThing");
            windowType.children[1].classList.toggle("hidden");
            windowType.children[2].classList.toggle("hidden");
            if (windowLast != windowType && windowLast != "") {
                windowLast.classList.toggle("windowOpen");
                windowLast.classList.toggle("hoverThing");
                windowLast.children[1].classList.toggle("hidden");
                windowLast.children[2].classList.toggle("hidden");
            }
            if (windowLast == windowType) {
                windowLast = "";
            } else {
                windowLast = windowType;
            }
        } else {
            if (windowLast != "") {
                windowLast.classList.toggle("windowOpen");
                windowLast.classList.toggle("hoverThing");
                windowLast.children[1].classList.toggle("hidden");
                windowLast.children[2].classList.toggle("hidden");
                windowLast = "";
            }
        }
    }
}