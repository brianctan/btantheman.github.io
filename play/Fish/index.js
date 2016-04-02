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

  for(var i = 0; i < 100; i++){
    fishes.push(new Fish(Math.random() * c.width, Math.random() * c.height));
  }

  update();
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  for(var i = 0; i < food.length; i++){
    var f = food[i];
    f.update();
    f.draw();
  }

  for(var i = 0; i < fishes.length; i++){
    var f = fishes[i];
    f.update();
    f.draw();
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

  food.push(new Food(mx, my));
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
  if(e.keyCode == 32){
    food.push(new Food(mx + (Math.random() - 0.5) * 50, my + (Math.random() - 0.5) * 50));
  }
}

function keyUp(e){
  keyCodes[e.keyCode] = false;
}
