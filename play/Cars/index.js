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

  for(var i = 0; i < 15; i++){
    cars.push(new Car(Math.random() * c.width, Math.random() * c.height));
    cars[i].auto = true;
  }

  player = cars[0];
  player.auto = false;

  update();
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  ctx.strokeStyle = "rgb(230, 230, 230)";
  ctx.lineWidth = roadWidth;
  ctx.lineCap = "round";
  ctx.beginPath();
  for(var i = 0; i < road.length; i++){
    var p = road[i];
    var q = road[(i+1)%road.length];
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(q.x, q.y);
    /*
    for(var j in road){
      if(i != j){
        var p = road[i];
        var q = road[j];
        var dist = Math.sqrt((p.x - q.x)*(p.x - q.x)+(p.y - q.y)*(p.y - q.y));
        if(dist <= roadThresh){
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
        }
      }
    }
    */
  }
  ctx.stroke();

  for(var i in cars){
    var car = cars[i];
    if(player == car){
      car.accelerate = keyCodes[38];
      car.reverse = keyCodes[40];
      if(keyCodes[37]) car.turn -= car.turnSpeed;
      if(keyCodes[39]) car.turn += car.turnSpeed;

      if(!keyCodes[37] && !keyCodes[39]){
        car.turn -= Math.sign(car.turn) * Math.min(Math.abs(car.turn), car.turnSpeed);
      }

      if(keyCodes[32]){
        car.points[0].acc -= Math.sign(car.points[0].acc) * Math.min(Math.abs(car.points[0].acc), car.points[0].accSpeed);
        car.points[0].vx *= car.points[0].f;
        car.points[0].vy *= car.points[0].f;
        car.points[1].vx *= car.points[0].f;
        car.points[1].vy *= car.points[0].f;
      }
    }
    car.update();
    car.draw();
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
  road.push({
    x: mx,
    y: my
  });
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
