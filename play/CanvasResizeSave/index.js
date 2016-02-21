var c, ctx, cp = {rotation: 0, x: 0, y: 0, sx: 0, sy: 0},
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

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  nx = -cp.x + mx;
  ny = -cp.y + my;

  cp.x += nx;
  cp.y += ny;
  ctx.translate(nx, ny);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(c.width, 0);
  ctx.stroke();

  window.requestAnimationFrame(update);
}

window.addEventListener("load", windowLoad, false);

function windowResize(){
  cp.rotation = 0;
  cp.x = 0;
  cp.y = 0;
  cp.sx = 0;
  cp.sy = 0;
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
