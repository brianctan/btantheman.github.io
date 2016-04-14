var cars = [];
var B = -0.5;
var palyer;
var road = JSON.parse("[{\"x\":136,\"y\":127},{\"x\":1088,\"y\":148},{\"x\":1085,\"y\":290},{\"x\":1311,\"y\":290},{\"x\":1309,\"y\":138},{\"x\":2638,\"y\":145},{\"x\":2661,\"y\":297},{\"x\":2414,\"y\":305},{\"x\":2199,\"y\":271},{\"x\":1937,\"y\":271},{\"x\":1855,\"y\":378},{\"x\":1937,\"y\":528},{\"x\":2149,\"y\":575},{\"x\":2322,\"y\":563},{\"x\":2522,\"y\":563},{\"x\":2572,\"y\":618},{\"x\":2552,\"y\":739},{\"x\":2318,\"y\":777},{\"x\":2047,\"y\":732},{\"x\":1845,\"y\":743},{\"x\":1817,\"y\":829},{\"x\":1842,\"y\":990},{\"x\":2059,\"y\":1086},{\"x\":2218,\"y\":1054},{\"x\":2457,\"y\":1028},{\"x\":2555,\"y\":1059},{\"x\":2626,\"y\":1138},{\"x\":2642,\"y\":1263},{\"x\":2614,\"y\":1382},{\"x\":2343,\"y\":1384},{\"x\":1966,\"y\":1337},{\"x\":1762,\"y\":1254},{\"x\":1686,\"y\":1147},{\"x\":1636,\"y\":893},{\"x\":1612,\"y\":565},{\"x\":1565,\"y\":309},{\"x\":1435,\"y\":397},{\"x\":1289,\"y\":552},{\"x\":781,\"y\":383},{\"x\":860,\"y\":293},{\"x\":423,\"y\":347},{\"x\":452,\"y\":580},{\"x\":737,\"y\":558},{\"x\":1460,\"y\":789},{\"x\":1512,\"y\":1168},{\"x\":1700,\"y\":1479},{\"x\":1437,\"y\":1544},{\"x\":1283,\"y\":1181},{\"x\":1206,\"y\":986},{\"x\":1035,\"y\":841},{\"x\":922,\"y\":1038},{\"x\":1086,\"y\":1299},{\"x\":1204,\"y\":1560},{\"x\":903,\"y\":1570},{\"x\":730,\"y\":995},{\"x\":566,\"y\":990},{\"x\":568,\"y\":1544},{\"x\":153,\"y\":1575},{\"x\":155,\"y\":1285},{\"x\":451,\"y\":1289},{\"x\":414,\"y\":1052},{\"x\":145,\"y\":1081},{\"x\":120,\"y\":948},{\"x\":423,\"y\":884},{\"x\":649,\"y\":781},{\"x\":454,\"y\":689},{\"x\":202,\"y\":770},{\"x\":105,\"y\":551}]");
var roadThresh = 300;
var roadWidth = 100;

function Car(x, y, length){
  this.points = [];
  this.length = length || 20;
  this.radius = 12;
  this.wheelSize = 3;
  this.maxTurn = 0.5;
  this.accelerate = false;
  this.reverse = false;
  this.auto = true;
  this.target = null;
  this.color = ["#9C27B0", "#673AB7", "#3F51B5"][Math.floor(Math.random() * 3)];
  this.roadIndex = Math.floor(Math.random() * road.length);
  this.intRange = 50;

  var defInf = 0.2 * (0.8 + 0.2 * Math.random());
  var defFric = 0.99;

  this.turn = 2 * (Math.random() - 0.5) * this.maxTurn;
  this.turnTarget = 2 * (Math.random() - 0.5) * this.maxTurn;
  this.turnSpeed = 0.05 * (0.8 + 0.2 * Math.random());

  this.points.push({
    x: x,
    y: y,
    vx: 0, vy: 0, vel: 0, velangle: 0,
    angle: 0, f: defFric, vel: 0,
    acc: 0, accSpeed: 0.011 * (0.8 + 0.2 * Math.random()), accF: 0.9,
    inf: defInf
  });

  var ra = Math.random() * TAU;

  this.points.push({
    x: x + this.length * Math.cos(ra),
    y: y + this.length * Math.sin(ra),
    vx: 0, vy: 0, vel: 0, velangle: 0,
    angle: 0, f: defFric, vel: 0,
    inf: defInf
  });

  this.update = function(){
    for(var i = 0; i < this.points.length; i++){
      var p = this.points[i];
      var q = this.points[(i + 1) % this.points.length];

      var dx = p.x - q.x;
      var dy = p.y - q.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var diff = (this.length - dist)/dist;

      var cx = diff * dx / 2;
      var cy = diff * dy / 2;

      p.vx += cx;
      p.vy += cy;
      p.x += cx;
      p.y += cy;
      q.vx -= cx;
      q.vy -= cy;
      q.x -= cx;
      q.y -= cy;

      this.turn = Math.sign(this.turn) * Math.min(Math.abs(this.turn), this.maxTurn);

      if(i === 0) p.angle = PI + Math.atan2(dy, dx);
      if(i === 1) p.angle = q.angle + this.turn;
      //if(i == 1) p.angle = Math.atan2(my - p.y, mx - p.x);

      for(var j = 0; j < cars.length; j++){
        var car = cars[j];
        for(var k = 0; k < car.points.length; k++){
          q = car.points[k];
          dx = p.x - q.x;
          dy = p.y - q.y;
          dist = Math.sqrt(dx * dx + dy * dy);
          if(dist < car.radius + this.radius && car != this){
            diff = (car.radius + this.radius - dist)/dist;

            cx = diff * dx;
            cy = diff * dy;

            var s1 = (p.vel + 1)/(p.vel + q.vel + 2);
            var s2 = (q.vel + 1)/(p.vel + q.vel + 2);

            p.vx += cx * s1;
            p.vy += cy * s1;
            p.x += cx * s1;
            p.y += cy * s1;
            q.vx -= cx * s2;
            q.vy -= cy * s2;
            q.x -= cx * s2;
            q.y -= cy * s2;

            //p.acc = q.acc = 0;
          }
        }
      }

      if(md && Math.sqrt((p.x - mx) * (p.x - mx) + (p.y - my) * (p.y - my)) < this.radius){
        player = this;
      }

      /*

      if(p.x < this.radius){
        p.x = this.radius;
        p.vx *= B;
      }

      if(p.y < this.radius){
        p.y = this.radius;
        p.vy *= B;
      }

      if(p.x > c.width - this.radius){
        p.x = c.width - this.radius;
        p.vx *= B;
      }

      if(p.y > c.height - this.radius){
        p.y = c.height - this.radius;
        p.vy *= B;
      }
      */

      if(i === 0){

        if(road.length > 3){
          var rp = road[this.roadIndex];
          this.intRange = roadWidth/4 + (1 + p.vel * p.vel) * 5;
          //var vc = p.vel * p.vel * 2;
          //var angle = Math.atan2(p.y - rp.y, p.x - rp.x);
          this.target = {};
          //this.target.x = rp.x + vc * Math.cos(angle);
          //this.target.y = rp.y + vc * Math.sin(angle);
          this.target.x = rp.x;
          this.target.y = rp.y;

          if(Math.sqrt((p.x - rp.x)*(p.x - rp.x)+(p.y - rp.y)*(p.y - rp.y)) < this.intRange) this.roadIndex = (this.roadIndex + 1)%road.length;
        }

        if(this.auto){

          if(this.target){
            var dist = Math.sqrt((this.target.x - p.x)*(this.target.x - p.x)+(this.target.y - p.x)*(this.target.y - p.y));
            if(dist > this.intRange){
            } else{
            }
              this.accelerate = true;
            this.turnTarget = Math.atan2(this.target.y - this.points[1].y, this.target.x - this.points[1].x) - this.points[0].angle;
            this.turn -= Math.sign(shortestAngleDisplacement(this.turnTarget, this.turn)) * Math.min(Math.abs(shortestAngleDisplacement(this.turnTarget, this.turn)), this.turnSpeed);
          } else{
            this.accelerate = false;

          }

          /*
          if(this.target == null && cars.length > 1 && road.length > 1){
            this.target = {
              radius: 100,
              points:[
                {
                  x: road[this.roadIndex].x,
                  y: road[this.roadIndex].y
                }
              ]
            }; //cars[Math.round(Math.random() * cars.length)];
            if(this.traget == this) this.target = null;
          }
            this.accelerate = false;
          if(this.target){
            this.accelerate = true;
            this.turnTarget = Math.atan2(this.target.points[0].y - this.points[1].y, this.target.points[0].x - this.points[1].x) - this.points[0].angle;

            if(Math.sqrt((this.target.points[0].x - this.points[1].x)*(this.target.points[0].x - this.points[1].x)+(this.target.points[0].y - this.points[1].y)*this.target.points[0].y - this.points[1].y) <= this.radius + this.target.radius + 10){
              this.target = null;
              this.roadIndex = (this.roadIndex + 1)%road.length;
            }
          }
          this.turn -= Math.sign(shortestAngleDisplacement(this.turnTarget, this.turn)) * Math.min(Math.abs(shortestAngleDisplacement(this.turnTarget, this.turn)), this.turnSpeed);
          */
        }

        if(this.accelerate){
          p.acc += p.accSpeed;
        }

        if(this.reverse){
          p.acc -= p.accSpeed;
        }

        p.acc *= p.accF;
        p.vx += p.acc * Math.cos(p.angle);
        p.vy += p.acc * Math.sin(p.angle);
      }

      p.vx *= p.f;
      p.vy *= p.f;

      p.vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

      var signAng = 0;

      if(Math.abs(shortestAngleDisplacement(Math.atan2(p.vy, p.vx), p.angle)) > PI/2) signAng = PI;

      p.vx = p.vx * (1 - p.inf) + Math.cos(p.angle + signAng) * p.vel * p.inf;
      p.vy = p.vy * (1 - p.inf) + Math.sin(p.angle + signAng) * p.vel * p.inf;

      p.x += p.vx;
      p.y += p.vy;
    }
  };

  this.draw = function(){
    var b = this.points[0];
    var f = this.points[1];


    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineCap = "square";
    ctx.lineWidth = 5;
    ctx.moveTo(this.radius * Math.cos(b.angle + PI/2) + f.x - this.wheelSize * Math.cos(f.angle), this.radius * Math.sin(b.angle + PI/2) + f.y - this.wheelSize * Math.sin(f.angle));
    ctx.lineTo(this.radius * Math.cos(b.angle + PI/2) + f.x + this.wheelSize * Math.cos(f.angle), this.radius * Math.sin(b.angle + PI/2) + f.y + this.wheelSize * Math.sin(f.angle));
    ctx.moveTo(-this.radius * Math.cos(b.angle + PI/2) + f.x - this.wheelSize * Math.cos(f.angle), -this.radius * Math.sin(b.angle + PI/2) + f.y - this.wheelSize * Math.sin(f.angle));
    ctx.lineTo(-this.radius * Math.cos(b.angle + PI/2) + f.x + this.wheelSize * Math.cos(f.angle), -this.radius * Math.sin(b.angle + PI/2) + f.y + this.wheelSize * Math.sin(f.angle));
    ctx.moveTo(-this.radius * Math.cos(b.angle + PI/2) + b.x - this.wheelSize * Math.cos(b.angle), -this.radius * Math.sin(b.angle + PI/2) + b.y - this.wheelSize * Math.sin(b.angle));
    ctx.lineTo(-this.radius * Math.cos(b.angle + PI/2) + b.x + this.wheelSize * Math.cos(b.angle), -this.radius * Math.sin(b.angle + PI/2) + b.y + this.wheelSize * Math.sin(b.angle));
    ctx.moveTo(this.radius * Math.cos(b.angle + PI/2) + b.x - this.wheelSize * Math.cos(b.angle), this.radius * Math.sin(b.angle + PI/2) + b.y - this.wheelSize * Math.sin(b.angle));
    ctx.lineTo(this.radius * Math.cos(b.angle + PI/2) + b.x + this.wheelSize * Math.cos(b.angle), this.radius * Math.sin(b.angle + PI/2) + b.y + this.wheelSize * Math.sin(b.angle));
    ctx.stroke();
    if(player == this){
      ctx.fillStyle = "#F44336";
    } else{
      ctx.fillStyle = this.color;
    }
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(b.x, b.y, this.radius, b.angle + PI/2, b.angle - PI/2);
    ctx.arc(f.x, f.y, this.radius, b.angle - PI/2, b.angle + PI/2);
    ctx.closePath();
    ctx.fill();
  };
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
