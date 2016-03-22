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

var Z_STEPS = -10;

var DOTS = 1000;
var RADIUS = 200;
var SPACE = 1;

function update(){
  //ctx.clearRect(0, 0, c.width, c.height);
  ctx.scale(1.005, 1.005);
  var CX = c.width >> 1;
  var CY = c.height >> 1;

  for(var x = -DOTS; x <= DOTS; x++){
    var X = x * SPACE + Math.sin(Z_STEPS/5) * 25;
    var Y = Math.sin(Z_STEPS/5) * 2 + Z_STEPS * SPACE + Math.cos(x/10) * 10;
    //var Y = -Math.pow(Z_STEPS - 200, 2)/100 + Z_STEPS * SPACE + Math.cos(x/10) * 10;

    ctx.fillRect(X, Y, 1, 1);
  }

  Z_STEPS++;

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
