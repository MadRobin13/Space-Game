/*

Sprig Space Game:

Press a and d to move the spaceship left and right to avoid the missiles!
Land on the intershapce helipads to temeporarily get away from the missiles!
See how long you can last and up the difficulty by disabling helipads!

Buttons:
 - a: Move spaceship left.
 - d: Move the spaceship right.
 - i: Enable difficult mode and disable helipads.
 - k: Disable difficult mode and enable helipads.
 - w: Restart the game once you inevitably lose.

@title: Space Game
@author: Abhimanyu Chaudhary
@addedOn: 2024-08-04
*/

const player = "p"
const cargo = "c";
const missile = "m";
const explosion = "e";
const space = "s";
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
const move = tune`
107.52688172043011: A4^107.52688172043011 + G4-107.52688172043011,
3333.3333333333335`;
const music1 = tune`
2307.6923076923076: F4~2307.6923076923076,
2307.6923076923076: G4~2307.6923076923076,
2307.6923076923076: A4~2307.6923076923076,
2307.6923076923076: B4~2307.6923076923076,
2307.6923076923076: G4~2307.6923076923076,
2307.6923076923076: F4~2307.6923076923076,
2307.6923076923076: E4~2307.6923076923076,
2307.6923076923076: F4~2307.6923076923076,
2307.6923076923076: C5~2307.6923076923076,
2307.6923076923076: G4~2307.6923076923076,
2307.6923076923076: F4~2307.6923076923076,
2307.6923076923076: E4~2307.6923076923076,
46153.846153846156`;
const music2 = tune`
461.53846153846155: D5~461.53846153846155,
461.53846153846155: C5~461.53846153846155,
461.53846153846155: D5~461.53846153846155,
461.53846153846155: C5~461.53846153846155,
461.53846153846155: D5~461.53846153846155,
461.53846153846155: C5~461.53846153846155,
461.53846153846155: D5~461.53846153846155,
461.53846153846155: C5~461.53846153846155,
461.53846153846155: D5~461.53846153846155,
461.53846153846155: C5~461.53846153846155,
461.53846153846155: D5~461.53846153846155,
461.53846153846155: C5~461.53846153846155,
461.53846153846155: D5~461.53846153846155,
461.53846153846155: C5~461.53846153846155,
8307.692307692309`;

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
................
...3.LLLLLL.3...
...CLLLLLLLLC...
...LL6LLLL6LL...
..LLL6LLLL6LLL..
..LLL6LLLL6LLL..
..LLL666666LLL..
..LLL6FFFF6LLL..
..LLL6LLLL6LLL..
..LLL6LLLL6LLL..
...3LFLLLLFL3...
...CLLLLLLLLC...
.....LLLLLL.....
................
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
0006066000000600`],
  [space, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000200000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000002000
0000000200000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

setSolids([player])

let level = 0
const levels = [
  map`
sssss
sssss
sssss
sssss
sssss
sssss`,
  map`
e`
]

level = 0;
setMap(levels[level]);
let count = 0
let dead = false;
let xval = 0;
let changed = false;
let difficult = false;
let time = 0;
let speed = 700;

addSprite(2, 4, player);

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
        if (getTile(xval, yval).some(sprite => sprite.type === missile)) checkCollision();
        if (getTile(xval, yval).some(sprite => sprite.type === missile)){
          clearTile(xval, yval);
          addSprite(xval, yval, space);
        }
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
    if (!difficult) addSprite(xval, yval, cargo);
  }
}

function moveCargo() {
  getAll(cargo).forEach((cargo) => {
  cargo.y += 1; });
}

function deleteMissile() {
  if (getTile(0, 5).length >= 2)   clearTile(0, 5);
  if (getTile(1, 5).length >= 2)   clearTile(1, 5);
  if (getTile(2, 5).length >= 2)   clearTile(2, 5);
  if (getTile(3, 5).length >= 2)   clearTile(3, 5);
  if (getTile(4, 5).length >= 2)   clearTile(4, 5);

  if (!dead) {
    for(let xval = 0; xval < 5; xval++) {
      for(let yval = 0; yval < 6; yval++) {
        addSprite(xval, yval, space);
      }
    }
  }
}

function clear() {
  clearTile(0, 0);
}

onInput("a", () => {
  if (!dead) if (getFirst(player).x > -1) getFirst(player).x -= 1;
  playTune(move);
});

onInput("d", () => {
  if (!dead) if (getFirst(player).x < 5) getFirst(player).x += 1;
  playTune(move);
});

  onInput("w", () => {
    if (level === 1) {
      level = 0;
      dead = false;
      count = 0;
      setMap(levels[level]);
                     }
  });

function addSpace() {
  tilesWith().forEach((tile) => {
    addSprite(tile[0], tile[1], space);
  })
}

if (!dead) {
  // const space = setInterval(addSpace, 20);
  playTune(music1);
  playTune(music2);
  const m2 = setInterval(() => {playTune(music2)}, 6840);
  const m1 = setInterval(() => {playTune(music1)}, 27900)
  let move = setInterval(() => {
    moveMissiles();
    }
    , speed);
  const update = setInterval(() => {
    clearInterval(move);
        if (speed >= 100) speed -= 10;
    move = setInterval(moveMissiles, speed);
  }, 10000)
  const check = setInterval(checkCollision, 20);
  const deleteTheMissiles = setInterval(deleteMissile, 20);
  const add = setInterval(addMissile, 700);
  const addCar = setInterval(addCargo, 10000);
  const moveCar = setInterval(moveCargo, 700);
  const cargoCollide = setInterval(checkCargoCollision, 100);
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
  clearInterval(m2);
  clearInterval(m1);
  clearInterval(move);
  clearInterval(check);
  clearInterval(deleteTheMissiles);
  clearInterval(add);
  clearInterval(addCar);
  clearInterval(moveCar);
  clearInterval(timed);
}

onInput("k", () => {
  difficult = false;
});

onInput("i", () => {
  difficult = true;
});

function updateTimer(timer) {
  if (!dead) {
    timer += 1;
    return timer;
  }
  }

afterInput(() => {
})