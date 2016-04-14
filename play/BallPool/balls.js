var RADIUS_RATIO = 2;
var COLLISION_COEFFICIENT = 1;
var CHUNK_SIZE = 5;
var FRICTION = 0.99;
var GRAVITY = 0.1;
var BOUNCE = 0.9;
var G = 0;

var windowPosition = {
  x: 0,
  y: 0
};

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

  this.bumps = 0;
  this.valueTransition = 0;

  balls.push(this);
  initChunk(this.chunk.x, this.chunk.y);
  ballsChunks[this.chunk.x][this.chunk.y].push(this);
}

Ball.prototype.updateRadius = function(){
  this.radius = Math.max(3, Math.sqrt(this.mass/PI) * RADIUS_RATIO);
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

  COEF = 0.01;

  this.vx += windowPosition.vx * COEF;
  this.vy += windowPosition.vy * COEF;

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

  this.bumps = 0;

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

      this.bumps++;
      ball.bumps++;
    }
  }





  if(G > 0){
    //this.x = mx;
    //this.y = my;
    A = -1000000;
    var mouseDist = ((this.x + mx) * (this.x + mx) + (this.y + my) * (this.y + my));
    var velAngle = Math.atan2(my - this.y, mx - this.x);
    this.vx += Math.cos(velAngle) * A / mouseDist;
    this.vy += Math.sin(velAngle) * A / mouseDist;
  }



  this.valueTransition += (this.bumps - this.valueTransition)/10;


  //var vel = 1 + this.valueTransition * 3;
  var vel = Math.min(5, Math.sqrt(this.vx * this.vx + this.vy * this.vy));
  var vel = 3;
  //var vel = (Math.sqrt(this.vx * this.vx + this.vy * this.vy));
  var velAngle = Math.atan2(this.vy, this.vx);

  this.vx = Math.cos(velAngle) * vel;
  this.vy = Math.sin(velAngle) * vel;

  this.updateChunk();
}

Ball.prototype.draw = function(){
  //ctx.fillStyle = "rgb(" + Math.floor(155 + 100 * (this.y/c.height)) + "," + Math.floor(200 - 100 * (this.x/c.width)) + "," + 100 + ")";
  ctx.fillStyle = "rgb(" + Math.floor(100 + 30 * this.valueTransition) + "," + Math.floor(20 * this.valueTransition) + "," + Math.floor(100 + 10 * this.valueTransition) + ")";
  ctx.beginPath();
  ctx.arc(this.x, this.y, Math.max(1, this.radius - 1), 0, TAU);
  ctx.fill();
}
