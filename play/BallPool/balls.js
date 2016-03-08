var RADIUS_RATIO = 2;
var COLLISION_COEFFICIENT = 1;
var CHUNK_SIZE = 5;
var FRICTION = 0.99;
var GRAVITY = 0.1;
var BOUNCE = 0.9;

console.log("CHUNK SIZE: " + (1 << CHUNK_SIZE));

var balls = [];
var ballsChunks = [];

function initChunk(x, y){
  if(ballsChunks[x] == null) ballsChunks[x] = [];
  if(ballsChunks[x][y] == null) ballsChunks[x][y] = [];
}

var Ball = function(x, y, mass){
  this.x = x;
  this.y = y;
  this.vx = this.vy = 0;
  this.mass = mass;
  this.radius;
  this.updateRadius();
  this.chunk = {
    x: x >> CHUNK_SIZE,
    y: y >> CHUNK_SIZE
  }

  balls.push(this);
  initChunk(this.chunk.x, this.chunk.y);
  ballsChunks[this.chunk.x][this.chunk.y].push(this);
}

Ball.prototype.updateRadius = function(){
  this.radius = Math.sqrt(this.mass/PI) * RADIUS_RATIO;
}

Ball.prototype.updateChunk = function(){
  if(this.chunk.x != this.x >> CHUNK_SIZE || this.chunk.y != this.y >> CHUNK_SIZE){
  ballsChunks[this.chunk.x][this.chunk.y].splice(ballsChunks[this.chunk.x][this.chunk.y].indexOf(this), 1);
  this.chunk.x = this.x >> CHUNK_SIZE;
  this.chunk.y = this.y >> CHUNK_SIZE;
  initChunk(this.chunk.x, this.chunk.y);
  ballsChunks[this.chunk.x][this.chunk.y].push(this);
}
}

Ball.prototype.update = function(){

  this.vy += GRAVITY;

  this.vx *= FRICTION;
  this.vy *= FRICTION;

  this.x += this.vx;
  this.y += this.vy;

  if(this.x - this.radius < 0){
    this.vx *= -BOUNCE;
    this.x = this.radius;
  }

  if(this.x + this.radius > c.width){
    this.vx *= -BOUNCE;
    this.x = c.width - this.radius;
  }

  if(this.y - this.radius < 0){
    this.vy *= -BOUNCE;
    this.y = this.radius;
  }

  if(this.y + this.radius > c.height){
    this.vy *= -BOUNCE;
    this.y = c.height - this.radius;
  }

  initChunk(this.chunk.x, this.chunk.y);
  var searchArray = ballsChunks[this.chunk.x][this.chunk.y];

  var searchRadius = 1;

  for(var n = -1; n < 2; n += 2){
    for(var r = -searchRadius; r <= searchRadius; r++){
      initChunk(this.chunk.x + n, this.chunk.y + r);
      searchArray = searchArray.concat(ballsChunks[this.chunk.x + n][this.chunk.y + r]);
    }

    for(var r = -searchRadius + 1; r <= searchRadius - 1; r++){
      initChunk(this.chunk.x + r, this.chunk.y + n);
      searchArray = searchArray.concat(ballsChunks[this.chunk.x + r][this.chunk.y + n]);
    }
  }

  for(var i = 0; i < searchArray.length; i++){
    var ball = searchArray[i];
    if(this == ball) continue;
    var dx = ball.x - this.x;
    var dy = ball.y - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var diff = ((this.radius + ball.radius) - dist)/dist;
    var s1 = (1/this.mass)/((1/this.mass)+(1/ball.mass));
    var s2 = 1 - s1;

    if(dist < this.radius + ball.radius){
      px = -dx * diff ;
      py = -dy * diff;

      this.x += px * s1;
      this.y += py * s1;
      this.vx += px * s1 * COLLISION_COEFFICIENT;
      this.vy += py * s1 * COLLISION_COEFFICIENT;

      ball.x -= px * s2;
      ball.y -= py * s2;
      ball.vx -= px * s2 * COLLISION_COEFFICIENT;
      ball.vy -= py * s2 * COLLISION_COEFFICIENT;
    }
  }

  var vel = Math.min(5, Math.max(2, Math.sqrt(this.vx * this.vx + this.vy * this.vy)));
  //var vel = Math.min(5, Math.sqrt(this.vx * this.vx + this.vy * this.vy));
  var velAngle = Math.atan2(this.vy, this.vx);

  this.vx = Math.cos(velAngle) * vel;
  this.vy = Math.sin(velAngle) * vel;


  this.updateChunk();
}

Ball.prototype.draw = function(){
  ctx.fillStyle = "rgb(" + Math.floor(255 - 50 * (this.y/c.height)) + "," + Math.floor(200 - 100 * (this.x/c.width)) + "," + 100 + ")"
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, TAU);
  ctx.fill();
}
