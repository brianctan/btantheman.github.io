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

var r = 70, g = 50, b = 100;

function update(){
  //ctx.clearRect(0, 0, c.width, c.height);

  d = 20;
  s = 1;
  r = Math.round(Math.cos(mt * 2 * s) * d + 30);
  g = Math.round(Math.sin(mt * s) * d + 50);
  b = Math.round(Math.sin(mt * 2/3 * s) * d + 100)

  ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
  ctx.fillRect(0, 0, c.width, c.height);

  date = new Date();

  cx = c.width >> 1;
  cy = c.height >> 1;
  radius = Math.min(500, Math.max(250, Math.min((c.width >> 1) - PADDING, (c.height >> 1) - PADDING)));

  st = TAU * (date.getSeconds() + date.getMilliseconds()/1000)/60 - PI/2;//shortestAngleDisplacement(st, TAU * date.getSeconds()/60 - PI/2)/20;
  mt = 6 * TAU * (date.getMinutes() + (date.getSeconds() + date.getMilliseconds()/1000)/60)/60 - PI/2;
  ht = TAU * ((date.getHours()%12) + (date.getMinutes() + (date.getSeconds() + date.getMilliseconds()/1000)/60)/60)/12 - PI/2;

  cradius = 35;
  maxDist = Math.pow(Math.max(c.height >> 1, c.width >> 1), 2);
  mradius = radius - cradius;
  minx = cx + mradius * Math.cos(mt);
  miny = cy + mradius * Math.sin(mt);

  mdist = Math.sqrt((minx - cx) * (minx - cx) + (miny - cy) * (miny - cy));

  mtdist = Math.sqrt(mdist * mdist - cradius * cradius);

  mtangle = Math.atan(mtdist/cradius);
  mangle = Math.atan2(cy - miny, cx - minx);

  sradius = cradius + 50;
  secx = minx + sradius * Math.cos(st);
  secy = miny + sradius * Math.sin(st);
  swidth = 15;

  sdist = Math.sqrt((secx - cx) * (secx - cx) + (secy - cy) * (secy - cy));

  stdist = Math.sqrt(sdist * sdist - swidth * swidth);

  stangle = Math.atan(stdist/swidth);
  sangle = Math.atan2(cy - secy, cx - secx);

  cursorRadius = 10;
  cdist = Math.sqrt((mx - cx) * (mx - cx) + (my - cy) * (my - cy));

  ctdist = Math.sqrt(cdist * cdist - cursorRadius * cursorRadius);

  ctangle = Math.atan(ctdist/cursorRadius);
  cangle = Math.atan2(cy - my, cx - mx);

  d = 10;
  shadowColor = "rgba(" + (r-d) + ", " + (g-d) + ", " + (b-d) + ", 0.95)";
  pathColor = "rgba(255, 255, 255, 0.1)";

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(cx, cy, 50, 0, TAU);
  ctx.moveTo(minx, miny);
  ctx.arc(minx, miny, cradius, 0, TAU);
  ctx.moveTo(secx, secy);
  ctx.arc(secx, secy, swidth, 0, TAU);
  ctx.moveTo(mx, my);
  ctx.arc(mx, my, cursorRadius, 0, TAU);
  ctx.fill();

  ctx.strokeStyle = pathColor;
  ctx.setLineDash([10]);
  ctx.beginPath();
  ctx.arc(cx, cy, mradius, 0, TAU);
  ctx.moveTo(minx + sradius, miny);
  ctx.arc(minx, miny, sradius, 0, TAU);
  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "900 30px sans-serif";
  ctx.fillText(date.getHours()%12 == 0 ? 12 : date.getHours()%12, cx, cy + 10);
  ctx.font = "100 20px sans-serif";
  ctx.fillText(date.getMinutes(), minx, miny + 7);
  ctx.font = "100 12px sans-serif";
  ctx.fillText(date.getSeconds(), secx, secy + 4);

  ctx.fillStyle = shadowColor;
  ctx.beginPath();
  ctx.arc(minx, miny, cradius, mangle + mtangle, mangle - mtangle);
  ctx.lineTo(minx + cradius * Math.cos(mangle - mtangle) - maxDist * Math.cos(mangle - mtangle + PI/2),
             miny + cradius * Math.sin(mangle - mtangle) - maxDist * Math.sin(mangle - mtangle + PI/2));
  ctx.lineTo(minx + cradius * Math.cos(mangle + mtangle) - maxDist * Math.cos(mangle + mtangle - PI/2),
             miny + cradius * Math.sin(mangle + mtangle) - maxDist * Math.sin(mangle + mtangle - PI/2));
  ctx.closePath();
  ctx.moveTo(secx + swidth * Math.cos(sangle + stangle), secy + swidth * Math.sin(sangle + stangle));
  ctx.arc(secx, secy, swidth, sangle + stangle, sangle - stangle);
  ctx.lineTo(secx + swidth * Math.cos(sangle - stangle) - maxDist * Math.cos(sangle - stangle + PI/2),
             secy + swidth * Math.sin(sangle - stangle) - maxDist * Math.sin(sangle - stangle + PI/2));
  ctx.lineTo(secx + swidth * Math.cos(sangle + stangle) - maxDist * Math.cos(sangle + stangle - PI/2),
             secy + swidth * Math.sin(sangle + stangle) - maxDist * Math.sin(sangle + stangle - PI/2));
  ctx.closePath();
  if((cx - mx) * (cx - mx) + (cy - my) * (cy - my) > 2500){
    ctx.moveTo(mx + cursorRadius * Math.cos(cangle + ctangle), my + cursorRadius * Math.sin(cangle + ctangle));
    ctx.arc(mx, my, cursorRadius, cangle + ctangle, cangle - ctangle);
    ctx.lineTo(mx + cursorRadius * Math.cos(cangle - ctangle) - maxDist * Math.cos(cangle - ctangle + PI/2),
               my + cursorRadius * Math.sin(cangle - ctangle) - maxDist * Math.sin(cangle - ctangle + PI/2));
    ctx.lineTo(mx + cursorRadius * Math.cos(cangle + ctangle) - maxDist * Math.cos(cangle + ctangle - PI/2),
               my + cursorRadius * Math.sin(cangle + ctangle) - maxDist * Math.sin(cangle + ctangle - PI/2));
    ctx.closePath();
  }
  ctx.fill();

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
