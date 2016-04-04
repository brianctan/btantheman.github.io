var characters = {};

PI = Math.PI;
TAU = 2 * PI;
HPI = PI/2;
QPI = PI/4;

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

characters["."] = [
  [DEFAULT, DEFAULT],
  [DEFAULT, DEFAULT],
  [DEFAULT, DEFAULT],
  [DEFAULT, DEFAULT],
  [[0, HPI], [PI, HPI]],
  [[0, -HPI], [PI, -HPI]]
];

characters[" "] = [
  [DEFAULT],
  [DEFAULT],
  [DEFAULT],
  [DEFAULT],
  [DEFAULT],
  [DEFAULT]
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

characters["A"] = [
  [[0, HPI], [0, PI], [0, PI], [PI, HPI]],
  [[HPI, -HPI], [0, HPI], [HPI, -PI], [HPI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [PI, -HPI], [HPI, -HPI]],
  [[HPI, -HPI], [0, HPI], [HPI, -PI], [HPI, -HPI]],
  [[HPI, -HPI], [HPI, -HPI], [HPI, -HPI], [HPI, -HPI]],
  [[0, -HPI], [PI, -HPI], [0, -HPI], [PI, -HPI]]
];

characters["P"] = [
  [[0, HPI], [0, PI], [0, PI], [PI, HPI]],
  [[HPI, -HPI], [0, HPI], [HPI, -PI], [HPI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [PI, -HPI], [HPI, -HPI]],
  [[HPI, -HPI], [0, HPI], [0, PI], [PI, -HPI]],
  [[HPI, -HPI], [HPI, -HPI], DEFAULT, DEFAULT],
  [[0, -HPI], [PI, -HPI], DEFAULT, DEFAULT]
];

characters["R"] = [
  [[0, HPI], [0, PI], [0, PI], [PI, HPI]],
  [[HPI, -HPI], [0, HPI], [HPI, -PI], [HPI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [PI, -HPI], [HPI, -HPI]],
  [[HPI, -HPI], [HPI, QPI], [0, QPI], [PI, -HPI]],
  [[HPI, -HPI], [HPI, -HPI], [QPI, PI+QPI], [HPI, PI+QPI]],
  [[0, -HPI], [PI, -HPI], DEFAULT, [PI+QPI, -HPI]]
];

characters["J"] = [
  [DEFAULT, DEFAULT, [0, HPI], [PI, HPI]],
  [DEFAULT, DEFAULT, [HPI, -HPI], [HPI, -HPI]],
  [DEFAULT, DEFAULT, [HPI, -HPI], [HPI, -HPI]],
  [[0, HPI], [PI, HPI], [HPI, -HPI], [HPI, -HPI]],
  [[HPI, -HPI], [0, -HPI], [PI, -HPI], [HPI, -HPI]],
  [[0, -HPI], [0, PI], [0, PI], [PI, -HPI]]
];

characters["N"] = [
  [DEFAULT, DEFAULT, DEFAULT, DEFAULT],
  [DEFAULT, DEFAULT, DEFAULT, DEFAULT],
  [[0, HPI], [0, PI], [0, PI], [HPI, -PI]],
  [[HPI, -HPI], [0, HPI], [HPI, -PI], [HPI, -HPI]],
  [[HPI, -HPI], [HPI, -HPI], [HPI, -HPI], [HPI, -HPI]],
  [[0, -HPI], [PI, -HPI], [0, -HPI], [PI, -HPI]]
];

function getCharacterWidth(s){
  return characters[s][0].length;
}

function getStringWidth(s){
  var n = 0;
  var t = s.split("");
  for(var i = 0; i < t.length; i++) n += getCharacterWidth(t[i]);
  return n;
}
