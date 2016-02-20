var c, ctx, mx = my = 0;

var ropes = [];

var TIME_CONSTANT = 1/30;

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  windowResize();
  window.addEventListener("resize", windowResize, false);

  c.addEventListener('mousemove', mouseMove, false);

  ropes.push(new Rope(100, 100, 50));

  update();
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  ropes[0].points[0].pinned = false;
  ropes[0].points[0].x = mx;
  ropes[0].points[0].y = my;

  for(var i in ropes){
    var r = ropes[i];

    r.applyPhysics();
    r.draw();

  }

  window.requestAnimationFrame(update);
}

var ROPE_MAX_DISTANCE = 10;

var solveConstraints = function(p1, p2) {
    var diff_x = p1.x - p2.x,
		diff_y = p1.y - p2.y,
		dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
		diff = (ROPE_MAX_DISTANCE - dist) / dist;

	var scalar_1 = ((1 / p1.mass) / ((1 / p1.mass) + (1 / p2.mass)));
	var scalar_2 = 1 - scalar_1;

    if(!p1.pinned) {
        p1.x += diff_x * scalar_1 * diff * (TIME_CONSTANT);
        p1.y += diff_y * scalar_1 * diff * (TIME_CONSTANT);
    }

    if(!p2.pinned) {
        p2.x -= diff_x * scalar_2 * diff * (TIME_CONSTANT);
        p2.y -= diff_y * scalar_2 * diff * (TIME_CONSTANT);
    }
};

var Point = function(x, y, mass, pinned) {
    this.x = x;
    this.y = y;

    this.prevX = x;
    this.prevY = y;

    this.xVel = 0;
    this.yVel = 0;

    this.mass = mass;

    this.pinned = pinned;
    this.connected = true;
    this.visible = true;
};

var Rope = function(x, y, length) {
    this.x = x;
    this.y = y;

    this.length = length;

    this.startX = x;
    this.startY = y;

    this.points = [];

    for(var i = 0; i < length; i++) {
        var node = new Point(x + i * 0, y + i * ROPE_MAX_DISTANCE, 100, i === 0);
        this.points.push(node);
    }

    var node = new Point(x, y + length * ROPE_MAX_DISTANCE, 100, i === 0);
    this.points.push(node);

    this.draw = function(){
    ctx.beginPath();
    //ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      for(var i in this.points){
        var p = this.points[i];
        if(i == 0){
          ctx.moveTo(p.x, p.y);
        } else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    this.applyPhysics = function() {
        for(var index in this.points) {
            var node = this.points[index];

            if(index > 0) {
                var previousNode = this.points[index - 1];

                if(node.mass === 30 && !node.connected) {
                    node.x += node.xVel;
                    node.y += node.yVel;

                    node.yVel += 0.25;

                    node.xVel *= 0.98;
                    node.yVel *= 0.98;
                } else {
                    for(i = 0; i < 2; i++) {
                        node.yVel += 0.1;

                        node.xVel *= 0.9;
                        if(Math.abs(node.xVel) <= 0.01) {
                            node.xVel = 0;
                        }

                        var time = TIME_CONSTANT;

                        var nextX = node.x + (node.x - node.prevX) + node.xVel * time * time;
                        var nextY = node.y + (node.y - node.prevY) + node.yVel * time * time;

                        node.prevX = node.x;
                        node.prevY = node.y;

                        node.x = nextX;
                        node.y = nextY;

                        if(node.y > c.height){
                          node.y = c.height;
                          node.yVel *= -0.5;
                          node.xVel *= 0.5;
                        }

                        if(node.pinned) {
                            node.x = node.prevX;
                            node.y = node.prevY;
                        }

                        for(var t = 0; t < 50; t++) {
                            if(node.connected) {
                                solveConstraints(node, previousNode);
                            }
                        }
                    }
                }
            }
        }
    };
};


window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function mouseMove(e){
  mx = e.clientX;
  my = e.clientY;
}
