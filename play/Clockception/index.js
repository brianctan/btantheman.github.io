var c, ctx,
    mx = my = mux = muy = 0, md = false,
    PI = Math.PI, TAU = PI * 2,
    keyCodes = [];

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  c.style.minWidth = (clockRadius * 2 * width + clockRadius) + "px";
  c.style.minHeight = (clockRadius * 2 * height + clockRadius) + "px";

  windowResize();
  window.addEventListener("resize", windowResize, false);

  c.addEventListener("mousemove", mouseMove, false);
  c.addEventListener("mousedown", mouseDown, false);
  c.addEventListener("mouseup", mouseUp, false);

  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);

  for(var x = 0; x < width; x++){
    clocks.push([]);
    for(var y = 0; y < height; y++){
      clocks[x].push({
        m: Math.random() * TAU, h: Math.random() * TAU,
        mt: DEFAULT[0], ht: DEFAULT[1], t: Math.random() * 20 + 30,
        reset: true,
        timeOffset: 0
      });
    }
  }



  update();
}

var tick = 0;

var displayDuration = 7500;
var minuteSwitchDuration = 5000;

var clocks = [];

var clockRadius = 25;
var minRadius = 17;
var hourRadius = 14;

var startX = clockRadius/2;
var startY = clockRadius/2;

var width = 20;
var height = 8;

var clockSpeed = 0.02;

var date;

var resetTimeout;

var cleared = true;

function update(){
  ctx.fillStyle = "#C0CAB5";
  //ctx.lineCap = "round";

  ctx.lineWidth = 3;
  ctx.fillRect(0, 0, c.width, c.height);

  startX = c.width/2 - clockRadius * 2 * (width-1)/2
  startY = c.height/2 - clockRadius * 2 * (height-1)/2

  date = new Date();

  DEFAULT[0] = TAU * (date.getMinutes() + (date.getSeconds() + date.getMilliseconds()/1000)/60)/60 - PI/2;
  DEFAULT[1] = TAU * ((date.getHours()%12) + (date.getMinutes() + (date.getSeconds() + date.getMilliseconds()/1000)/60)/60)/12 - PI/2;

  if(date.getSeconds() >= 60 - minuteSwitchDuration/1000 || date.getSeconds() <= minuteSwitchDuration/1000){
    spell(getStringTime());
    cleared = false;
  } else{
    if(!cleared){
      resetClocks();
      cleared = true;
    }
  }

  for(var x = 0; x < width; x++){
    for(var y = 0; y < height; y++){
      var clock = clocks[x][y];

      if(clock.reset && tick >= clock.timeOffset){
        clock.mt = DEFAULT[0];
        clock.ht = DEFAULT[1];
      }

      if(true){
        /*
        var md = shortestAngleDisplacement(clock.m, clock.mt);
        clock.m += Math.min(Math.abs(md), clockSpeed);
        var hd = shortestAngleDisplacement(clock.h, clock.ht);
        clock.h += Math.min(Math.abs(hd), clockSpeed * 0.75);

        /**/

        clock.m += shortestAngleDisplacement(clock.m, clock.mt)/clock.t;
        clock.h += shortestAngleDisplacement(clock.h, clock.ht)/clock.t;

        /**/
      }
      ctx.beginPath();
      ctx.strokeStyle = "rgba(" + 0x76 + ", " + 0x7C + ", " + 0x70 + ", 0.1)";
      ctx.moveTo(startX + x * clockRadius * 2 + clockRadius, startY + y * clockRadius * 2);
      ctx.arc(startX + x * clockRadius * 2, startY + y * clockRadius * 2, clockRadius, 0, TAU);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(" + 0x76 + ", " + 0x7C + ", " + 0x70 + ", 1)";
      ctx.moveTo(startX + x * clockRadius * 2 + minRadius * Math.cos(clock.m), startY + y * clockRadius * 2 + minRadius * Math.sin(clock.m));
      ctx.lineTo(startX + x * clockRadius * 2, startY + y * clockRadius * 2);
      ctx.lineTo(startX + x * clockRadius * 2 + hourRadius * Math.cos(clock.h), startY + y * clockRadius * 2 + hourRadius * Math.sin(clock.h));
      ctx.stroke();
    }
  }



  tick++;
  window.requestAnimationFrame(update);
}

function displayCharacter(sx, sy, set){
  for(var y = 0; y < set.length; y++){
    for(var x = 0; x < set[y].length; x++){
      if(sx + x < width && sy + y < height){
        clock = clocks[sx + x][sy + y];
        var r = 0;
        if(set[y][x] == DEFAULT){
          clock.reset = true;
        } else{
          clock.reset = false;
          clock.mt = set[y][x][r];
          clock.ht = set[y][x][(r + 1)%2];
        }
        clock.timeOffset = tick;
      }
    }
  }
}

function resetClocks(){
  for(var x = 0; x < width; x++){
    for(var y = 0; y < height; y++){
      var clock = clocks[x][y];
      clock.reset = true;
      clock.timeOffset = tick + (x) * 5 + (y) * 5;
    }
  }
}

function getStringTime(){
  var a = new Date().toLocaleTimeString().split(":");
  a.pop();
  return a.join(":");
}

function spell(s){
  var y = 1;
  var x = (width >> 1) - (getStringWidth(s) >> 1);
  resetClocks();
  var split = s.split("");
  var offset = 0;
  for(var i = 0; i < split.length; i++){
    var char = split[i];
    displayCharacter(x + offset, y, characters[char]);
    offset += getCharacterWidth(char);
  }
}

window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = c.offsetWidth;
  c.height = c.offsetHeight;
}

function mouseMove(e){
  setMousePosition(e);
}

function mouseDown(e){
  if(resetTimeout) clearTimeout(resetTimeout);
  spell(getStringTime());
  resetTimeout = setTimeout(resetClocks, displayDuration);
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
  n = n % (Math.PI * 2);
  if(n < 0) n += Math.PI * 2;
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
