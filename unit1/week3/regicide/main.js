
let ctx = null;
let tileW = 53.33, tileH = 56.99;
let mapW = 15, mapH = 12;

let currentSecond = 0, frameCount = 0, frameLastSecond = 0;
let lastFrameTime = 0;

let keysDown = {
    37: false, //up
    38: false, //left
    39: false, //right
    40: false //down
};

// row is 15 column is 12.
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

function Character() {
  this.tileFrom = [1,1];
  this.tileTo = [1,1];
  this.timeMoved = 0;
  this.dimensions = [45,45];
  this.position = [60,60]
  this.delayMove = 200;
}

let player = new Character();

Character.prototype.placeAt = function(x,y) {
    this.tileFrom = [x,y];
    this.tileTo = [x,y];
    this.position [((tileW*x) + ((tileW-this.dimensions[0])/2)),((tileH*y) + ((tileH-this.dimensions[1])/2))];
};

Character.prototype.processMovement = function(t) {
      if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) {
        return false;
      }

      if((t-this.timeMoved)>=this.delayMove) {
        this.placeAt(this.tileTo[0], this.tileTo[1]);
      }
      else {
        this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0])/2);
        this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1])/2);

        if(this.tileTo[0] != this.tileFrom[0]) {
          let diff = (tileW / this.delayMove) * (t - this.timeMoved); this.position[0] += (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
        }
        if(this.tileTo[1] != this.tileFrom[1]) {
          let diff = (tileH / this.delayMove) * (t-this.timeMoved);
          this.position[1] += (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
        }

        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
      }

      return true;
};

function toIndex(x,y) {
    return ((y * mapW) + x);
}


window.onload = function() {
    ctx = document.getElementById('board').getContext('2d');
    requestAnimationFrame(drawGame);

    window.addEventListener("keydown", function(e) {
        if(e.keyCode >= 37 && e.keyCode <= 40) {
            keysDown[e.keyCode] = true;
        }
    });
    window.addEventListener("keyup", function(e) {
        if(e.keyCode >= 37 && e.keyCode <= 40) {
            keysDown[e.keyCode] = false;
        }
    });
};

function drawGame() {
    if (ctx==null) { return; }

    let currentFrameTime = Date.now();
    let timeElapsed = currentFrameTime - lastFrameTime;

    let sec = Math.floor(Date.now()/1000)
    if (sec != currentSecond) {
        currentSecond = sec;
        frameLastSecond = frameCount;
        frameCount = 1;
    }
    else { frameCount++; }

    if(!player.processMovement(currentFrameTime)) {
        if(keysDown[38] && player.tileFrom[1]>0 && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1] - 1)]==1) {
            player.tileTo[1] -= 1;
        }
        else if (keysDown[40] && player.tileFrom[1]<(mapH - 1) && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1] + 1)]==1) {
            player.tileTo[1] += 1;
        }
        else if(keysDown[37] && player.tileFrom[0]>0 && gameMap[toIndex(player.tileFrom[0]-1, player.tileFrom[1])]==1) {
            player.tileTo[0] -= 1;
        }
        else if (keysDown[39] && player.tileFrom[0]<(mapW - 1) && gameMap[toIndex(player.tileFrom[0]+1, player.tileFrom[1])]==1) {
            player.tileTo[0] += 1;
        }
        if(player.tileFrom[0] != player.tileTo[0] || player.tileFrom[1]!= player.tileTo[1]) {
          player.timeMoved = currentFrameTime;
        }
    }

    for(let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
            switch (gameMap[(y*mapW)+x]) {
              case 0:
                      ctx.fillStyle = 'rgba(200,55,55,1)';
                      break;
              default:
                      ctx.fillStyle = 'rgba(0,60,0,.6)';
            }

            ctx.fillRect(x*tileW,y*tileH,tileW,tileH);
        }
    }

    ctx.fillStyle = "#0000ff";
    ctx.fillRect(player.position[0], player.position[1], player.dimensions[0], player.dimensions[1]);


    lastFrameTime = currentFrameTime;
    requestAnimationFrame(drawGame);
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
// // Calling our players:
// let princessOne = new Character ('princess','Chae','light',60,60,180,50);
//
// let princessTwo = new Character ('princess','Harlem','dark',60,60,180,50);
//
// console.log(princessOne);
// console.log(princessTwo);
// //


// Create mover cursor:
// psuedo:
//create cursor element that starts on character's position
//




//