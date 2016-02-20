var dummies = [];
var bases = [];
var foodSources = [];
var time = 0;

var F = 0.98;

var Dummy = function(x, y, type){
  this.x = x;
  this.y = y;

  this.tx = Math.random() * c.width;
  this.ty = Math.random() * c.height;

  this.vx = this.vy = this.tv = 0;

  this.angle = Math.random() * TAU;

  this.type = type;

  this.state = 1;
  /*
  STATES
  0 - Rest
  1 - Wander
  2 - Go Home
  3 - Get Food
  4 - Eat
  5 - Defend Base
  6 - Attack
  */

  this.foodSources = [];
  this.nearestFoodSource = null;
  this.homeBases = [];
  this.nearestHomeBase = null;
  this.enemyBases = [];
  this.nearestEnemyBase = null;

  copyObject(DummyTypes[type], this);

  this.draw = this.draw || function(){
    var x = this.x// + Math.random() - Math.random(),
        y = this.y// + Math.random() - Math.random(),
        r = PI/3;

    ctx.fillStyle = ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, TAU);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 7, this.angle - r, this.angle + r);
    ctx.stroke();

    ctx.strokeStyle = "rgb(100, 200, 100)";
    ctx.beginPath();
    ctx.arc(x, y, 9, -PI/2, -PI/2 + TAU * this.health/this.healthCap);
    ctx.stroke();

    ctx.strokeStyle = "rgb(150, 150, 255)";
    ctx.beginPath();
    ctx.arc(x, y, 11, -PI/2, -PI/2 + TAU * this.health/this.healthCap);
    ctx.stroke();
  }

  this.update = this.update || function(){
    for(var i in foodSources){
      var f = foodSources[i];
      if(distance(f.x, f.y, this.x, this.y) <= this.range[1] + f.radius){
        if(!alreadyBeenLogged(f.x, f.y, this.range[1], this.foodSources)){
          this.foodSources.push(new Point(f.x, f.y));
          console.log("Food!");
        }
      }
    }

    if(this.foodSources.length > 0) this.state = 3;
    if(this.state == 1) this.wander();
    if(this.state == 3) this.gotoFood();

    this.tv *= 0.9;
    this.angle += this.tv;

    this.vx *= F;
    this.vy *= F;

    this.x += this.vx;
    this.y += this.vy;
  }

  this.gotoFood = this.gotoFood || function(){
    if(this.nearestFoodSource == null){
      this.nearestFoodSource = nearestPoint(this.x, this.y, this.foodSources);
    }

    if(this.nearestFoodSource != null){
      this.pointTo(this.nearestFoodSource.x, this.nearestFoodSource.y);
      this.move(0);
    }
  }

  this.wander = this.wander || function(){
    if(distance(this.tx, this.ty, this.x, this.y) < this.range[0]){
      this.tx = Math.random() * c.width;
      this.ty = Math.random() * c.height;
    }

    this.pointTo(this.tx, this.ty);
    this.move(0);
  }

  this.move = this.move || function(rate){
    rate = rate == null ? 0 : Math.min(this.speed.length - 1, rate);

    this.vx += this.speed[rate] * Math.cos(this.angle);
    this.vy += this.speed[rate] * Math.sin(this.angle);
  }

  this.pointTo = this.pointTo || function(x, y){
    var a = Math.atan2(y - this.y, x -this.x),
        d = shortestAngleDisplacement(this.angle, a);

    this.tv += Math.min(Math.abs(d), this.torqueSpeed) * sign(d);
  }
}

var DummyTypes = [
  {
    species: "Proto",
    color: "rgb(250, 50, 50)",
    speed: [0.01, 1],
    torqueSpeed: 0.008,
    healthCap: 100,
    health: 100,
    energyCap: 100,
    energy: 100,
    range: [20, 100]
  }
];

var Point = function(x, y){
  this.x = x;
  this.y = y;
}

var FoodSource = function(x, y, amount){
  this.x = x;
  this.y = y;
  this.amount = amount;
  this.cap = amount;
  this.radius = Math.sqrt(PI * this.amount);

  this.draw = function(){
    this.radius = Math.sqrt(PI * this.amount);
    ctx.fillStyle = "rgb(150, 100, 100)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, TAU);
    ctx.fill();
  }
}

var Base = function(x, y, type){
  this.x = x;
  this.y = y;
  this.type = type;
  this.timeOffset = Math.floor(Math.random() * 1000);
  this.r = 50;

  this.draw = function(){
    ctx.lineWidth = 3;
    ctx.strokeStyle = DummyTypes[this.type].color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r - 4, 0, TAU);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r + 4, 0, TAU);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, ((this.timeOffset + time)/100) % TAU - PI / 2, (((this.timeOffset + time)/100) % TAU));
    ctx.stroke();
    ctx.lineWidth = 1;
  }
}

function copyObject(a, b){
  for(var c in a){
    b[c] = a[c];
  }
}

function nearestPoint(x, y, points){
  if(points && points.length){
    var tempArray = [];
    for(var i in points){
      var p = points[i];
      var a = {
        dist: distance(x, y, p.x, p.y),
        i: i
      };
      tempArray.push(a);
    }
    tempArray.sort(function(a, b){
      return a.dist - b.dist;
    });
    return points[tempArray[0].i];
  }
  return null;
}

function alreadyBeenLogged(x, y, range, list){
  var np = nearestPoint(x, y, list);
  if(np){
    return distance(x, y, np.x, np.y) <= range;
  }
  return false;
}
