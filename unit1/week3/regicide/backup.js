// Creating Our Gameboard:
let ctx = null;
let tileW = 53.33, tileH = 56.99;
let mapW = 15, mapH = 12;

let currentSecond = 0, frameCount = 0, frameLastSecond = 0;

const gameMap = [
        0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,
        1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,
        1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,
        1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,1,0,1,1,1,1,0,1,1,1,1,0,1,0,
        1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,
        1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,
        1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,
        1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,
        0,1,1,1,1,1,1,0,1,1,1,1,1,1,0
];

window.onload = function() {
    ctx = document.getElementById('board').getContext('2d');
    requestAnimationFrame(drawGame);
}

function drawGame() {
    if (ctx==null) { return; }

    let sec = Math.floor(Date.now()/1000)
    if (sec != currentSecond) {
        currentSecond = sec;
        frameLastSecond = frameCount;
        frameCount = 1;
    }
    else { frameCount++; }

    for(let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
            switch (gameMap[(y*mapW)+x]) {
              case 0:
                      ctx.fillStyle = 'rgba(120,75,75,1)';
                      break;
              default:
                      ctx.fillStyle = 'rgba(0,60,0,.6)';
            }

            ctx.fillRect(x*tileW,y*tileH,tileW,tileH);
        }
    }
}





// // Defining our character Object:
// function Character(type,name,team,atk,def,hp,agi) {
//   this.type = type;
//   this.name = name;
//   this.team = team;
//   this.atk = atk;
//   this.def = def;
//   this.hp = hp;
//   this.agi = agi;
// }
//
// Character.prototype.start = function() {
//     return console.log('hi');
// }
//
// console.log(Character);
// // Calling our players:
// let princessOne = new Character ('princess','Chae','light',60,60,180,50, Character.start());
// console.log(princessOne);
//
// let princessTwo = new Character ('princess','Harlem','dark',60,60,180,50);
