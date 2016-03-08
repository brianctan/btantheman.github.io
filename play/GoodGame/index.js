var c, ctx,
    mx = my = mux = muy = 0, md = false, mm = false,
    PI = Math.PI, TAU = PI * 2,
    keyCodes = [], stats;

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

  stats = document.getElementById("stats");

  gameInit();
}


window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function mouseMove(e){
  mm = true;
  if(md){
    camera.x += e.clientX - mx;
    camera.y += e.clientY - my;
  }
  setMousePosition(e);
}

function mouseDown(e){
  setMousePosition(e);
  md = true;
  mm = false;
}

function mouseUp(e){
  mux = mx;
  muy = my;
  setMousePosition(e);
  md = false;
  if(!mm) gameMouseDown(e);
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
