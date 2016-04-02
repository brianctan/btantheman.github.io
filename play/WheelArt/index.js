var c, ctx,
    mx = my = mux = muy = px = py = 0, md = false,
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

var angles = [];
var base = 0;
var baseSpeed = 0.0;

total = prompt("how many mirrors", 8);
for(var i = 0; i < total; i++){
  angles.push(i * TAU/total);
}

function update(){

  base += baseSpeed;

  var dist = Math.sqrt((mx - c.width/2)*(mx - c.width/2)+(my - c.height/2)*(my - c.height/2));
  var cangle = Math.atan2(my - c.height/2, mx - c.width/2) + base;
  var pdist = Math.sqrt((px - c.width/2)*(px - c.width/2)+(py - c.height/2)*(py - c.height/2));
  var pangle = Math.atan2(py - c.height/2, px - c.width/2) + base - baseSpeed;
  if(md){
    for(var i = 0; i < angles.length; i++){
      var a = angles[i];
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 3;
      ctx.moveTo(c.width/2 + Math.cos(pangle + a) * pdist, c.height/2 + Math.sin(pangle + a) * pdist);
      ctx.lineTo(c.width/2 + Math.cos(cangle + a) * dist, c.height/2 + Math.sin(cangle + a) * dist);
      ctx.stroke();
      //ctx.arc(c.width/2 + Math.cos(cangle + a) * dist, c.height/2 + Math.sin(cangle + a) * dist, 2, 0, TAU);
      //ctx.fill()
    }
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
  px = mx;
  py = my;
  mx = e.clientX;
  my = e.clientY;
}

function keyDown(e){
  keyCodes[e.keyCode] = true;
}

function keyUp(e){
  keyCodes[e.keyCode] = false;
}
