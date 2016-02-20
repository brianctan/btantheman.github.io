var c, ctx;

var cars = [];

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  windowResize();
  window.addEventListener("resize", windowResize, false);

  addCar(100, 100, Math.PI/2, 100, 30);

  update();
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  for(var i = 0; i < cars.length; i++){
    var car = cars[i];

    var backAcc = Math.sqrt(Math.pow(car.back.ax, 2) + Math.pow(car.back.ay, 2));
    var frontAcc = Math.sqrt(Math.pow(car.front.ax, 2) + Math.pow(car.front.ay, 2));

    var angle = Math.atan2(car.front.ay, car.front.ax) + Math.atan2(car.back.y - car.front.y, car.back.x - car.front.y);

    car.back.vx += car.back.ax + frontAcc * Math.cos(angle);
    car.back.vy += car.back.ay + frontAcc * Math.sin(angle);
    car.front.vx += car.front.ax;
    car.front.vy += car.front.ay;

    car.back.ax = car.back.ay = car.front.ax = car.front.ay = 0;

    car.back.vx *= car.mf;
    car.back.vy *= car.mf;
    car.front.vx *= car.mf;
    car.front.vy *= car.mf;

    car.back.x += car.back.vx;
    car.back.y += car.back.vy;

    car.front.x += car.front.vx;
    car.front.y += car.front.vy;

    //car.front.x = car.back.x + car.length * Math.cos(car.back.angle);
    //car.front.y = car.back.y + car.length * Math.sin(car.back.angle);

    ctx.beginPath();
    ctx.moveTo(car.back.x, car.back.y);
    ctx.lineTo(car.front.x, car.front.y);
    ctx.stroke();
  }

  window.requestAnimationFrame(update);
}

function addCar(x, y, angle, mass, length){
  var car = {
    back: {
      x: x,
      y: y,
      angle: angle, ax: 0, ay: 0, vx: 0, vy: 0
    },
    front: {
      x: x + length * Math.cos(angle),
      y: y + length * Math.sin(angle),
      angle: angle, ax: 0, ay: 0, vx: 0, vy: 0, ta: 0, ts: 0.1, tf: 0.9
    },
    mf: 0.98,
    mass: mass,
    length: length
  };

  cars.push(car);
}

window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}
