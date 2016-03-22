var c, ctx,
    mx = my = mux = muy = 0, md = false,
    PI = Math.PI, TAU = PI * 2,
    keyCodes = [];

var t = 0;

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

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, c.width, c.height);

  update();
}



function update(){
  //ctx.clearRect(0, 0, c.width, c.height);

  for(var reps = 0; reps < 20; reps++){

    var a = Math.PI/3 * t;
    var b = Math.pow(t, 1/4);
    var r2 = t/10;
    var r = 50 + t/10;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.moveTo(c.width/2 + r * Math.cos(a), c.height/2 +  r * Math.sin(a));
    ctx.lineTo(c.width/2 + r2 * Math.cos(b), c.height/2 +  r2 * Math.sin(b));
    ctx.stroke();

    t++;
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
