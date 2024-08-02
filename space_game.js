/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Second Game
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const cargo = "c";
const missile = "m";
const explosion = "e";
const boom = tune`
48.62236628849271,
48.62236628849271: F4/48.62236628849271 + C4-48.62236628849271 + E4^48.62236628849271 + D5-48.62236628849271 + C5-48.62236628849271,
48.62236628849271: A4/48.62236628849271 + C4-48.62236628849271 + G4^48.62236628849271 + E5-48.62236628849271 + D5-48.62236628849271,
48.62236628849271: C5/48.62236628849271 + C4-48.62236628849271 + B4^48.62236628849271 + G5-48.62236628849271,
48.62236628849271: F5/48.62236628849271 + C4-48.62236628849271 + E5^48.62236628849271 + A5-48.62236628849271 + B5-48.62236628849271,
48.62236628849271: F5/48.62236628849271 + C4-48.62236628849271 + E5^48.62236628849271 + B5-48.62236628849271 + A5-48.62236628849271,
48.62236628849271: D5/48.62236628849271 + B4/48.62236628849271 + C4-48.62236628849271 + A4^48.62236628849271 + G5-48.62236628849271,
48.62236628849271: A4/48.62236628849271 + F4/48.62236628849271 + C4-48.62236628849271 + C5^48.62236628849271 + G4^48.62236628849271,
48.62236628849271: E4/48.62236628849271 + C4-48.62236628849271 + D4^48.62236628849271,
1118.3144246353322`;

setLegend(
  [player, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000660000000
0000005555000000
0000055335500000
0000553773550000
0005577777755000
0055577007755500
0065570330755600
0000003333000000
0000000990000000
0000009999000000
0000090990900000
0000000000000000
0000000000000000`],
  [cargo, bitmap`
0000000000000000
0665555555555660
0667777777777660
057777333C777750
057777333C777750
057777333C777750
057777333C777750
057777333C777750
057777333C777750
0577777777777750
057777333C777750
057777333C777750
057777333C777750
0667777777777660
0665555555555660
0000000000000000`],
  [missile, bitmap`
0000909009090000
0000099999900000
00003333333C0000
0000066666F00000
0000066666F00000
0000066666F00000
0000066666F00000
0000066666F00000
0000066666F00000
0000066666F00000
0000066666F00000
0000033333C00000
000000333C000000
00000003C0000000
0000000000000000
0000000000000000`],
  [explosion, bitmap`
6060060006660006
0006969666996600
0069696666666900
0666969999666660
6069999399669960
6069399933999660
0699933333339600
069333CCC3996606
09399333C3996660
0696933333996960
0669399399396660
6069966939996666
0666669669666660
0006696966696600
6069666666666006
0006066000000600`]
)

setSolids([player])

let level = 0
const levels = [
  map`
..m..
.....
.....
.....
..p..
.....`,
  map`
e`
]

setMap(levels[0]);
let count = 0
let dead = false;
let xval = 0;
let changed = false;
let difficulty = 1000;
let time = 0;

// setPushables({
//   [player : ]
// });

onInput("a", () => {
  if (getFirst(player).x > -1) getFirst(player).x -= 1;
});

onInput("d", () => {
  if (getFirst(player).x < 5) getFirst(player).x += 1;
});

onInput("k", () => {
  if (difficulty - 100 > 100) difficulty -= 100;
  changed = true;
});

onInput("i", () => {
  if (difficulty + 100 < 10000) difficulty += 100;
  changed = true;
});

function moveMissiles() {
  getAll(missile).forEach((missile) => {
  missile.y += 1; });
}

function checkCollision() {
    if (tilesWith(missile, player).length === 1) 
  {
    if (count < 1) {
      playTune(boom);
      dead = true;
      setMap(levels[1]);
      clearText();
      count += 1;
    }
  }
  else {
    
  }
}

function addMissile() {
    let yval = 0;
    xval = Math.floor(Math.random() * 5);
  if (!dead) {
      addSprite(xval, yval, missile);
  }
}

function addCargo() {
    let yval = 0;
    xval = Math.floor(Math.random() * 5);
  if (!dead) {
      addSprite(xval, yval, cargo);
  }
}

function moveCargo() {
  getAll(cargo).forEach((cargo) => {
  cargo.y += 1; });
}

function deleteMissile() {
  if (getTile(0, 5).length === 1)   clearTile(0, 5);
  if (getTile(1, 5).length === 1)   clearTile(1, 5);
  if (getTile(2, 5).length === 1)   clearTile(2, 5);
  if (getTile(3, 5).length === 1)   clearTile(3, 5);
  if (getTile(4, 5).length === 1)   clearTile(4, 5);
}

function clear() {
  clearTile(0, 0);
}

if (!dead) {
  let move = setInterval(moveMissiles, 700);
  const check = setInterval(checkCollision, 20);
  const deleteTheMissiles = setInterval(deleteMissile, 20);
  const add = setInterval(addMissile, difficulty);
  const addCar = setInterval(addCargo, 60000);
  const moveCar = setInterval(moveCargo, 1000);
  // const timed = setInterval(time = updateTimer(time), 100);
  const timed = setInterval(() => {
  time = updateTimer(time);
  addText((time/10).toString());
  }, 100);
  // const diff = setInterval(changeSpeed(move), 10);
}
else {
  // xval = 0;
  setInterval(clear, 20);
  clearInterval(move);
  clearInterval(check);
  clearInterval(deleteTheMissiles);
  clearInterval(add);
  clearInterval(addCar);
  clearInterval(moveCar);
  
}

function updateTimer(timer) {
  timer += 1;
  return timer;
}

afterInput(() => {
  // addText(difficulty.toString());
//   clearInterval(interval);
//   const move = setInterval(moveMissile, difficulty)
})