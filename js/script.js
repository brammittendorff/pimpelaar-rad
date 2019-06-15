var pressed = false;
var lastRandomElement = [];
var shotsFired = false;
var countElements = 5;
var switchInterval;
var waitForSeconds = 30;
var totalCount = waitForSeconds;
var speedSwitch = 100;
var waitBeforeNextGenre = 10000;
var shots = 7;

$(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    // enter or key 'a'
    if (keycode == 13 || keycode == 97) {
        if ((pressed == false && totalCount >= waitForSeconds) || (shotsFired && pressed == false)) {
            totalCount = 0;
            clearInterval(runCounter);
            switchTotalCounter = setInterval(runCounter, 1000);
            pressed = true;
            $(".bg").css("background-image", "none");
            switchInterval = setInterval(switchElements, speedSwitch);
            $(".bg").removeClass("active");
            setTimeout(randomGenre, waitBeforeNextGenre);
        }
    }
});

var runCounter = function() {
    totalCount++;
}

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
    if (randomElement == shots) {
        shotsFired = true;
    } else {
        shotsFired = false;
    }
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
