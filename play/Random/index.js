var c, ctx,
    mx = my = mux = muy = 0, md = false,
    PI = Math.PI, TAU = PI * 2,
    keyCodes = [];

var values = [];
var range = 100;
var heightMultiplier = 1;
var distributionMultiplier = 10;

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

  for(var i = 0; i < range; i++){
    values[i] = 0;
  }

  update();
}

var index = 0;

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  for(var i = 0; i < values.length; i++){
    ctx.beginPath();
    ctx.moveTo(10 + i * distributionMultiplier, 10);
    ctx.lineTo(10 + i * distributionMultiplier, 10 + values[i] * heightMultiplier);
    ctx.stroke();
  }

  for(var i = 0; i < 10; i++){
    //index = Math.floor((1/2 + Math.sin(Math.random() * Math.PI * 2)/2) * range);
    index = Math.floor(Math.random() * range);
    values[index]++;
  }

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
