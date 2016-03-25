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

var planets = [];

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
  sradius = cradius + 50;
  secx = minx + sradius * Math.cos(st);
  secy = miny + sradius * Math.sin(st);
  swidth = 15;
  cursorRadius = 10;

  d = 10;
  shadowColor = "rgba(" + (r-d) + ", " + (g-d) + ", " + (b-d) + ", 0.95)";
  d = -20;
  pathColor = "rgb(" + (r-d) + ", " + (g-d) + ", " + (b-d) + ")";

  ctx.strokeStyle = pathColor;
  ctx.setLineDash([10]);
  ctx.beginPath();
  ctx.arc(cx, cy, mradius, 0, TAU);
  ctx.moveTo(minx + sradius, miny);
  ctx.arc(minx, miny, sradius, 0, TAU);
  ctx.stroke();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(cx, cy, 50, 0, TAU);
  ctx.moveTo(minx, miny);
  ctx.arc(minx, miny, cradius, 0, TAU);
  ctx.moveTo(secx, secy);
  ctx.arc(secx, secy, swidth, 0, TAU);
  ctx.moveTo(mx, my);
  ctx.arc(mx, my, cursorRadius, 0, TAU);
  eatSpeed = 0.1;
  for(var i in planets){
    var p = planets[i];
    p.angle += p.multiplier;
    p.x = cx + p.centerRadius * Math.cos(p.angle);
    p.y = cy + p.centerRadius * Math.sin(p.angle);
    for(var j in planets){
      var q = planets[j];
      if(Math.sqrt((p.x-q.x)*(p.x-q.x)+(p.y-q.y)*(p.y-q.y)) < p.radius + q.radius && q != p){
        q.radius -= eatSpeed;
      }
    }
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.radius, 0, TAU);

    if(Math.sqrt((p.x-minx)*(p.x-minx)+(p.y-miny)*(p.y-miny)) < p.radius + cradius ||
       Math.sqrt((p.x-secx)*(p.x-secx)+(p.y-secy)*(p.y-secy)) < p.radius + swidth){
         p.radius -= eatSpeed;
    }

    if(p.radius <= 2) planets.splice(i, 1);
  }
  ctx.fill();

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
  drawShadow(minx, miny, cradius, cx, cy);
  drawShadow(secx, secy, swidth, cx, cy);
  if((cx - mx) * (cx - mx) + (cy - my) * (cy - my) > 2500){
    drawShadow(mx, my, cursorRadius, cx, cy);
  }
  for(var i in planets){
    var p = planets[i];
    drawShadow(p.x, p.y, p.radius, cx, cy);
  }
  ctx.fill();

  window.requestAnimationFrame(update);
}

function drawShadow(x, y, r, cenx, ceny){
  dist = Math.sqrt((x - cenx) * (x - cenx) + (y - ceny) * (y - ceny));
  tdist = Math.sqrt(dist * dist - r * r);
  tangle = Math.atan(tdist/r);
  angle = Math.atan2(ceny - y, cenx - x);
  lx = x + r * Math.cos(angle - tangle);
  ly = y + r * Math.sin(angle - tangle);
  rx = x + r * Math.cos(angle + tangle);
  ry = y + r * Math.sin(angle + tangle);
  ctx.moveTo(rx, ry);
  //bd = 0;
  //br = Math.sqrt((x + bd * Math.cos(angle) - lx) * (x + bd * Math.cos(angle) - lx) + (y + bd * Math.sin(angle) - ly) * (y + bd * Math.sin(angle) - ly));
  //mangle = Math.atan2((tdist - bd)/br);
  //ctx.arc(x + bd * Math.cos(angle), y + bd * Math.sin(angle), br, angle + (mangle), angle - (mangle));
  ctx.arc(x, y, r, angle + tangle, angle - tangle);
  ctx.lineTo(x + r * Math.cos(angle - tangle) - maxDist * Math.cos(angle - tangle + PI/2),
             y + r * Math.sin(angle - tangle) - maxDist * Math.sin(angle - tangle + PI/2));
  ctx.lineTo(x + r * Math.cos(angle + tangle) - maxDist * Math.cos(angle + tangle - PI/2),
             y + r * Math.sin(angle + tangle) - maxDist * Math.sin(angle + tangle - PI/2));
  ctx.closePath();
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
  var r = 0;
  do{
    r = (Math.random() - 0.5) * 0.005;
  } while(r == 0);
  planets.push({
    centerRadius: Math.sqrt((mx - cx) * (mx - cx) + (my - cy) * (my - cy)),
    angle: Math.atan2(my - cy, mx - cx),
    radius: Math.random() * 9 + 1,
    multiplier: r,
    random: Math.random() * PI
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
