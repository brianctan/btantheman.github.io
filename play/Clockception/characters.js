var characters = {};

PI = Math.PI;
TAU = 2 * PI;
HPI = PI/2;

var DEFAULT = [-PI/4, PI/4];

characters["0"] = [
  [[0, HPI], [0, PI], [0, PI], [PI, HPI]],
  [[HPI, -HPI], [0, HPI], [PI, HPI], [HPI, -HPI]],
  [[HPI, -HPI], [HPI, -HPI], [HPI, -HPI], [HPI, -HPI]],
  [[HPI, -HPI], [HPI, -HPI], [HPI, -HPI], [HPI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [PI, -HPI], [HPI, -HPI]],
  [[0, -HPI], [0, PI], [0, PI], [PI, -HPI]]
]

characters[":"] = [
  [DEFAULT, DEFAULT],
  [[0, HPI], [PI, HPI]],
  [[0, -HPI], [PI, -HPI]],
  [[0, HPI], [PI, HPI]],
  [[0, -HPI], [PI, -HPI]],
  [DEFAULT, DEFAULT]
];

characters["1"] = [
  [[0, HPI], [0, PI], [PI, HPI], DEFAULT],
  [[0, -HPI], [HPI, -PI], [HPI, -HPI], DEFAULT],
  [DEFAULT, [HPI, -HPI], [HPI, -HPI], DEFAULT],
  [DEFAULT, [HPI, -HPI], [HPI, -HPI], DEFAULT],
  [[0, HPI], [PI, -HPI], [0, -HPI], [HPI, -PI]],
  [[0, -HPI], [0, PI], [0, PI], [PI, -HPI]]
];

characters["2"] = [
  [[0, HPI], [0, PI], [0, PI], [PI, HPI]],
  [[0, -HPI], [0, PI], [HPI, -PI], [HPI, -HPI]],
  [[0, HPI], [0, PI], [PI, -HPI], [HPI, -HPI]],
  [[HPI, -HPI], [0, HPI], [0, PI], [PI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [0, PI], [HPI, -PI]],
  [[0, -HPI], [0, PI], [0, PI], [PI, -HPI]]
];

characters["3"] = [
  [[0, HPI], [0, PI], [0, PI], [PI, HPI]],
  [[0, -HPI], [0, PI], [HPI, -PI], [HPI, -HPI]],
  [[0, HPI], [0, PI], [PI, -HPI], [HPI, -HPI]],
  [[0, -HPI], [0, PI], [HPI, -PI], [HPI, -HPI]],
  [[0, HPI], [0, PI], [PI, -HPI], [HPI, -HPI]],
  [[0, -HPI], [0, PI], [0, PI], [PI, -HPI]]
];

characters["4"] = [
  [[0, HPI], [PI, HPI], [0, HPI], [PI, HPI]],
  [[HPI, -HPI], [HPI, -HPI], [HPI, -HPI], [HPI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [PI, -HPI], [HPI, -HPI]],
  [[0, -HPI], [0, PI], [HPI, -PI], [HPI, -HPI]],
  [DEFAULT, DEFAULT, [HPI, -HPI], [HPI, -HPI]],
  [DEFAULT, DEFAULT, [0, -HPI], [PI, -HPI]]
];

characters["5"] = [
  [[0, HPI], [0, PI], [0, PI], [PI, HPI]],
  [[HPI, -HPI], [0, HPI], [0, PI], [PI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [0, PI], [HPI, -PI]],
  [[0, -HPI], [0, PI], [HPI, -PI], [HPI, -HPI]],
  [[0, HPI], [0, PI], [PI, -HPI], [HPI, -HPI]],
  [[0, -HPI], [0, PI], [0, PI], [PI, -HPI]]
];

characters["6"] = [
  [[0, HPI], [0, PI], [0, PI], [PI, HPI]],
  [[HPI, -HPI], [0, HPI], [0, PI], [PI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [0, PI], [HPI, -PI]],
  [[HPI, -HPI], [0, HPI], [HPI, -PI], [HPI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [PI, -HPI], [HPI, -HPI]],
  [[0, -HPI], [0, PI], [0, PI], [PI, -HPI]]
];

characters["7"] = [
  [[0, HPI], [0, PI], [0, PI], [PI, HPI]],
  [[0, -HPI], [0, PI], [HPI, -PI], [HPI, -HPI]],
  [DEFAULT, DEFAULT, [HPI, -HPI], [HPI, -HPI]],
  [DEFAULT, DEFAULT, [HPI, -HPI], [HPI, -HPI]],
  [DEFAULT, DEFAULT, [HPI, -HPI], [HPI, -HPI]],
  [DEFAULT, DEFAULT, [0, -HPI], [PI, -HPI]]
];

characters["8"] = [
  [[0, HPI], [0, PI], [0, PI], [PI, HPI]],
  [[HPI, -HPI], [0, HPI], [HPI, -PI], [HPI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [PI, -HPI], [HPI, -HPI]],
  [[HPI, -HPI], [0, HPI], [HPI, -PI], [HPI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [PI, -HPI], [HPI, -HPI]],
  [[0, -HPI], [0, PI], [0, PI], [PI, -HPI]]
];

characters["9"] = [
  [[0, HPI], [0, PI], [0, PI], [PI, HPI]],
  [[HPI, -HPI], [0, HPI], [HPI, -PI], [HPI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [PI, -HPI], [HPI, -HPI]],
  [[0, -HPI], [0, PI], [HPI, -PI], [HPI, -HPI]],
  [DEFAULT, DEFAULT, [HPI, -HPI], [HPI, -HPI]],
  [DEFAULT, DEFAULT, [0, -HPI], [PI, -HPI]]
];

function getCharacterWidth(s){
  return characters[s][0].length;
}
