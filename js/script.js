var pressed = false;
var lastRandomElement = [];
var countElements = 5;

$(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == 13) {
        // pressed enter
        if (pressed == false) {
            pressed = true;
            setTimeout(randomGenre, 500);
        }
    }
});

var randomGenre = function() {
    $(".bg").removeClass("active");
    randomElement = checkRandomElement($(".bg").length);
    $(".bg").eq(randomElement).addClass('active');
    pressed = false;
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