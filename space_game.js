/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Second Game
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const space = "s";
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
.......00.......
......0660......
.....055550.....
....05533550....
...0553773550...
..055777777550..
.05557700775550.
.06557033075560.
..000033330000..
.......99.......
......9999......
.....9.99.9.....
................
................`],
  [space, bitmap`
0000000000000000
0000000000000000
0000000000000200
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000020000
0000000000000000
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
....9.9..9.9....
.....999999.....
....3333333C....
.....66666F.....
.....66666F.....
.....66666F.....
.....66666F.....
.....66666F.....
.....66666F.....
.....66666F.....
.....66666F.....
.....33333C.....
......333C......
.......3C.......
................
................`],
  [explosion, bitmap`
0000000000000000
0006969666996600
0069696666666900
0666969999666660
6069999399669960
6069399933999660
0699933333339600
069333CCC3996600
09399333C3996660
0696933333996960
0669399399396660
6069966939996666
0666669669666660
0006696966696600
0069666666666000
0006066000000600`]
)

setSolids([player, cargo])

let level = 0
const levels = [
  map`
..mm.
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
let difficulty = 6000;

setPushables({
  [player]: [cargo]
});

onInput("a", () => {
  if (getFirst(player).x > -1) getFirst(player).x -= 1;
});

onInput("d", () => {
  if (getFirst(player).x < 5) getFirst(player).x += 1;
});

onInput("k", () => {
  if (difficulty < 10000 && difficulty > 100) difficulty = difficulty / 15;
  changed = true;
});

onInput("i", () => {
  if (difficulty < 10000 && difficulty > 100) difficulty = difficulty * 15;
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

function deleteMissile() {
  clearTile(0, 5);
  clearTile(1, 5);
  clearTile(2, 5);
  clearTile(3, 5);
  clearTile(4, 5);
}

function clear() {
  // for (let i = 0; i < 5; i++) {
  //   for (let j = 0; j < 6; j++) {
  //     clearTile(i, j);
  //   }
  // }
  clearTile(0, 0);
}

if (!dead) {
  const move = setInterval(moveMissiles, 1000);
  const check = setInterval(checkCollision, 20);
  const deleteTheMissiles = setInterval(deleteMissile, 20);
  const add = setInterval(addMissile, 6000);
}
else {
  // xval = 0;
  setInterval(clear, 20);
  clearInterval(move);
  clearInterval(check);
  clearInterval(deleteTheMissiles);
  clearInterval(add);
}

function changeSpeed() {
  if (changed) {
    clearInterval(move);
    const move = setInverval(moveMissile, difficulty)
    changed = false;
  }
}

afterInput(() => {
})