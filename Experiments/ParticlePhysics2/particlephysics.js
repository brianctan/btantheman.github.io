var F = 1, G = 0.3, B = -0.75, BB = 0.5, C = 7, DC = 1, DG = 0;

var points = [];

var ship = null, sdx = sdy = 0;

var shipProps = {
  angle: 0,
  acc: 0.1,
  vt: 0,
  tF: 0.9,
  ta: 0.01
};

var Point = function(x, y, mass, density){
  this.x = x;
  this.y = y;

  this.nx = x;
  this.ny = y;

  this.vx = this.vy = this.ax = this.ay = 0;

  this.mass = mass;
  this.density = density;
  this.updateSize = function(){
    this.size = Math.sqrt(this.mass * PI) / density * DC;
  }
  this.updateSize();

  this.applyPhysics = function(){
    this.vx += this.ax;
    this.vy += this.ay;

    this.ax = 0;
    this.ay = DG;

    //CONTROLS

    if(this == ship){
      if(keyCodes[32]){
        this.ax += shipProps.acc * Math.cos(shipProps.angle);
        this.ay += shipProps.acc * Math.sin(shipProps.angle);
      }

      if(keyCodes[37]){
        shipProps.vt -= shipProps.ta;
      }

      if(keyCodes[39]){
        shipProps.vt += shipProps.ta;
      }

      shipProps.vt *= shipProps.tF;
      shipProps.angle += shipProps.vt;
    }

    //END OF CONTROLS

    this.vx *= F;
    this.vy *= F;

    var vAngle = Math.atan2(this.vy, this.vx);
    var vel = Math.min(Math.sqrt(this.vx * this.vx + this.vy * this.vy), C);

    this.vx = vel * Math.cos(vAngle);
    this.vy = vel * Math.sin(vAngle);

    this.nx = this.x + this.vx;
    this.ny = this.y + this.vy;

    if(this.ny > c.height - this.size){
      this.ny = c.height - this.size;
      this.vy *= B;
    }

    if(this.ny < this.size){
      this.ny = this.size;
      this.vy *= B;
    }

    if(this.nx > c.width - this.size){
      this.nx = c.width - this.size;
      this.vx *= B;
    }

    if(this.nx < this.size){
      this.nx = this.size;
      this.vx *= B;
    }

    for(var i in points){
      var p = points[i];
      if(p != this){

        if(p != this){
          var angle = Math.atan2(p.ny - this.y, p.x - this.x);
          var dist = distance(this.nx, this.ny, p.nx, p.ny);
          var a1 = (p.mass * G) / (dist * dist);
          var a2 = (this.mass * G) / (dist * dist);

          this.ax += a1 * Math.cos(angle);
          this.ay += a1 * Math.sin(angle);
        }

        var angle = Math.atan2(this.y - p.y, this.x - p.x);
        var dist = distance(this.x, this.y, p.x, p.y),
            dx = this.x - p.x,
            dy = this.y - p.y,
            diff = ((this.size + p.size) - dist)/dist,
            s1 = (1/this.mass)/((1/this.mass)+(1/p.mass)),
            s2 = 1 - s1;

        if(dist < p.size + this.size){
          this.nx += dx * s1 * diff;
          this.ny += dy * s1 * diff;
          p.nx -= dx * s2 * diff;
          p.ny -= dy * s2 * diff;


          this.vx += dx * s1 * diff * BB;
          this.vy += dy * s1 * diff * BB;
          p.vx -= dx * s2 * diff * BB;
          p.vy -= dy * s2 * diff * BB;
        }

      }
    }

    if(ship == this && md){
      this.x = mx + sdx;
      this.y = my + sdy;
    } else{
      this.x = (this.nx);
      this.y = (this.ny);
    }
  }

  this.draw = function(){

    if(this == ship){
      ctx.strokeStyle = "red";

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.size * Math.cos(shipProps.angle), this.y + this.size * Math.sin(shipProps.angle));
      ctx.stroke();
    } else{
      ctx.strokeStyle = "black";
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, TAU);
    ctx.stroke();
  }

  this.getNextPosition = function(){
    this.nx = this.x + this.vx;
    this.ny = this.y + this.vy;

    return {
      x: this.nx,
      y: this.ny
    };
  }
}

function distance(a, b, c, d){
  return Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2));
}

function sign(n){
  return n == 0 ? 1 : Math.abs(n)/n;
}
