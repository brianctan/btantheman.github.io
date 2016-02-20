var c, ctx,
    mx = my = mux = muy = 0, md = false,
    PI = Math.PI, TAU = PI * 2,
    keyCodes = [];

function windowLoad(){
  socket = new WebSocket("ws://" + prompt("IP", "localhost") + ":8080");

  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  windowResize();
  window.addEventListener("resize", windowResize, false);

  c.addEventListener("mousemove", mouseMove, false);
  c.addEventListener("mousedown", mouseDown, false);
  c.addEventListener("mouseup", mouseUp, false);

  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);

  player.name = prompt("What's your name?", ["Guest", "Poop Lover", "Tree Hugger"][Math.floor(Math.random() * 2)]);

  socket.onopen = socketOpen;

  socket.onmessage = socketMessage;

  socket.onclose = socketClose;

  update();
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  players.forEach(function(p){
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, TAU);
    ctx.stroke();
  });

  player.x = mx;
  player.y = my;

  ctx.beginPath();
  ctx.arc(mx, my, 5, 0, TAU);
  ctx.fill();

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
