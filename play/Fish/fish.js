var fishes = [];
var food = [];
var B = -0.1;

function Fish(x, y){
  this.x = x;
  this.y = y;
  this.vx = this.vy = 0;
  this.target = {
    x: Math.random() * c.width,
    y: Math.random() * c.height
  };
  this.acceleration = 0.0005 + 0.001 * Math.random();
  this.momentum = 0;
  this.friction = 0.99;
  this.momentumFriction = 0.9;

  this.searchRadius = 10000;

  this.nearestFish = null;
  this.nearestFishDistance = this.searchRadius;

  this.nearestFood = null;
  this.nearestFoodDistance = this.searchRadius;

  this.angleSight = PI/2;

  this.angle = Math.random() * TAU;
  this.targetAngle = 0;
  this.angleVelocity = 0;
  this.torqueFriction = 0.97;
  this.torque = 0.0025;

  this.wiggle = 0;

  this.closeness = 50;
  this.foodFocus = 5;

  this.radius = 10;

  this.accelrating = false;

  this.accelerate = function(){
    if(this.accelrating == false){
      this.momentum += this.acceleration;

      this.wiggle += 1 * this.momentum;

      this.vx += this.momentum * Math.cos(this.angle);
      this.vy += this.momentum * Math.sin(this.angle);
      accelerating = true;
    }
  };

  this.update = function(){
    this.nearestFish = null;
    this.nearestFishDistance = 200;

    for(var i = 0; i < fishes.length; i++){
      var fish = fishes[i];
      if(fish == this) continue;
      var dx = this.x - fish.x;
      var dy = this.y - fish.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var angle = Math.atan2(dy, dx);

      if(dist < this.nearestFishDistance && Math.abs(shortestAngleDisplacement(PI + this.angle, angle)) < this.angleSight){
        this.nearestFishDistance = dist;
        this.nearestFish = fish;
      }

      if(dist < this.radius + fish.radius){
        diff = (this.radius + fish.radius - dist)/dist;

        var cx = dx * diff / 2;
        var cy = dy * diff / 2;

        this.x += cx;
        this.y += cy;
        fish.x -= cx;
        fish.y -= cy;

        this.vx += cx;
        this.vy += cy;
        fish.vx -= cx;
        fish.vy -= cy;

        fish.accelerate();
        this.accelerate();
      }
    }

    this.nearestFood = null;
    this.nearestFoodDistance = this.searchRadius;

    for(var i = 0; i < food.length; i++){
      var f = food[i];
      var dx = this.x - f.x;
      var dy = this.y - f.y;
      var angle = Math.atan2(dy, dx);
      var dist = Math.sqrt(dx * dx + dy * dy);

      if(dist < this.radius + f.radius){
        food.splice(i, 1);
        i--;
      }

      if(dist < this.nearestFoodDistance && Math.abs(shortestAngleDisplacement(PI + this.angle, angle)) < this.angleSight){
        this.nearestFood = f;
        this.nearestFoodDistance = dist;
      }
    }

    if(this.nearestFoodDistance/this.foodFocus < this.nearestFishDistance && this.nearestFood){
      var angle =  Math.atan2(this.y - this.nearestFood.y, this.x - this.nearestFood.x);
      var vel = (this.vx * this.vx + this.vy * this.vy) * 100;
      this.target.x = this.nearestFood.x + vel * Math.cos(angle);
      this.target.y = this.nearestFood.y + vel * Math.sin(angle);
      //ctx.fillRect(this.target.x - 3, this.target.y - 3, 6, 6);
    } else if(this.nearestFish){
      var angle =  Math.atan2(this.y - this.nearestFish.y, this.x - this.nearestFish.x);
      var vel = 1 + (this.vx * this.vx + this.vy * this.vy);
      this.target.x = this.nearestFish.x + Math.cos(angle) * this.closeness * vel;
      this.target.y = this.nearestFish.y + Math.sin(angle) * this.closeness * vel;
      //ctx.fillRect(this.target.x, this.target.y, 5, 5);
    }

    this.targetAngle = Math.atan2(this.target.y - this.y, this.target.x - this.x);

    var angleDiff = shortestAngleDisplacement(this.angle, this.targetAngle);

    this.angleVelocity += Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), this.torque);

    var targetDistance = Math.sqrt((this.x - this.target.x)*(this.x - this.target.x)+(this.y - this.target.y)*(this.y - this.target.y));

    if(targetDistance > this.radius && (this.nearestFish || this.nearestFood)){
      this.accelerate();
    } else{
      //if(Math.random() > 0.5) this.accelerate();
      this.angleVelocity += 3 * (Math.random() - 0.5) * this.torque;
    }

    this.momentum *= this.momentumFriction;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
    this.angleVelocity *= this.torqueFriction;
    this.angle += this.angleVelocity;

    if(this.x < this.radius){
      this.x = this.radius;
      this.vx *= B;
    }

    if(this.x > c.width - this.radius){
      this.x = c.width - this.radius;
      this.vx *= B;
    }

    if(this.y < this.radius){
      this.y = this.radius;
      this.vy *= B;
    }

    if(this.y > c.height - this.radius){
      this.y = c.height - this.radius;
      this.vy *= B;
    }

    accelerating = false;
  };

  this.draw = function(){
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, this.angle, this.angle + TAU);
    //if(this.nearestFish) ctx.lineTo(this.nearestFish.x, this.nearestFish.y);
    //if(this.nearestFood) ctx.lineTo(this.nearestFood.x, this.nearestFood.y);
    ctx.stroke();
  }
}

function Food(x, y){
  this.x = x;
  this.y = y;
  this.vx = Math.random() - 0.5;
  this.vy = Math.random() - 0.5;
  this.f = 0.999;
  this.radius = 1 + Math.random();

  this.update = function(){
    if(this.x < this.radius){
      this.x = this.radius;
      this.vx *= B;
    }

    if(this.x > c.width - this.radius){
      this.x = c.width - this.radius;
      this.vx *= B;
    }

    if(this.y < this.radius){
      this.y = this.radius;
      this.vy *= B;
    }

    if(this.y > c.height - this.radius){
      this.y = c.height - this.radius;
      this.vy *= B;
    }

    this.vx *= this.f;
    this.vy *= this.f;
    this.x += this.vx;
    this.y += this.vy;
  }
  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, TAU);
    ctx.stroke();
  }
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
