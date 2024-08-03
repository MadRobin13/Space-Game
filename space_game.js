/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Space Game
@author: 
@tags: []
@addedOn: 2024-08-02
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
................
................
................
.......6F.......
......7777......
.....773C77.....
....7734DC77....
...7734DDDC77...
..7774D11DD777..
..655D1CC1D55F..
......9339......
.....669966.....
....6.6..6.6....
................
................
................`],
  [cargo, bitmap`
................
.....000000.....
...30LLLLLL03...
...CLLLLLLLLC...
..0LL6LLLL6LL0..
.0LLL6LLLL6LLL0.
.0LLL6LLLL6LLL0.
.0LLL666666LLL0.
.0LLL6FFFF6LLL0.
.0LLL6LLLL6LLL0.
.0LLL6LLLL6LLL0.
..03LFLLLLFL30..
...CLLLLLLLLC...
....0LLLLLL0....
.....000000.....
................`],
  [missile, bitmap`
....9.9..9.9....
.....999999.....
....3333333C....
.....36636F.....
.....63663F.....
.....66366C.....
.....36636F.....
.....63663F.....
.....66366C.....
.....36636F.....
.....63663F.....
.....33333C.....
......333C......
.......3C.......
................
................`],
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

level = 0;
setMap(levels[level]);
let count = 0
let dead = false;
let xval = 0;
let changed = false;
let difficulty = false;
let time = 0;

// setPushables({
//   [player : ]
// });


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
      level = 1;
      setMap(levels[level]);
      clearText();
      count += 1;
    }
  }
  else {
    
  }
}

function checkCargoCollision() {
  if (tilesWith(player, cargo).length === 1) {

    for(let xval = 0; xval < 5; xval++) {
      for(let yval = 0; yval < 6; yval++) {
         if (getTile(xval, yval).some(sprite => sprite.type === missile)) clearTile(xval, yval);
      }
    }
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
  if (getTile(0, 5).length >= 1)   clearTile(0, 5);
  if (getTile(1, 5).length >= 1)   clearTile(1, 5);
  if (getTile(2, 5).length >= 1)   clearTile(2, 5);
  if (getTile(3, 5).length >= 1)   clearTile(3, 5);
  if (getTile(4, 5).length >= 1)   clearTile(4, 5);
}

function clear() {
  clearTile(0, 0);
}

onInput("a", () => {
  if (!dead) if (getFirst(player).x > -1) getFirst(player).x -= 1;
});

onInput("d", () => {
  if (!dead) if (getFirst(player).x < 5) getFirst(player).x += 1;
});

  onInput("w", () => {
    if (level === 1) {
      level = 0;
      dead = false;
      count = 0;
      setMap(levels[level]);
                     }
  });

if (!dead) {
  
  let move = setInterval(moveMissiles, 700);
  const check = setInterval(checkCollision, 20);
  const deleteTheMissiles = setInterval(deleteMissile, 20);
  const add = setInterval(addMissile, 700);

  if (!difficulty) {
    const addCar = setInterval(addCargo, 10000);
    const moveCar = setInterval(moveCargo, 700);
    const cargoCollide = setInterval(checkCargoCollision, 100);
  }
  
  const timed = setInterval(() => {
    if (!dead) {
      time = updateTimer(time);
      addText((time/10).toString());
      }
    }
    , 100);
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
  clearInterval(timed);
}

onInput("k", () => {
  difficulty = false;
});

onInput("i", () => {
  difficulty = true;
});

function updateTimer(timer) {
  if (!dead) {
    timer += 1;
    return timer;
  }
  }

afterInput(() => {
})