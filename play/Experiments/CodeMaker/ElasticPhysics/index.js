var c, ctx, mx = my = 0, md = false, PI = Math.PI, TAU = PI * 2;

var cx = cy = 0;

var points = [];

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

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
  ctx.lineWidth = "1";
  ctx.beginPath();
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, c.height);
  ctx.moveTo(0, cy);
  ctx.lineTo(c.width, cy);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
  ctx.lineWidth = "1";
  ctx.beginPath();
  ctx.moveTo(mx, 0);
  ctx.lineTo(mx, c.height);
  ctx.moveTo(0, my);
  ctx.lineTo(c.width, my);
  ctx.stroke();

  var xsum = ysum = 0;

  for(var i in points){
    var p = points[i];

    xsum += p.x;
    ysum += p.y;

    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.lineWidth = "1";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, TAU);
    ctx.stroke();

    for(var j in points){
      var q = points[j];
      ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(q.x, q.y);
      ctx.stroke();
    }
  }

  cx = xsum/points.length;
  cy = ysum/points.length;

  window.requestAnimationFrame(update);
}

window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function mouseMove(e){
  setMousePosition(e);

  if(md && false) points.push({
    x: mx,
    y: my
  });
}

function mouseDown(e){
  setMousePosition(e);
  md = true;

  points.push({
    x: mx,
    y: my
  });
}

function mouseUp(e){
  setMousePosition(e);
  md = false;

  linebreak = "";

  string = "function addPhysicsObjects" + String(Math.random()).replace(".", "") + "(x, y){";
  string += "var po = new PhysicsObject([]);" + linebreak + "";

  for(var i in points){
    var p = points[i];
    string += "var _" + i + " = new Point(x + " + (p.x - cx) + ", y + " + (p.y - cy) + ", 1, [], []);" + linebreak + "";
  }

  for(var i = 0; i < points.length; i++){
    var p = points[i];
    for(var j = 0; j < i; j++){
      var q = points[j];
      string += "_" + i + ".connections.push(_" + j + ");" + linebreak + "";
      string += "_" + i + ".elasticDistance.push(" + Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2)) + ");" + linebreak + "";
    }
  }

  string += "po.points.push(";

  for(var i in points){
    var p = points[i];
    string += "_" + i;
    if(i != points.length - 1) string += ", ";
  }

  string += ");" + linebreak + "objects.push(po);" + linebreak + "}"

  console.log(string);
}

function setMousePosition(e){
  mx = e.clientX;
  my = e.clientY;
}
