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

  date = new Date();
  st = TAU * date.getSeconds()/60 - PI/2;
  mt = TAU * date.getMinutes()/60 - PI/2;
  ht = TAU * (date.getHours()%12)/12 - PI/2;

  update();
}

var radius = 200, cx, cy;

var PADDING = 100;

var date;

var st, mt, ht;

function update(){
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, c.width, c.height);

  date = new Date();

  cx = c.width >> 1;
  cy = c.height >> 1;
  radius = Math.max(200, Math.min((c.width >> 1) - PADDING, (c.height >> 1) - PADDING));

  st = TAU * (date.getSeconds() + date.getMilliseconds()/1000)/60 - PI/2;//shortestAngleDisplacement(st, TAU * date.getSeconds()/60 - PI/2)/20;
  mt = TAU * (date.getMinutes() + (date.getSeconds() + date.getMilliseconds()/1000)/60)/60 - PI/2;
  ht = TAU * ((date.getHours()%12) + (date.getMinutes() + (date.getSeconds() + date.getMilliseconds()/1000)/60)/60)/12 - PI/2;

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(cx, cy, 50, 0, TAU);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "900 30px sans-serif";
  ctx.fillText(date.getHours()%12 == 0 ? 12 : date.getHours()%12, cx, cy + 10);

  ctx.fillStyle = "white";
  cradius = 35;
  mradius = radius - cradius;

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(cx, cy, mradius, 0, TAU);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.setLineDash([15]);
  ctx.stroke();

  minx = cx + mradius * Math.cos(mt);
  miny = cy + mradius * Math.sin(mt);

  ctx.beginPath();
  ctx.arc(minx, miny, cradius, 0, TAU);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "100 20px sans-serif";
  ctx.fillText(date.getMinutes(), minx, miny + 7);

  sradius = cradius + 50;

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(minx, miny, sradius, 0, TAU);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.setLineDash([15]);
  ctx.stroke();

  secx = minx + sradius * Math.cos(st);
  secy = miny + sradius * Math.sin(st);

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(secx, secy, 15, 0, TAU);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "100 12px sans-serif";
  ctx.fillText(date.getSeconds(), secx, secy + 4);

  /*

  ctx.beginPath();
  ctx.arc(cx, cy, hradius, 0, TAU);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.setLineDash([15]);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx + hradius * Math.cos(ht), cy + hradius * Math.sin(ht), cradius, 0, TAU);
  ctx.fill();

  */

  /*
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  var w = 0.01;
  ctx.arc(cx, cy, radius, st - w, st + w);
  ctx.fill();

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  var w = 0.05;
  ctx.arc(cx, cy, radius * 0.95, mt - w, mt + w);
  ctx.fill();

  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  var w = 0.1;
  ctx.arc(cx, cy, radius * 0.9, ht - w, ht + w);
  ctx.fill();
  */

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

function normalizeAngle(n){
  while(n < 0){
    n += Math.PI * 2;
  }
  while(n > Math.PI * 2){
    n -= Math.PI * 2;
  }
  return n;
}

function shortestAngleDisplacement(from, to){
  var diff = normalizeAngle(to - from);
  var comp = normalizeAngle(Math.PI * 2 - diff);
  if(diff >= comp){
    return -comp;
  }
  if(comp > diff){
    return diff;
  }
}
