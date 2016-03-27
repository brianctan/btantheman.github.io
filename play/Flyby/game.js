var planets = [];
var asteroids = [];
var particles = [];
var orbs = [];
var player = {
  x: 0, y: 100,
  vx: 0, vy: 0, vf: 1,
  radius: 20,
  a: 0, af: 0.98, av: 0,
  mass: 10, va: 0.1, aa: 0.005
};
var camera = {
  x: 0, y: 0,
  s: 1, a: 0
}
var bg = {
  r: 0,
  g: 0,
  b: 0
};

function gameInit(){
  planets.push({
    x: 1000,
    y: 1000,
    g: 500,
    radius: 300,
    airFric: 0.9,
    atmg: 20000,
    bounce: 1.1,
    color: {
      r: 150,
      g: 100,
      b: 75
    },
    atmc: {
      r: 150,
      g: 100,
      b: 75
    }
  });


  planets.push({
    x: 1000,
    y: 0,
    g: 1090,
    radius: 300,
    airFric: 1,
    atmg: 20000,
    bounce: 1.1,
    color: {
      r: 150,
      g: 100,
      b: 75
    },
    atmc: {
      r: 150,
      g: 100,
      b: 75
    }
  });


  planets.push({
    x: -500,
    y: -500,
    g: 1000,
    radius: 500,
    airFric: 0.9,
    atmg: 30000,
    bounce: 1.1,
    color: {
      r: 100,
      g: 150,
      b: 75
    },
    atmc: {
      r: 50,
      g: 50,
      b: 255
    }
  });

  planets.push({
    x: 4000,
    y: 4000,
    g: 10000,
    radius: 1000,
    airFric: 0.9,
    atmg: 30000,
    bounce: 1.1,
    color: {
      r: 100,
      g: 150,
      b: 75
    },
    atmc: {
      r: 50,
      g: 50,
      b: 255
    }
  });
}

function gameUpdate(){
  ctx.fillStyle = "rgb(" + Math.round(bg.r) + ", " + Math.round(bg.g) + ", " + Math.round(bg.b) + ")";
  ctx.fillRect(0, 0, c.width, c.height);
  player.vf = 0;
  bg.r = bg.g = bg.b = 0;

  camera.x += (c.width/2 - player.x - camera.x)/10;
  camera.y += (c.height/2 - player.y - camera.y)/10;

  for(var i in particles){
    var p = particles[i];

    p.vx *= p.vf;
    p.vy *= p.vf;

    p.x += p.vx;
    p.y += p.vy;

    p.radius += Math.sqrt(p.vx * p.vx + p.vy * p.vy)/10;

    if(camera.x + p.x >= 0 &&
       camera.x + p.x <= c.width &&
       camera.y + p.y >= 0 &&
       camera.y + p.y <= c.height){
      var alpha = Math.min(0.1, Math.sqrt(p.vx * p.vx + p.vy * p.vy)/10);
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
      ctx.arc(camera.x + p.x, camera.y + p.y, p.radius, 0, TAU);
      ctx.fill();
    }

    if(p.vx * p.vx + p.vy * p.vy <= 0.001){
      particles.splice(i, 1);
    }
  }

  for(var i in planets){
    var p = planets[i];

    var dx = player.x - p.x;
    var dy = player.y - p.y
    var dist2 = dx * dx + dy * dy;
    var dist = Math.sqrt(dist2);
    var angle = Math.atan2(p.y - player.y, p.x - player.x);

    if(dist <= Math.sqrt((c.width) * (c.width) + (c.height) * (c.height)) + p.radius){
      ctx.beginPath();
      ctx.arc(camera.x + p.x, camera.y + p.y, p.radius, 0, TAU);
      ctx.fillStyle = "rgb(" + p.color.r + ", " + p.color.g + ", " + p.color.b + ")";
      ctx.fill();
    }

    player.vx += Math.cos(angle) * p.g * player.mass / dist2;
    player.vy += Math.sin(angle) * p.g * player.mass / dist2;

    player.vf += (1 - p.airFric) * p.atmg / dist2;

    bg.r += 100000 * p.atmc.r / dist2;
    bg.g += 100000 * p.atmc.g / dist2;
    bg.b += 100000 * p.atmc.b / dist2;

    if(dist2 < (player.radius + p.radius) * (player.radius + p.radius)){
      var diff = ((player.radius + p.radius) - Math.sqrt(dist2))/Math.sqrt(dist2)
      player.x += dx * diff;
      player.y += dy * diff;

      player.vx += dx * diff * p.bounce;
      player.vy += dy * diff * p.bounce;

      player.vx += player.av * Math.cos(angle - PI/2) / 2;
      player.vy += player.av * Math.sin(angle - PI/2) / 2;
    }
  }

  if(keyCodes[37]){
    player.av -= player.aa;
  }

  if(keyCodes[39]){
    player.av += player.aa;
  }

  player.av *= player.af;
  player.a += player.av;

  if(keyCodes[32]){
    player.vx += Math.cos(player.a) * player.va;
    player.vy += Math.sin(player.a) * player.va;
    for(var reps = 0; reps < 5; reps++){
      var vel = (Math.random() * 0.9 + 0.1) * Math.sqrt(player.vx * player.vx + player.vy * player.vy);
      var r = (Math.random() - 0.5) * PI/vel/1.1;
      spawnParticle(player.radius * Math.cos(player.a + PI) + player.x, player.radius * Math.sin(player.a + PI) +  player.y, Math.cos(player.a + r) * -vel, Math.sin(player.a + r) * -vel);
    }
  }

  player.vf = 1 - player.vf;

  player.vx *= player.vf;
  player.vy *= player.vf;

  player.x += player.vx;
  player.y += player.vy;

  ctx.beginPath();
  ctx.fillStyle = "rgb(200, 200, 200)";
  ctx.arc(camera.x + player.x, camera.y + player.y, player.radius - 1, 0, TAU);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "rgb(100, 100, 100)";
  ctx.moveTo(camera.x + player.x, camera.y + player.y);
  ctx.arc(camera.x + player.x, camera.y + player.y, player.radius, PI + player.a - PI/10, PI + player.a + PI/10);
  ctx.fill();

  stats.innerHTML = "Air Friction: " + player.vf.toFixed(5);
  stats.appendChild(document.createElement("br"));
  stats.innerHTML += "Particles: " + particles.length;
  stats.appendChild(document.createElement("br"));
  stats.innerHTML += "x: " + player.x.toFixed(3);
  stats.appendChild(document.createElement("br"));
  stats.innerHTML += "y: " + player.y.toFixed(3);
}

function spawnParticle(x, y, vx, vy){
  particles.push({
    x: x, y: y,
    vx: vx, vy: vy,
    vf: 0.99,
    timeOffset: time,
    radius: Math.random() * 5
  });
}
