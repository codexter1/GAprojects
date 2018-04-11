
let ctx = null;
let tileW = 53.33, tileH = 56.99;
let mapW = 15, mapH = 12;

let currentSecond = 0, frameCount = 0, frameLastSecond = 0;
let lastFrameTime = 0;


let keysDown = {
    //p1 movers
    37: false, //up
    38: false, //left
    39: false, //right
    40: false //down
};

let keysDown2 = {
    //p2 movers
    87: false, // w
    65: false, // a
    68: false, // d
    83: false // s
}

// row is 15 column is 12.
const gameMap = [
        0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,
        1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,
        1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,
        1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,1,0,1,0,1,1,0,1,1,0,1,0,1,0,
        1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,
        1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,
        0,1,1,1,1,1,1,0,1,1,1,1,1,1,0
];

function Character(a,b) {
  this.tileFrom = [1,1];
  this.tileTo = [1,1];
  this.timeMoved = 0;
  this.dimensions = [50,50];
  this.position = [a,b]
  this.delayMove = 200;
}

let player = new Character(2,60);
let player2 = new Character(748,59);

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

// collision detection function
function getDistance (x1,y1,x2,y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
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

    window.addEventListener("keydown", function(e) {
        if(e.keyCode >= 65 && e.keyCode <= 87) {
            keysDown[e.keyCode] = true;
        }
    });
    window.addEventListener("keyup", function(e) {
        if(e.keyCode >= 65 && e.keyCode <= 87) {
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
    // player 2 gets their movement assigned

    if(!player2.processMovement(currentFrameTime)) {
        if(keysDown[87] && player2.tileFrom[1]>0 && gameMap[toIndex(player2.tileFrom[0], player2.tileFrom[1] - 1)]==1) {
            player2.tileTo[1] -= 1;
        }
        else if (keysDown[83] && player2.tileFrom[1]<(mapH - 1) && gameMap[toIndex(player2.tileFrom[0], player2.tileFrom[1] + 1)]==1) {
            player2.tileTo[1] += 1;
        }
        else if(keysDown[65] && player2.tileFrom[0]>0 && gameMap[toIndex(player2.tileFrom[0]-1, player2.tileFrom[1])]==1) {
            player2.tileTo[0] -= 1;
        }
        else if (keysDown[68] && player2.tileFrom[0]<(mapW - 1) && gameMap[toIndex(player2.tileFrom[0]+1, player2.tileFrom[1])]==1) {
            player2.tileTo[0] += 1;
        }
        if(player2.tileFrom[0] != player2.tileTo[0] || player2.tileFrom[1]!= player2.tileTo[1]) {
          player2.timeMoved = currentFrameTime;
        }
    }

    for(let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
            switch (gameMap[(y*mapW)+x]) {
              case 0:
                      ctx.fillStyle = 'rgba(200,55,55,.8)';
                      break;
              default:
                      ctx.fillStyle = 'rgba(0,60,0,.6)';
            }

            ctx.fillRect(x*tileW,y*tileH,tileW,tileH);
        }
    }
    // draw player1
    ctx.fillStyle = "rgba(250,250,250,.8)";
    ctx.fillRect(player.position[0], player.position[1], player.dimensions[0], player.dimensions[1]);
    // draw player2
    ctx.fillStyle = "rgba(0,0,0,.8)";
    ctx.fillRect(player2.position[0], player2.position[1], player2.dimensions[0], player2.dimensions[1]);


    lastFrameTime = currentFrameTime;
    requestAnimationFrame(drawGame);

    if(getDistance(player.position[0],player.position[1],player2.position[0],player2.position[1]) < 10) {
      alert('The princess is Dead!!')
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

// function getDistance (x1,y1,x2,y2) {
//   let xDistance = x2 - x1;
//   let yDistance = y2 - y1;
//
//   return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
// }
