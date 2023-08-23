function key(event) {
    var k = event.which;
    // alert(k);
    if (k == 16) {
        if (runWorker == 0) {
            clearInterval(idleWorker);
            runWorker = setInterval(run, 100);
            backgroundWorker = setInterval(bgmove, 100);
            runSound.play();
            scoreWorker = setInterval(score, 100);
            trapId = trapes();
            trapWorker = setInterval(trapMove, 100);
        }
    }
    if (k == 32) {
        if (jumpWorker == 0) {
            runSound.pause();            
            clearInterval(runWorker);
            jumpWorker = setInterval(jump, 140);
            runWorker = 0;
            jumpSound.play();
            
        }
    }
}

var runSound = new Audio("run.mp3");
var jumpSound = new Audio("jump.mp3");
jumpSound.volume=0.5;

function start(){
    document.getElementById("background").style.backgroundImage = "url('ACC.jpeg')";
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("scoreBoard").style.visibility = "visible";
    document.getElementById("setting").style.visibility = "hidden";
    document.getElementById("instruction").style.visibility = "hidden";
    document.getElementById("background").style.backgroundPositionY = "-350px";
    document.getElementById("boy").style.visibility = "visible";
    document.getElementById("scoreText").style.visibility = "visible";
    idleWorker = setInterval(idle, 100);
}

var idleImage = 1;
var idleWorker = 0;

function idle() {
    idleImage = idleImage + 1;
    if (idleImage == 11) {
        idleImage = 1;
    }
    document.getElementById("boy").src = "Idle (" + idleImage + ").png";
}

var runImage = 1;
var runWorker = 0;

function run() {
    runImage = runImage + 1;
    if (runImage == 9) {
        runImage = 1;
    }
    document.getElementById("boy").src = "Run (" + runImage + ").png";
}

var backgroundWorker = 0;
var bgpixel = 0;

function bgmove() {
    bgpixel = bgpixel -20;
    document.getElementById("background").style.backgroundPositionX = bgpixel + "px";
}

var jumpImage = 1;
var jumpWorker = 0;
var jumpheight = 370;

function jump() {
    jumpImage = jumpImage + 1;
    if (jumpImage == 13) {
        jumpImage = 1;
        runSound.play();
        clearInterval(jumpWorker);
        jumpWorker = 0;
        runWorker = setInterval(run, 100);
    }
    if (jumpImage <= 6) {
        jumpheight = jumpheight - 30;
        document.getElementById("boy").style.marginTop = jumpheight + "px";
    }
    else {
        jumpheight = jumpheight + 30;
        document.getElementById("boy").style.marginTop = jumpheight + "px";
    }
    document.getElementById("boy").src = "Jump (" + jumpImage + ").png";
}

var scorecount = 0;
var scoreWorker = 0;

function score() {
    scorecount = scorecount + 5;
    document.getElementById("scoreText").innerHTML = scorecount;
    if (scorecount == 3100) {
        win();
    }
}

function instruction() {
    document.getElementById("ins").style.visibility = "visible";
    document.getElementById("ok").style.visibility = "visible";
    document.getElementById("setting").style.visibility = "hidden";
    document.getElementById("instruction").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "hidden";
}

function ok() {
    document.getElementById("ins").style.visibility = "hidden";
    document.getElementById("ok").style.visibility = "hidden";
    document.getElementById("setting").style.visibility = "visible";
    document.getElementById("instruction").style.visibility = "visible";
    document.getElementById("start").style.visibility = "visible";
}

function control() {
    document.getElementById("control").style.visibility = "visible";
    document.getElementById("setting").style.visibility = "hidden";
    document.getElementById("instruction").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("about").style.visibility = "visible";
    document.getElementById("back").style.visibility = "visible";
}

function back() {
    document.getElementById("control").style.visibility = "hidden";
    document.getElementById("setting").style.visibility = "visible";
    document.getElementById("instruction").style.visibility = "visible";
    document.getElementById("start").style.visibility = "visible";
    document.getElementById("about").style.visibility = "hidden";
    document.getElementById("back").style.visibility = "hidden";
}

function about() {
    document.getElementById("aboutgame").style.visibility = "visible";
    document.getElementById("back2").style.visibility = "visible"
    document.getElementById('about').style.visibility = "hidden";
    document.getElementById("back").style.visibility = "hidden";
}

function back2() {
    document.getElementById("aboutgame").style.visibility = "hidden";
    document.getElementById("back2").style.visibility = "hidden"
    document.getElementById('about').style.visibility = "visible";
    document.getElementById("back").style.visibility = "visible";
}

var trapId = 0;
var trapMargin = 0;

function trapes() {
    for(var a=0; a<15; a++) {
        var trap = document.createElement('div');
        trap.className = "flame";
        trap.id = "trap" + a;
        trapMargin = trapMargin + 800;
        trap.style.marginLeft = trapMargin + "px";
        document.getElementById("background").appendChild(trap);
    }
}

var trapWorker = 0;

function trapMove() {
    for(var a=0; a<15; a++) {
        var styles = getComputedStyle(document.getElementById("trap" +a));
        var pixel = parseInt(styles.marginLeft);
        pixel = pixel - 20;
        boytop = getComputedStyle(document.getElementById('boy'));
        boytop = parseInt(boytop.marginTop);
        document.getElementById("trap" + a).style.marginLeft = pixel + "px";
        if (pixel>=100&pixel<=180) {
            if (boytop>=300){
                clearInterval(runWorker);
                clearInterval(jumpWorker);
                clearInterval(backgroundWorker);
                clearInterval(trapWorker);
                clearInterval(scoreWorker);
                deadWorker = setInterval(dead, 100);
                document.getElementById("gameover").style.visibility = 'visible';
                document.getElementById("tryagain").style.visibility = "visible";
                document.getElementById("boy").style.marginTop = "370px";
                runSound.pause();
                runWorker = -1;
                jumpWorker = -1;
                
            }
        }
    }
}

var deadImage = 0;
var deadWorker =0;

function dead() {
    deadImage = deadImage + 1;
    if (deadImage == 11) {
        deadImage = 10;
    }
    document.getElementById("boy").src = "Dead (" + deadImage + ").png";
}

function win() {
    clearInterval(runWorker);
    clearInterval(jumpWorker);
    clearInterval(backgroundWorker);
    clearInterval(scoreWorker);
    clearInterval(trapWorker);
    runSound.pause();
    jumpWorker = -1;
    runWorker = -1;
    document.getElementById("win").style.visibility = "visible";
    document.getElementById("retry").style.visibility = "visible";
    idleWorker = setInterval(idle, 100);
}

function retry() {
    location.reload();
}