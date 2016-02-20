var c, ctx, v;
var mx = my = dx = dy = ux = uy = 0;

function onLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  v = new VCam(c, ctx, 300, 300, 600, 600, Math.PI/2);

  c.addEventListener("mousemove", mouseMove, false);
  c.addEventListener("mousedown", mouseDown, false);
  c.addEventListener("mosueup", mouseUp, false);
  window.addEventListener("resize", resize, false);
  resize();

  update();
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  ctx.beginPath();
  v.moveTo(v.x + 0, v.y + 0);
  v.lineTo(v.x + v.width, v.y + 0);
  v.lineTo(v.x + v.width, v.y + v.height);
  v.lineTo(v.x + 0, v.y + v.height);
  ctx.closePath();

  v.moveTo(v.x + 0, v.y + 0);
  v.lineTo(v.x + v.width, v.y + v.height);

  v.moveTo(v.x + v.width, v.y + 0);
  v.lineTo(v.x + 0, v.y + v.height);

  v.arc(100, 100, 100, Math.PI, 0);
  v.moveTo(400, 100);
  v.arc(300, 100, 100, Math.PI * 2, Math.PI);

  ctx.stroke();

  v.fillRect(0, 200, 200, 200);

  v.x += 1;
  v.y = v.height/2;
  //v.height *= 0.9999;
  //v.width *= 0.9999;
  //v.angle += Math.PI/720;

  window.requestAnimationFrame(update);
}

window.addEventListener("load", onLoad, false);

function mouseMove(e){
  mx = e.clientX;
  my = e.clientY;
}

function mouseDown(e){
  dx = e.clientX;
  dy = e.clientY;
}

function mouseUp(e){
  ux = e.clientX;
  uy = e.clientY;
}

function resize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}
