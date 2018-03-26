// let land = document.getElementsByClassName('car');
// let sea = document.getElementsByClassName('boat');

//i need to append the img to the next td, but cant figure out how to iterate through and target conatainer.
//attempting to relocate id "track" to give the obj something to append to on each click of the key.
const moveCar = () => {
    let obj = document.getElementsByClassName("car");
    let place = document.getElementById("track");
    place.nextElementSibling.setAttribute("id", "track");
    place.appendChild(obj);
}

const moveIt = (event) => {
  if (event.keyCode == 68) {
    //console.log("ah");
    moveCar();
  }
  if (event.keyCode == 39) {
    moveBoat();
  }
}
// console log runs up dry. event listener not working
document.onkeydown = moveIt;
