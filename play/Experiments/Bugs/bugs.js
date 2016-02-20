var bugs = [];

var mutationMultiplier = 10;

var starterBugs = [
  {
    id: "Mayku",
    color: {
      r: 200,
      g: 0,
      b: 0,
      mc: 10
    },
    speed: 0.01,
    speedMC: 0.005,

    torque: 0.002,
    torqueMC: 0.002/2,

    hungerCap: 50,
    hungerCapMC: 10,
    hungerSpeed: 0.01,
    hungerSpeedMC: 0.01,

    hungerRegenSpeed: 0.01,
    hungerRegenSpeedMC: 0.1,

    damage: 0.1,
    damageMC: 0.1,

    healthCap: 50,
    healthCapMC: 10,

    healthRegenSpeed: 0.2,
    healthRegenSpeedMC: 0.1,

    matingInterval: 500,
    matingIntervalMC: 100,

    range: 75,
    rangeMC: 10,
    enemies: ['ChingChong'],
    allies: ['Mayku']
  },
  {
    id: "ChingChong",
    color: {
      r: 0,
      g: 200,
      b: 0,
      mc: 10
    },
    speed: 0.01,
    speedMC: 0.005,

    torque: 0.002,
    torqueMC: 0.002/2,

    hungerCap: 50,
    hungerCapMC: 10,
    hungerSpeed: 0.01,
    hungerSpeedMC: 0.01,

    hungerRegenSpeed: 0.01,
    hungerRegenSpeedMC: 0.1,

    damage: 0.1,
    damageMC: 0.1,

    healthCap: 50,
    healthCapMC: 10,

    healthRegenSpeed: 0.2,
    healthRegenSpeedMC: 0.1,

    matingInterval: 500,
    matingIntervalMC: 100,

    range: 75,
    rangeMC: 10,
    enemies: ['Mayku'],
    allies: ['']
  }
];

function addPureBug(type, x, y){
  var bug = JSON.parse(JSON.stringify(starterBugs[type]));
  bug.hunger = bug.hungerCap;
  bug.health = bug.healthCap;

  bug.vx = bug.vy = bug.vt = 0;
  bug.angle = Math.random() * Math.PI * 2;
  bug.tAngle = Math.random() * Math.PI * 2;
  bug.x = x;//Math.random() * c.width;
  bug.y = y;//Math.random() * c.height;

  bug.readyToMate = Math.random() >= 0.5;
  bug.matingTimeOffset = Math.floor(Math.random() * bug.matingInterval);

  bug.tx = x;//Math.random() * c.width;
  bug.ty = y;//Math.random() * c.height;

  bug.state = 0;

  bugs.push(bug);
}

function addOffspring(a, b){
  var bug = JSON.parse(JSON.stringify(a));
  bug.color.r = Math.floor(Math.max(0, Math.min(200, getMutationValue(a.color.r, b.color.r, a.color.mc))));
  bug.color.g = Math.floor(Math.max(0, Math.min(200, getMutationValue(a.color.g, b.color.g, a.color.mc))));
  bug.color.b = Math.floor(Math.max(0, Math.min(200, getMutationValue(a.color.b, b.color.b, a.color.mc))));

  bug.vx = bug.vy = bug.vt = 0;
  bug.angle = Math.random() * Math.PI * 2;
  bug.tAngle = Math.random() * Math.PI * 2;
  bug.x = (a.x + b.x)/2;
  bug.y = (a.y + b.y)/2;

  bug.speed = getMutationValue(a.speed, b.speed, a.speedMC);

  bug.torque = getMutationValue(a.torque, b.torque, a.torqueMC);

  bug.range = getMutationValue(a.range, b.range, a.rangeMC);

  bug.damage = getMutationValue(a.damage, b.damage, a.damageMC);

  bug.matingInterval = getMutationValue(a.matingInterval, b.matingInterval, a.matingIntervalMC);

  bug.hungerRegenSpeed = getMutationValue(a.hungerRegenSpeed, b.hungerRegenSpeed, a.hungerRegenSpeedMC);
  bug.healthRegenSpeed = getMutationValue(a.healthRegenSpeed, b.healthRegenSpeed, a.healthRegenSpeedMC);

  bug.hungerSpeed = getMutationValue(a.hungerSpeed, b.hungerSpeed, a.hungerSpeedMC);

  bug.hungerCap = getMutationValue(a.hungerCap, b.hungerCap, a.hungerCapMC);
  bug.healthCap = getMutationValue(a.healthCap, b.healthCap, a.healthCapMC);

  bug.hunger = bug.hungerCap;
  bug.health = bug.healthCap/2;

  bug.readyToMate = Math.random() >= 0.5;
  bug.matingTimeOffset = Math.floor(Math.random() * bug.matingInterval);

  bug.tx = Math.random() * c.width;
  bug.ty = Math.random() * c.height;

  bug.state = 0;

  bugs.push(bug);
}

function getMutationValue(a, b, mc){
  return Math.abs(Math.min(a, b) + Math.random() * Math.abs(a - b) + (Math.random() >= 0.5 ? 1 : -1) * Math.random() * mc * mutationMultiplier);
  //return (Math.random() >= 0.5 ? a : b) + (Math.random() >= 0.5 ? 1 : -1) * (Math.random() >= 0.5 ? Math.random() * Math.floor(a - b) : mc);
}
