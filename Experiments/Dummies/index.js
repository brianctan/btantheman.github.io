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

  for(var i = 0; i < 50; i++){
    dummies.push(new Dummy(Math.random() * c.width, Math.random() * c.height, Math.floor(Math.random() * 0)));
  }

  for(var i = 0; i < 3; i++){
    foodSources.push(new FoodSource(Math.random() * c.width, Math.random() * c.height, Math.random() * 1000));
  }

  for(var i = 0; i < 4; i++){
    bases.push(new Base(Math.random() * c.width, Math.random() * c.height, Math.floor(Math.random() * 0)));
  }

  update();
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  for(var i in foodSources){
    var f = foodSources[i];

    f.draw();
  }

  for(var i in bases){
    var b = bases[i];

    b.draw();
  }

  for(var i in dummies){
    var d = dummies[i];

    d.update();
    d.draw();
  }

  time++;
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
