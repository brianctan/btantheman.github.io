var c, ctx, mx = my = pmx = pmy = 0, md = false, PI = Math.PI, TAU = PI * 2;

var t = 0;

var keyCodes = {};

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d", {alpha: false});

  windowResize();
  window.addEventListener("resize", windowResize, false);

  c.addEventListener("mousemove", mouseMove, false);
  c.addEventListener("mousedown", mouseDown, false);
  c.addEventListener("mouseup", mouseUp, false);

  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);

  /*
  for(var i = 0; i < 100; i++){
    var ran = Math.random() * 90 + 10;
    points.push(new Point(Math.random() * c.width, Math.random() * c.height, ran, 1));
  }

  */


  /*
  var m = 20;
  var r = Math.sqrt(m * PI) / 1 * DC;
  var s = 5;
  for(var x = 0; x <= s * r * 2; x += r * 2){
    for(var y = 0; y <= s * r * 2; y += r * 2){
      points.push(new Point(200 + x, 200 + y, m, 1));
    }
  }

  */

  var m = 30;
  var r = Math.sqrt(m * PI) / 1 * DC;
  var l = 10;
  var cx = c.width/2;
  var h = r * Math.sqrt(3);
  var cy = c.height - h * (l+1/2) - r;

  for(var i = 1; i <= l; i++){
    if(i%2 == 0){
      for(var x = 0 - Math.floor((i - 1)/2); x < i - Math.floor((i - 1)/2); x++){
        points.push(new Point(cx + (x - 1/2) * r * 2, cy + i * h, m, 1));
      }
    } else{
      for(var x = 0 - Math.floor((i - 1)/2); x < i - Math.floor((i - 1)/2); x++){
        points.push(new Point(cx + x * r * 2, cy + i * h, m, 1));
      }
    }
  }

  points.push(new Point(cx, 100, m, 1));
  shipProps.angle = -Math.PI/2;

  //points.push(new Point(c.width/2, c.height/2, 1000, 1));

  update();

  setInterval(function(){
    console.log(t);
    t = 0;
  }, 1000);
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  for(var i in points){
    var p = points[i];
    p.applyPhysics();
    p.draw();
  }

  t++;
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
  md = true;
  mouseMove(e);

  ship = null;
  for(var i in points){
    var p = points[i];
    if(distance(mx, my, p.x, p.y) <= p.size){
      ship = p;
      sdx = p.x - mx;
      sdy = p.y - my;
      break;
    }
  }
}

function mouseUp(e){
  setMousePosition(e);
  md = false;

  if(ship != null){
    ship.vx = mx - mpx;
    ship.vy = my - mpy;
  }
}

function setMousePosition(e){
  mpx = mx;
  mpy = my;
  mx = e.clientX;
  my = e.clientY;
}

function keyDown(e){
  keyCodes[e.keyCode] = true;
}

function keyUp(e){
  keyCodes[e.keyCode] = false;
}
