// Creating Our Gameboard:
let ctx = null;
let tileW = 53.33, tileH = 56.99;
let mapW = 15, mapH = 12;

let currentSecond = 0, frameCount = 0, frameLastSecond = 0;

const gameMap = [
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,0
];

window.onload = function() {
    ctx = document.getElementById('board').getContext('2d');
    requestAnimationFrame(drawGame);
    ctx.font = 'bold 10pt sans-serif';
}

function drawGame() {
    if (ctx==null) { return; }

    let sec = Math.floor(Date.now()/1000)
    if (sec != currentSecond) {
        currentSecond = sec;
        frameLastSecond = frameCount;
        frameCount = 1;
    }
    else { frameCount++}

    for(let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
            switch (gameMap[(y*mapW)+x]) {
              case 0:
                      ctx.fillStyle = 'rgba(120,75,75,1)';
                      ctx.strokeStyle ='black';
                      break;
              default:
                      ctx.fillStyle = 'rgba(0,60,0,.6)';
                      ctx.strokeStyle = 'black';
            }

            ctx.fillRect(x*tileW,y*tileH,tileW,tileH);
            ctx.stroke();
        }
    }
}


// Defining our character Objects:
