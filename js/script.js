var pressed = false;
var lastRandomElement = [];
var countElements = 5;
var switchInterval;

$(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == 13) {
        // pressed enter
        if (pressed == false) {
            pressed = true;
            switchInterval = setInterval(switchElements, 220);
            setTimeout(randomGenre, 5000);
        }
    }
});

var switchElements = function() {
    if (pressed == true) {
        $(".bg").removeClass("active");
        $(".bg").eq(Math.floor(Math.random() * $(".bg").length)).addClass("active");
    } else {
        clearInterval(switchInterval);
    }
}

var randomGenre = function() {
    pressed = false;
    $(".bg").removeClass("active");
    randomElement = checkRandomElement($(".bg").length);
    $(".bg").eq(randomElement).fadeIn(3000);
    $(".bg").eq(randomElement).addClass("active");
}

function checkRandomElement(length) {
    tmpRandom = Math.floor(Math.random() * length)
    if (lastRandomElement.indexOf(tmpRandom) != -1) {
        return checkRandomElement(length);
    }
    lastRandomElement.push(tmpRandom);
    if (lastRandomElement.length > countElements) {
        lastRandomElement.shift();
    }
    return tmpRandom;
}