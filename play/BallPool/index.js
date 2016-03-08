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

  windowPosition.x = window.screenX + 0;
  windowPosition.y = window.screenY + 0;

  for(var i = 0; i < Number(prompt("how many balls")); i++){
    new Ball(Math.random() * c.width, Math.random() * c.height, Math.random() * 90 + 10);
  }

  update();
}

function update(){
  //ctx.fillStyle = "rgba(" + 0x00 + ", " + 0x55 + ", " + 0x8C + ", 0.05)";
  ctx.fillStyle = "rgba(" + 0x00 + ", " + 0x0 + ", " + 0x0 + ", 0.05)";
  //ctx.fillStyle = "rgba(" + Math.floor(100 ) + "," + Math.floor(0) + "," + Math.floor(100) + ", 0.5)";

  ctx.fillRect(0, 0, c.width, c.height);

  windowPosition.vx = (window.screenX - windowPosition.x);
  windowPosition.vy = (window.screenY - windowPosition.y);

  windowPosition.x = window.screenX;
  windowPosition.y = window.screenY;

  for(var i in balls){
    balls[i].update();
    balls[i].draw();
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
  G = 0.1;
  setMousePosition(e);
  md = true;
}

function mouseUp(e){
  G = 0;
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
