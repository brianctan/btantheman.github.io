var cars = [];

function Car(x, y, length){
  this.points = [];
  this.length = length || 20;
  this.points.push({
    x: x,
    y: y,
    vx: 0, vy: 0, vel: 0, velangle: 0,
    angle: 0, inf: 0.5, f: 0.99
  });
  this.points.push({
    x: x + this.length,
    y: y,
    vx: 0, vy: 0, vel: 0, velangle: 0,
    angle: 0, inf: 0.5, f: 0.99
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

      if(i == 0) p.angle = PI + Math.atan2(dy, dx);
      if(i == 1) p.angle = Math.atan2(my - p.y, mx - p.x);

      for(var j = 0; j < cars.length; j++){
        var car = cars[j];
        for(var k = 0; k < car.points.length; k++){
          var q = car.points[k];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if(dist < car.length/2 + this.length/2 && car != this){
            var diff = (car.length/2 + this.length/2 - dist)/dist;

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
          }
        }
      }

      p.vx *= p.f;
      p.vy *= p.f;

      p.vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

      if(md && i == 0) p.vel = 2;

      p.vx = p.vx * (1 - p.inf) + Math.cos(p.angle) * p.vel * p.inf;
      p.vy = p.vy * (1 - p.inf) + Math.sin(p.angle) * p.vel * p.inf;

      p.x += p.vx;
      p.y += p.vy;
    }
  };

  this.draw = function(){
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    ctx.arc(this.points[0].x, this.points[0].y, this.length/2, this.points[0].angle, this.points[0].angle + TAU);
    ctx.moveTo(this.points[1].x, this.points[1].y);
    ctx.arc(this.points[1].x, this.points[1].y, this.length/2, this.points[1].angle, this.points[1].angle + TAU);
    ctx.stroke();
  };
}
