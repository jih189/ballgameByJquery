var w = $(Document).width();
var h = $(Document).height();
var movex = 2;
var movey = 3;
var x = 0;
var y = 0;
var movex2 = 3;
var movey2 = 2;
var x2 = 200;
var y2 = 0;
var ball1 = $("#ball1");
var ball2 = $("#ball2");
var racket = $("#racket");
var score = $("#score");
var dropball = $("#drop");
var rx = w / 2;
var ry = h - racket.height();
var grade = 0;

var instr = null;
var instl = null;

$(document).ready(function () {
    racket.css({ "left": rx + "px", "top": ry + "px" });
    setInterval("Run()", 1);
    setInterval("drop()", 20);
});

$(document).keypress(function (e) {
    if (instr == null && e.which == 100) {
        instr = window.setInterval("moveright()", 30);
        //moveright();

    } else if (instl == null && e.which == 97) {
        instl = window.setInterval("moveleft()", 30);
        //moveleft();
    }
});

$(document).keyup(function (e) {

    window.clearInterval(instr);
    window.clearInterval(instl);
    instr = null;
    instl = null;
});

function moveright() {
    if (rx < w - racket.width()) {
        rx += 30;
        racket.css({ "left": rx + "px", "top": ry + "px" });
    }
}
function moveleft() {
    if (rx > 0) {
        rx -= 30;
        racket.css({ "left": rx + "px", "top": ry + "px" });
    }
}
var dropx = Math.random() * (w - ball1.width());
var dropy = 0;
var dropspeed = 5;

function drop() {
    dropball.css({ "left": dropx + "px", "top": dropy + "px" });
    if (dropy > (ry - dropball.height())) {
        if (((dropx + dropball.width()) > rx) && (dropx < (rx + racket.width()))) {
            var racketSize = racket.width();
            if (racketSize < 300) {
                racket.css({ "width": (racketSize + 20) + "px" });
            }
        }
        else {
            var racketSize = racket.width();
            if (racketSize > 100) {
                racket.css({ "width": (racketSize - 20) + "px" });
            }
        }
        dropx = Math.random() * (w - ball1.width());
        dropy = 0;
    }
    dropy += dropspeed;
}

function Run() {
    ball1.css({ "left": x + "px", "top": y + "px" });
    ball2.css({ "left": x2 + "px", "top": y2 + "px" });

    if (x > (w - ball1.width()) || x < 0)
        movex = -movex;
    if (y < 0)
        movey = -movey;
    if (x2 > (w - ball2.width()) || x2 < 0)
        movex2 = -movex2;
    if (y2 > (h - ball2.height()) || y2 < 0)
        movey2 = -movey2;

    if (((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)) < (65 * 65)) {
        var tempx = movex2;
        var tempy = movey2;
        movex2 = movex;
        movey2 = movey;
        movex = tempx;
        movey = tempy;
    }

    if (y > (h - ball1.height())) {
        score.html("your score is " + grade + "!");
        movex = 0;
        movey = 0;
        dropspeed = 0;
        movex2 = 0;
        movey2 = 0;
    }

    if ((y > (ry - ball1.height())) && ((x + ball1.width()) > rx) && (x < (rx + racket.width()))) {
        if (movey > 0) {
            movey = -movey;
            grade++;
            console.log(grade);
            score.html("score: " + grade);
        }
    }

    x += movex;
    y += movey;
    x2 += movex2;
    y2 += movey2;
}
