var c, ctx,
    mx = my = mux = muy = 0, md = false,
    PI = Math.PI, TAU = PI * 2,
    keyCodes = [];

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  windowResize();
  window.addEventListener("resize", windowResize, false);

  c.addEventListener("mousemove", mouseMove, false);
  c.addEventListener("mousedown", mouseDown, false);
  c.addEventListener("mouseup", mouseUp, false);

  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);

  update();
}

var ISO = {
  ANGLE: Math.PI/6,
  GRID_SIZE: 50
};

var player = {
  x: 0,
  y: 0,
  z: 0
}

function getIsoPoint(x, y, z){
  return {
    x: ISO.GRID_SIZE * x * Math.cos(0 - ISO.ANGLE) + ISO.GRID_SIZE * z * Math.cos(Math.PI - ISO.ANGLE),
    y: -(ISO.GRID_SIZE * x * Math.sin(0 - ISO.ANGLE) - ISO.GRID_SIZE * z * Math.sin(Math.PI - ISO.ANGLE)) + y * (ISO.GRID_SIZE * Math.sin(0 - ISO.ANGLE) - ISO.GRID_SIZE * Math.sin(Math.PI - ISO.ANGLE))
  }
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  r = 20;
  s = 0.1;

  if(keyCodes[65]){
    player.x -= s;
  }

  if(keyCodes[68]){
    player.x += s;
  }

  if(keyCodes[87]){
    player.z -= s;
  }

  if(keyCodes[83]){
    player.z += s;
  }

  if(keyCodes[32]){
    player.y += 0.2;
  }

  player.y = Math.max(player.y - 0.1, 0);

  for(var x = -r; x <= r; x++){
    var p1 = getIsoPoint(x, 0, -r);
    var p2 = getIsoPoint(x, 0, r);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  for(var x = -r; x <= r; x++){
    var p1 = getIsoPoint(-r, 0, x);
    var p2 = getIsoPoint(r, 0, x);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  var p = getIsoPoint(player.x, player.y, player.z);

  ctx.beginPath();
  ctx.arc(p.x, p.y, 10, 0, TAU);
  ctx.stroke();

  window.requestAnimationFrame(update);
}


window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function mouseMove(e){
  setMousePosition(e);
}

function mouseDown(e){
  setMousePosition(e);
  md = true;
}

function mouseUp(e){
  mux = mx;
  muy = my;
  setMousePosition(e);
  md = false;
}

function setMousePosition(e){
  mx = e.clientX;
  my = e.clientY;
}

function keyDown(e){
  keyCodes[e.keyCode] = true;
}

function keyUp(e){
  keyCodes[e.keyCode] = false;
}
