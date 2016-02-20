var c, ctx,
    mx = my = mux = muy = 0, md = false,
    PI = Math.PI, TAU = PI * 2,
    keyCodes = [];

var chunk;

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  chunk = new Chunk(128);

  windowResize();
  window.addEventListener("resize", windowResize, false);

  c.addEventListener("mousemove", mouseMove, false);
  c.addEventListener("mousedown", mouseDown, false);
  c.addEventListener("mouseup", mouseUp, false);

  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);

  update();
}

var points = [];

function addPoint(x, y){
  var p = {x: x, y: y};
  points.push(p);
  chunk.push(p);
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  //draw grid

  for(var i = 0; i < c.width; i += chunk.chunkSize){
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, c.height);
    ctx.stroke();
  }

  for(var i = 0; i < c.height; i += chunk.chunkSize){
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(c.width, i);
    ctx.stroke();
  }

  for(var i in points){
    var p = points[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, TAU);
    ctx.fill();
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
