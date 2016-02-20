var c, ctx, time = 0, ticks = 1;

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  windowResize();
  window.addEventListener("resize", windowResize, false);

  for(var i = 0; i < starterBugs.length; i++){
    for(var j = 0; j < 100; j++){
      addPureBug(i, c.width/2, c.height/2);
    }
  }

  update();
}

window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

var mF = 0.9, tF = 0.9, wb = -0.5;

var displayRange = false, displayInfoBars = true;

function update(){
  for(var reps = 0; reps < ticks; reps++){
    ctx.clearRect(0, 0, c.width, c.height);

    for(var i = 0; i < bugs.length; i++){
      var b = bugs[i];

      if(b.health <= 0){
        bugs.splice(i, 1);
        i--;
        continue;
      }

      var cb = null;
      var cab = null;
      var cabd = Infinity;
      var cbd = Infinity;

      for(var j = 0; j < bugs.length; j++){
        if(i == j) continue;
        var d = bugs[j];
        var bugDistance = distance(b.x, b.y, d.x, d.y);
        if(bugDistance <= b.range){
          if(bugDistance < cbd && b.enemies.indexOf(d.id) != -1){
            cbd = bugDistance;
            cb = d;
          }
          if(bugDistance < cabd && b.id == d.id){
            cabd = bugDistance;
            cab = d;
          }
        }
      }

      if(cb == null) cb = cab;

      if(cb != null){
        if(b.enemies.indexOf(cb.id) == -1){
          if(b.id == cb.id && b.readyToMate && cb.readyToMate){
            b.tx = cb.x;
            b.ty = cb.y;

            if(distance(b.x, b.y, cb.x, cb.y) <= 25){
              b.matingTimeOffset = time % b.matingInterval + 1;
              c.matingTimeOffset = time % cb.matingInterval + 1;
              b.readyToMate = cb.readyToMate = false;
              addOffspring(b, cb);
            }
          } else if(b.id == cb.id && b.health < b.healthCap && false){
            b.tx = cb.x;
            b.ty = cb.y;
            if(distance(b.x, b.y, cb.x, cb.y) <= 25) b.health += b.healthRegenSpeed;
          } else idle();
        } else{
          b.tx = cb.x;
          b.ty = cb.y;
          if(distance(b.x, b.y, cb.x, cb.y) <= 25){
            b.hunger = Math.min(b.hungerCap, b.hunger + b.hungerRegenSpeed);
            cb.health -= b.damage;

            ctx.strokeStyle = "#CCC";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(cb.x, cb.y);
            ctx.stroke();
          }
        }
      } else idle();

      function idle(){
        if(distance(b.x, b.y, b.tx, b.ty) < b.range){
          b.tx = c.width * Math.random();
          b.ty = Math.random() * c.height;
        }
      }

      b.hunger = Math.max(0, b.hunger - b.hungerSpeed);

      if(b.hunger == 0){
        //b.health -= b.hungerSpeed;
      } else{
        b.health = Math.min(b.healthCap, b.health + b.healthRegenSpeed);
      }

      if((b.matingTimeOffset + time) % b.matingInterval == 0) b.readyToMate = !b.readyToMate;

      var angleDistance = shortestAngleDisplacement(b.angle, Math.atan2(b.ty - b.y, b.tx - b.x));

      b.vt += sign(angleDistance) * Math.min(Math.abs(angleDistance), b.torque);

      b.vt *= tF;

      b.angle += b.vt;

      b.vx += b.speed * Math.cos(b.angle);
      b.vy += b.speed * Math.sin(b.angle);

      b.vx *= mF;
      b.vy *= mF;

      b.x += b.vx;
      b.y += b.vy;

      if(b.x < 0){
        b.x = 0;
        b.vx *= wb;
      }

      if(b.y < 0){
        b.y = 0;
        b.vy *= wb;
      }

      if(b.x > c.width){
        b.x = c.width;
        b.vx *= wb;
      }

      if(b.y > c.height){
        b.y = c.height;
        b.vy *= wb;
      }



      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);

      var rgbColor = "rgb(" + b.color.r + "," + b.color.g + "," + b.color.b + ")";

      if(b.readyToMate){
        ctx.fillStyle = rgbColor;
        ctx.fill();
      } else{
        ctx.strokeStyle = rgbColor;
        ctx.stroke();
      }

      if(displayRange){
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(" + b.color.r + "," + b.color.g + "," + b.color.b + ", 0.1)";
        ctx.arc(b.x, b.y, b.range, 0, Math.PI*2);
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x + b.range * Math.cos(b.angle), b.y + b.range * Math.sin(b.angle));
        ctx.stroke();
      }

      if(displayInfoBars){

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(b.x - 5, b.y - 8);
        ctx.lineTo(b.x - 5 + 10 * b.hunger/b.hungerCap, b.y - 8);
        ctx.stroke();

        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(b.x - 5, b.y - 10);
        ctx.lineTo(b.x - 5 + 10 * b.health/b.healthCap, b.y - 10);
        ctx.stroke();
      }
    }
  }

  time++;
  window.requestAnimationFrame(update);
}

function distance(fx, fy, tx, ty){
  return Math.sqrt(Math.pow(fx - tx, 2) + Math.pow(fy - ty, 2));
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

function normalizeAngle(n){
  while(n < 0){
    n += Math.PI * 2;
  }
  while(n > Math.PI * 2){
    n -= Math.PI * 2;
  }
  return n;
}

function sign(n){
  if(n == 0) return 1;
  else return Math.abs(n)/n;
}
