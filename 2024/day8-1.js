raw = `
.E..........m..0N.........f.......................
........N........P0...............................
.......j..................................F.......
........1j............P........................C..
...........................3..K......f..........E.
...........V...y...0.....................F........
1.......j.....P....y.N.......................F....
....................m...................C.........
..L......P....p..................w.m..............
............E......p..AU........8......f..........
..............C...............w....d..............
j1...............E..........3.........f........w..
.................p...A..........3.................
.................3..p........KU...w..r..F.........
7.........y........8.......................r......
........y..u......K...............................
...1..................8....C...K..................
...........h.......................6..............
......................U.........A.r..t........6...
...........5.........8..c.........................
.................U................t...............
.....L...O...................t.............d......
.........7........................................
......L..H...c.....9....t.................6.......
...........................c.M..................4.
.....R..7...O.....................................
.......................9......................d...
..................................................
.........L..9...R..........................6c.....
..M.....T.5.................................d.....
.......5OR...................T....................
.......D......o.........v...................r.....
...u....o.........5...............................
.......WR.....Y...........................e...4...
T............O......M..................4..a.......
.Y...................M............................
........W..D...............oh............e........
.......7......Do...................A...e.......4..
.W...Y..D........................h...v..........e.
..........V.....9.l.......h.......a.........n..v..
.......................H.....a2...................
..................................................
...V............Y....J..H2................vn......
..............................H2.................n
................V..........l...........k..........
.T..u........................J...ak...............
..................J.....l.........................
.................l................................
......u.........................................n.
......................J..k............2...........
`;

data = raw
  .trim()
  .split("\n")
  .map((x) => x.split(""));

signals = {};
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] !== ".") {
      s = data[i][j];
      signals[s] = signals[s] ? signals[s].concat([[i, j]]) : [[i, j]];
    }
  }
}

const key = (x, y) => `${x}_${y}`;

function getAntinodes(s1, s2) {
  let [s1x, s1y] = s1;
  let [s2x, s2y] = s2;
  dx = s2x - s1x;
  dy = s2y - s1y;
  result = [];
  // up
  if (data[s1x - dx] && data[s1x - dx][s1y - dy]) {
    result.push(key(s1x - dx, s1y - dy));
  }
  // down
  if (data[s2x + dx] && data[s2x + dx][s2y + dy]) {
    result.push(key(s2x + dx, s2y + dy));
  }
  return result;
}

const getSignalPairs = (signals) => {
  let pairs = [];
  for (let i = 0; i < signals.length; i++) {
    for (let j = i + 1; j < signals.length; j++) {
      pairs.push([signals[i], signals[j]]);
    }
  }
  return pairs;
};

let nodes = [];

for (name in signals) {
  let pairs = getSignalPairs(signals[name]);

  for (pair of pairs) {
    let [s1, s2] = pair;
    let antinodes = getAntinodes(s1, s2);
    nodes = nodes.concat(antinodes);
  }
}

result = new Set(nodes);

console.log("antinodes: ", Array.from(result), result.size);
