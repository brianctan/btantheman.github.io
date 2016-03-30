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

var angle = 0;
var speed = 0.01;

function update(){

  var dist = Math.sqrt((mx - c.width/2)*(mx - c.width/2)+(my - c.height/2)*(my - c.height/2));
  var atan = Math.atan2(my - c.height/2, mx - c.width/2);
  x = Math.cos(angle + atan) * dist;
  y = Math.sin(angle + atan) * dist;

  ctx.beginPath();
  ctx.arc(x, y, 10, 0, TAU);
  ctx.fill();

  ctx.save();
  ctx.rotate(speed);
  ctx.restore();
  angle -= speed;
  window.requestAnimationFrame(update);
}

window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  angle = 0;
  ctx.setTransform(1, 0, 0, 1, c.width >> 1, c.height >> 1);
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
