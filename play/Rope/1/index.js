var c, ctx, t = 0, TAU = Math.PI * 2, mx = my = 0, md = false;

var points = [], F = 0.98, G = 0.1;

var n = 15;

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  windowResize();
  window.addEventListener("resize", windowResize, false);

  c.addEventListener('mousemove', mouseMove, false);

  addRope(100, 100, 10, 20, 10);

  var a = new Point(200, 200, [], 10, 50);
  var b = new Point(220, 200, [], 10, 50);
  var ca = new Point(200, 220, [], 10, 70);
  var d = new Point(220, 190, [], 10, 30);

  a.parents = [ca];
  b.parents = [a];
  ca.parents = [b];
  d.parents = [b];

  points.push(a, b, ca, d);

  update();
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  points[3].pinned = md;

  if(md){
    points[3].x += (mx - points[0].x)/1;
    points[3].y += (my - points[0].y)/1;
  }

  for(var i = 0; i < points.length; i++){
    var p = points[i];
    if(p.lastUpdate != t){
      for(var j = 0; j < p.parents.length; j++){
        var q = p.parents[j];
        p.solveConstraints(q);
      }
    }
  }

  for(var i = 0; i < points.length; i++){
    var p = points[i];
    p.updatePhysics();

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, TAU);
    ctx.stroke();

    ctx.beginPath();
    for(var j = 0; j < p.parents.length; j++){
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.parents[j].x, p.parents[j].y);
    }
    ctx.stroke();

    p.lastUpdate = t;
  }

  t++;
  window.requestAnimationFrame(update);
}

var Point = function(x, y, parents, mass, space){
  this.x = x;
  this.y = y;

  this.px = x;
  this.py = y;

  this.vx = 0;
  this.vy = 0;

  this.parents = parents;

  this.mass = mass;

  this.space = space;

  this.pinned = false;

  this.updatePhysics = function(){
    this.vy += G;

    this.vx *= F;
    this.vy *= F;

    if(!this.pinned){
      this.x += this.vx;
      this.y += this.vy;

      for(var i in this.parents){
        var p = this.parents[i];
        var a = Math.PI + Math.atan2(this.y - p.y, this.x - p.x);

        this.x = p.x + n * Math.cos(a);
        this.y = p.y + n * Math.sin(a);
      }
    }

    if(this.y > c.height){
      this.y = c.height;
      this.vy *= -0.5;
    }
  }

  this.solveConstraints = function(p){
    var transferCoeff = 1;

    var diff_x = this.x - p.x,
		diff_y = this.y - p.y,
		dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
		diff = (space - dist) / dist;

  	var scalar_1 = ((1 / this.mass) / ((1 / this.mass) + (1 / p.mass)));
  	var scalar_2 = 1 - scalar_1;

    this.vx += diff_x * scalar_1 * diff * transferCoeff;
    this.vy += diff_y * scalar_1 * diff * transferCoeff;
    p.vx -= diff_x * scalar_2 * diff * transferCoeff;
    p.vy -= diff_y * scalar_2 * diff * transferCoeff;
  }

  this.lastUpdate = -1;
}

function addRope(x, y, length, spacing, mass){
  points.push(new Point(x, y, [], mass, spacing));
  for(var i = 1; i < length; i++){
    points.push(new Point(x + Math.random(), y + i * spacing, [points[points.length - 1]], mass, spacing));
  }
}

window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function mouseMove(e){
  mx = e.clientX;
  my = e.clientY;
}
