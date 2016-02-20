var c, ctx, dx = dy = mx = my = px = py = 0, md = false, PI = Math.PI, TAU = PI * 2, scale;

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

  update();
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
  ctx.lineWidth = "1";
  ctx.beginPath();
  ctx.moveTo(mx, 0);
  ctx.lineTo(mx, c.height);
  ctx.moveTo(0, my);
  ctx.lineTo(c.width, my);
  ctx.stroke();

  for(var i in points){
    var p = points[i];

    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.lineWidth = "1";
    ctx.beginPath();
    ctx.arc(p[0].x, p[0].y, 3, 0, TAU);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(p[1].x, p[1].y, 3, 0, TAU);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y);
    ctx.lineTo(p[1].x, p[1].y);
    ctx.stroke();
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

  if(md && false) points.push({
    x: mx,
    y: my
  });
}

function mouseDown(e){
  setMousePosition(e);
  md = true;

  dx = mx;
  dy = my;
}

function mouseUp(e){
  setMousePosition(e);
  md = false;

  points.push([{x: dx, y: dy}, {x:mx, y: my}]);

}

function setMousePosition(e){
  mx = e.clientX;
  my = e.clientY;
}
