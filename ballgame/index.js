var w = $(Document).width();
var h = $(Document).height();
var movex = 2;
var movey = 3;
var x = 0;
var y = 0;
var ball1 = $("#ball1");
var racket = $("#racket");
var score = $("#score");
var rx = w / 2;
var ry = h - racket.height();
var tempx = 0;
var tempy = 0;
var grade = 0;
var instr = null;
var instl = null;
$(document).ready(function () {
    racket.css({ "left": rx + "px", "top": ry + "px" });
    setInterval("Run()", 5);
});

$(document).keypress(function (e) {
    if (instr == null && e.which == 100) {
        instr = window.setInterval("moveright()", 50);
        //moveright();

    } else if (instl == null && e.which == 97) {
        instl = window.setInterval("moveleft()", 50);
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

function Run() {
    ball1.css({ "left": x + "px", "top": y + "px" });
    if (x > (w - ball1.width()) || x < 0)
        movex = -movex;
    if (y < 0)
        movey = -movey;

    if (y > (h - ball1.height())) {
        score.html("your score is " + grade + "!");
        movex = 0;
        movey = 0;
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
}
