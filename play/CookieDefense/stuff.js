var Miner = function(){
  Point.apply(this, arguments);
  this.interval = 400;
  this.timeOffset = Math.round(Math.random() * this.interval);
  this.range = 2;
  this.health = 50;
  this.healthCap = 50;
}

Miner.prototype.draw = function(){
  ctx.fillStyle = "gold";
  ctx.fillRect(this.x * GRID_SIZE, this.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);

  /*
  ctx.strokeStyle = "gray";
  ctx.beginPath();
  ctx.arc(this.x * GRID_SIZE + GRID_SIZE/2, this.y * GRID_SIZE + GRID_SIZE/2, this.range * GRID_SIZE, 0, TAU);
  ctx.stroke();
  */
}

Miner.prototype.tick = function(){
  if((this.timeOffset + time)%this.interval == 0){
    money++;
  }
}

var BasicTurret = function(){
  Point.apply(this, arguments);
  this.interval = 3;
  this.timeOffset = Math.round(Math.random() * this.interval);
  this.range = 5;
  this.health = 100;
  this.healthCap = 100;
  this.damage = 0.1;
}

BasicTurret.prototype.tick = function(){
  if((time + this.timeOffset)%this.interval == 0){
    for(var i in creatures){
      var c = creatures[i];
      if(Math.sqrt((this.x + 0.5 - c.x) * (this.x + 0.5 - c.x) + (this.y + 0.5 - c.y) * (this.y + 0.5 - c.y)) <= this.range){
        c.health -= this.damage;
        ctx.beginPath();
        ctx.moveTo((this.x + 0.5) * GRID_SIZE, (this.y + 0.5) * GRID_SIZE);
        ctx.lineTo(c.x * GRID_SIZE, c.y * GRID_SIZE);
        ctx.stroke();
      }
    }
  }
}

BasicTurret.prototype.draw = function(){
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(this.x * GRID_SIZE + GRID_SIZE/2, this.y * GRID_SIZE + GRID_SIZE/2, GRID_SIZE/2, 0, TAU);
  ctx.fill();
}

var Point = function(x, y){
  this.x = x;
  this.y = y;
}

function spawnEnemy(x, y){
  creatures.push(new BasicEnemy(x, y));
}

var BasicEnemy = function(){
  Point.apply(this, arguments);
  this.speed = 0.1;
  this.target;
  this.health = 20;
  this.healthCap = 20;
  this.damage = 0.1;
  this.range = 1;
}

BasicEnemy.prototype.draw = function(){
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(this.x * GRID_SIZE + GRID_SIZE/2, this.y * GRID_SIZE + GRID_SIZE/2, GRID_SIZE/3, 0, TAU);
  ctx.fill();
}

BasicEnemy.prototype.tick = function(){
  if(this.target == null && structures.length > 0){
    var dist = MAP_WIDTH * MAP_HEIGHT;
    var p = structures[0];
    for(var i in structures){
      d = Math.sqrt((structures[i].x - this.x) * (structures[i].x - this.x) + (structures[i].y - this.y) * (structures[i].y - this.y));
      if(d < dist){
        dist = d;
        p = structures[i];
      }
    }
    this.target = p;
  }

  if(this.target != null) if(this.target.health <= 0) this.target = null;

  if(this.target != null){
    if(Math.sqrt((this.x - this.target.x) * (this.x - this.target.x) + (this.y - this.target.y) * (this.y - this.target.y)) > this.range){
      this.x += Math.cos(Math.atan2(this.target.y - this.y, this.target.x - this.x)) * this.speed;
      this.y += Math.sin(Math.atan2(this.target.y - this.y, this.target.x - this.x)) * this.speed;
    }

    if(Math.sqrt((this.x - this.target.x) * (this.x - this.target.x) + (this.y - this.target.y) * (this.y - this.target.y)) <= this.range){
      this.target.health -= this.damage;
    }
  }
}
