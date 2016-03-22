var particleSize = 10;

var particleGrid = {};
var particles = [];

function initGame(){
  for(var i = 0; i < 1000; i++){
    var p = new Particle(Math.random() * c.width, Math.random() * c.height, 0);
    p.g = 0.1;
    p.f = 0.98;
    p.color = "gold";
    particles.push(p);
  }
}

function updateGame(){
  for(var i = 0; i < particles.length; i++){
    var p = particles[i];
    p.vy += p.g;

    p.vx *= p.f;
    p.vy *= p.f;

    var vel = Math.min(particleSize - 1, Math.sqrt(p.vx * p.vx + p.vy * p.vy));
    var ang = Math.atan2(p.vy, p.vx);

    p.vx = Math.cos(ang) * vel;
    p.vy = Math.sin(ang) * vel;

    p.x += p.vx;
    p.y += p.vy;

    if(p.y + particleSize > c.height){
      p.y =  Math.floor(c.height / particleSize) * particleSize;
      p.vy = 0;
    }

    initParticleGrid(p.gridX, p.gridY + 1)
    var q = particleGrid[p.gridX][p.gridY + 1];
    if()

    p.updateXY();


    /*
    for(var x = -1; x <= 1; x++){
      for(var y = -1; y <= 1; y++){
        if(!(x == 0 && y == 0) && (x == 0 || y == 0)){
          initParticleGrid(p.gridX + x, p.gridY + y);
          var q = particleGrid[p.gridX + x][p.gridY + y];
          if(q){
            var dx = 1 ? q.x - p.x : 0;
            var dy = 1 ? q.y - p.y : 0;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var diff = Math.max(0, (particleSize - dist)/dist);
            var s1 = 0.5, s2 = 0.5;

            var xi = dx * diff * s1;
            var yi = dy * diff * s1;

            p.x += xi;
            p.y += yi;
            p.vx += xi;
            p.vy += yi;

          }
        }
      }
    }

    /*

    initParticleGrid(p.gridX, p.gridY + 1);
    if(particleGrid[p.gridX][p.gridY + 1]){
      p.vy = 0;
      p.y = (p.gridY * particleSize);
    }

    */



    ctx.fillStyle = p.color;
    ctx.strokeStyle = "red";
    ctx.fillRect(p.x, p.y, particleSize, particleSize);
    ctx.strokeRect(p.gridX * particleSize, p.gridY * particleSize, particleSize, particleSize);

  }
}

var Particle = function(x, y, type){
  this.x = x;
  this.y = y;
  this.vx = this.vy = 0;
  this.updateXY();
}

Particle.prototype.updateXY = function (arguments) {
  if(this.gridX != Math.floor(this.x / particleSize) || this.gridY != Math.floor(this.y / particleSize)){
    if(this.gridX != null && this.gridY != null){


      initParticleGrid(this.gridX, this.gridY);

      if(particleGrid[this.gridX][this.gridY] == this){
        particleGrid[this.gridX][this.gridY] = null;
      }
    }
    this.gridX = Math.floor(this.x / particleSize);
    this.gridY = Math.floor(this.y / particleSize);
    initParticleGrid(this.gridX, this.gridY);
    particleGrid[this.gridX][this.gridY] = this;
  }
}

function initParticleGrid(x, y){
  if(particleGrid[x] == null) particleGrid[x] = {};
  //if(particleGrid[x][y] == null) particleGrid[x][y] = null;
}
