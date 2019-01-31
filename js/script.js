var pressed = false;
var lastRandomElement = [];
var countElements = 5;
var switchInterval;
var speedSwitch = 100;
var waitBeforeNextGenre = 10000;
var shots = 7;

$(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    // enter or key 'a'
    if (keycode == 13 || keycode == 97) {
        // pressed enter
        if (pressed == false) {
            pressed = true;
            $(".bg").css("background-image", "none");
            switchInterval = setInterval(switchElements, speedSwitch);
            $(".bg").removeClass("active");
            setTimeout(randomGenre, waitBeforeNextGenre);
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
    $(".bg").eq(randomElement).addClass("active");

    var tmpImage = new Image();
    tmpImage.onload = function () {
        $(".bg").eq(randomElement).css("background-image", "url(" + $(".bg").eq(randomElement).attr('data-bg') + ")");
    }
    tmpImage.src = $(".bg").eq(randomElement).attr('data-bg');

    $(".bg").eq(randomElement).fadeOut(50);
    $(".bg").eq(randomElement).fadeIn(3000);
}

function checkRandomElement(length) {
    tmpRandom = Math.floor(Math.random() * length)
    // shots
    if (tmpRandom != shots) {
        if (lastRandomElement.indexOf(tmpRandom) != -1) {
            return checkRandomElement(length);
        }
        lastRandomElement.push(tmpRandom);
        if (lastRandomElement.length > countElements) {
            lastRandomElement.shift();
        }
    }
    return tmpRandom;
}
