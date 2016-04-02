var c, ctx,
    mx = my = mux = muy = 0, md = false, cdx = 0, cdy = 0,
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

  var total = 0;
  for(var i = 0; i < total; i++){
    var length = magnetWidth;// + (total - i - 1) * magnetWidth * 2;
    var x = Math.random() * c.width;
    var y = Math.random() * c.height;
    var a = Math.random() * TAU;
    /*var b = i/total * TAU;
    var a = b + PI * (i % 2);
    var r = 200;
    var x = c.width/2 + r * Math.cos(b);
    var y = c.height/2 + r * Math.sin(b);*/
    magnets.push(new Magnet(x, y, Math.cos(a) * length + x, Math.sin(a) * length + y, 100));
  }

  update();
}

var magnets = [];
var magnetWidth = 30;
var F = 0.99, B = -0.5;
var selected = null;
var speed = 1;

function update(){
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, c.width, c.height);

  for(var reps = 0; reps < speed; reps++){
    for(var i = 0; i < magnets.length; i++){
      var m = magnets[i];

      for(var j = 0; j < magnets.length; j++){
        var n = magnets[j];
        if(m != n){
          for(var k = 0; k < m.points.length; k++){
            for(var l = 0; l < n.points.length; l++){
              var p = m.points[k];
              var q = n.points[l];
              var attraction = k == l ? -1 : 1;
              var dx = (p.x - q.x);
              var dy = (p.y - q.y);
              var dist2 = dx * dx + dy * dy;
              var dist = Math.sqrt(dist2);
              var angle = Math.atan2(dy, dx);
              p.vx -= Math.cos(angle) * attraction * n.strength / dist2;
              p.vy -= Math.sin(angle) * attraction * n.strength / dist2;

              if(dist < magnetWidth){
                var diff = (magnetWidth - dist)/dist;
                var s1 = 0.5;

                var cx = dx * diff * s1;
                var cy = dy * diff * s1;

                p.vx += cx;
                p.vy += cy;
                q.vx -= cx;
                q.vy -= cy;

                p.x += cx;
                p.y += cy;
                q.x -= cx;
                q.y -= cy;
              }
            }
          }
        }
      }

      var p = m.points[0], q = m.points[1];

      var dx = p.x - q.x;
      var dy = p.y - q.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var diff = (m.length - dist)/dist;
      var s1 = 0.5;

      p.vx += diff * dx * s1;
      p.vy += diff * dy * s1;
      q.vx -= diff * dx * s1;
      q.vy -= diff * dy * s1;
      p.x += diff * dx * s1;
      p.y += diff * dy * s1;
      q.x -= diff * dx * s1;
      q.y -= diff * dy * s1;

      for(var j = 0; j < m.points.length; j++){
        var p = m.points[j];
        if(p == selected){
          p.x = mx + cdx;
          p.y = my + cdy;
        } else{
          p.vx *= F;
          p.vy *= F;
          p.x += p.vx;
          p.y += p.vy;
        }

        if(p.x < magnetWidth/2){
          p.x = magnetWidth/2;
          p.vx *= B;
        }

        if(p.y < magnetWidth/2){
          p.y = magnetWidth/2;
          p.vy *= B;
        }

        if(p.x > c.width - magnetWidth/2){
          p.x = c.width - magnetWidth/2;
          p.vx *= B;
        }

        if(p.y > c.height - magnetWidth/2){
          p.y = c.height - magnetWidth/2;
          p.vy *= B;
        }

        if(Math.sqrt((p.x - mx) * (p.x - mx) + (p.y - my) * (p.y - my)) < magnetWidth/2 && md && selected == null){
          selected = p;
          cdx = p.x - mx;
          cdy = p.y - my;
        }
      }

      if(reps == 0){
        ctx.beginPath();
        ctx.strokeStyle = "#666";
        ctx.lineWidth = (magnetWidth);
        ctx.moveTo(m.points[0].x, m.points[0].y);
        ctx.lineTo(m.points[1].x, m.points[1].y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(m.points[0].x, m.points[0].y, magnetWidth/2, 0, TAU);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#C00";
        ctx.arc(m.points[1].x, m.points[1].y, magnetWidth/2, 0, TAU);
        ctx.fill();
      }
    }
  }

  window.requestAnimationFrame(update);
}

window.addEventListener("load", windowLoad, false);

function Magnet(x1, y1, x2, y2, strength){
  this.points = [
    {
      x: x1,
      y: y1,
      vx: 0, vy: 0
    },
    {
      x: x2,
      y: y2,
      vx: 0, vy: 0
    }
  ];
  this.length = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
  this.strength = strength;
}

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function mouseMove(e){
  if(selected){
    selected.vx = (e.clientX - mx)/10;
    selected.vy = (e.clientY - my)/10;
  }
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
  selected = null;
}

function setMousePosition(e){
  mx = e.clientX;
  my = e.clientY;
}

function keyDown(e){
  keyCodes[e.keyCode] = true;
  if(e.keyCode == 32){
    var length = magnetWidth;// + (total - i - 1) * magnetWidth * 2;
    var a = Math.random() * TAU;
    var x = mx - Math.cos(a) * length/2;
    var y = my - Math.sin(a) * length/2;
    /*var b = i/total * TAU;
    var a = b + PI * (i % 2);
    var r = 200;
    var x = c.width/2 + r * Math.cos(b);
    var y = c.height/2 + r * Math.sin(b);*/
    magnets.push(new Magnet(x, y, Math.cos(a) * length + x, Math.sin(a) * length + y, 100));
  }
}

function keyUp(e){
  keyCodes[e.keyCode] = false;
}
