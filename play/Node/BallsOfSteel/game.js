var player = {
  x: 25, y: 25,
  vx: 0, vy: 0,
  mass: 100, size: 25,
  rotation: 0, speed: 0.1, jump: 3, jumpAngle: PI/2, name: "BB8"
}

var F = 0.999, G = 0.15, WM = 500, B = 2, C = 10;

var camx = camy = 0, camc = 1/10;

var socket, debug = true, server = "localhost:8080", clientIndex = 0;

var walls = [], players = [];

function initGame(){
  var q = getURLQuery();
  server = q.server || prompt("What server do you want to connect to?", "localhost:8080");
  player.name = prompt("What would you like your name to be on server " + server + "?").toUpperCase();

  socket = new WebSocket("ws://" + server);

  socket.onopen = function(){
    log("Connected");
    updatePlayerInfo();
    requestPlayers();
  }

  socket.onmessage = function(data){
    data = JSON.parse(data.data)

    if(data.type == "map"){
      walls = data.data;
    }

    if(data.type == "players"){
      players = data.data;
      clientIndex = data.clientIndex;
      updatePlayerInfo();
      requestPlayers();
    }
  }

  socket.onclose = function(){
    alert("Server closed.");
  }

  cam.enabled = true;
}

function requestPlayers(){
  socket.send(JSON.stringify(
    {
      type: "getplayers",
      data: ""
    }
  ));
}

function updatePlayerInfo(){
  socket.send(JSON.stringify(
    {
      type: "update",
      data: {
        x: player.x,
        y: player.y,
        rotation: player.rotation,
        name: player.name
      }
    }
  ));
}

function updateGame(){

  if(keyCodes[65]){
    player.vx -= player.speed;
  }

  if(keyCodes[68]){
    player.vx += player.speed;
  }

  if(keyCodes[32] && player.grounded){
    player.vx -= player.jump * Math.cos(player.jumpAngle);
    player.vy -= player.jump * Math.sin(player.jumpAngle);
  }

  for(var i in walls){
    var w = walls[i];
    ctx.beginPath();
    cam.moveTo(w[0].x, w[0].y);
    cam.lineTo(w[1].x, w[1].y);
    ctx.stroke();
  }

  for(var i in players){
    var p = players[i];
    if(i != clientIndex){
      ctx.beginPath();
      cam.arc(p.x, p.y, 25, 0, TAU);
      ctx.stroke();

      ctx.beginPath();
      cam.arc(p.x, p.y, player.size - 5, p.rotation, p.rotation + PI / 2);
      ctx.stroke();

      ctx.beginPath();
      cam.arc(p.x, p.y, player.size - 5, p.rotation - PI, p.rotation + PI / 2 - PI);
      ctx.stroke();

      var point = cam.point(p.x, p.y);
      ctx.textAlign = "center";
      ctx.font = Math.round(20 * point.scale) + "px Arial";
      ctx.fillText(p.name, point.x, point.y - 35 * point.scale);
    }
  }

  player.applyPhysics();

  player.draw();

  cam.x += ((player.x + player.vx * 1) - cam.x) * camc;
  cam.y += ((player.y + player.vy * 1) - cam.y) * camc;
}

player.applyPhysics = function(){
  this.vy += G;

  this.grounded = false;

  var angles = [];

  for(var i in walls){
    var w = walls[i];
    var np = nearestPointFromSegment(w[0].x, w[0].y, w[1].x, w[1].y, this.x, this.y);
    if(np.distance < this.size){
      var dx = this.x - np.x,
      dy = this.y - np.y,
      diff = (this.size - np.distance) / np.distance,
      s1 = (1/this.mass)/((1/this.mass) + (1/WM));

      this.x += dx * diff * s1;
      this.y += dy * diff * s1;

      this.vx += dx * diff * s1 * B;
      this.vy += dy * diff * s1 * B;

      angles.push(Math.atan2(dy, dx));

      this.grounded = true;
    }
  }

  for(var i in players){
    var p = players[i];
    if(i != clientIndex){
      var dx = this.x - p.x,
      dy = this.y - p.y,
      dist = Math.sqrt(dx*dx+dy*dy),
      diff = (this.size * 2 - dist)/dist,
      s1 = s2 = 0.5;

      if(dist < this.size*2){
        this.x += dx*diff*s1;
        this.y += dy*diff*s1;
        this.vx += dx*diff*s1;
        this.vy += dy*diff*s1;

        angles.push(Math.atan2(dy, dx));

        this.grounded = true;
      }
    }
  }

  this.jumpAngle = 0;

  for(var i in angles){
    this.jumpAngle += angles[i];
  }

  this.jumpAngle /= angles.length;
  this.jumpAngle += PI;

  this.vx *= F;
  this.vy *= F;

  var vAngle = Math.atan2(this.vy, this.vx);
  var speed = Math.sqrt(this.vx*this.vx+this.vy*this.vy);

  this.vx = Math.min(C, speed) * Math.cos(vAngle);
  this.vy = Math.min(C, speed) * Math.sin(vAngle);

  this.x += this.vx;
  this.y += this.vy;
}

player.draw = function(){
  ctx.beginPath();
  cam.arc(this.x, this.y, this.size, 0, TAU);
  ctx.stroke();

  this.rotation += this.vx/15;

  ctx.beginPath();
  cam.arc(this.x, this.y, this.size - 5, this.rotation, this.rotation + PI / 2);
  ctx.stroke();

  ctx.beginPath();
  cam.arc(this.x, this.y, this.size - 5, this.rotation - PI, this.rotation + PI / 2 - PI);
  ctx.stroke();


  var point = cam.point(this.x, this.y);
  ctx.textAlign = "center";
  ctx.font = Math.round(20 * point.scale) + "px Arial";
  ctx.fillText(this.name, point.x, point.y - 35 * point.scale);
  /*ctx.beginPath();
  angle = -PI/2 - this.vx/10;
  r = 10;
  cam.arc(this.x + Math.cos(angle) * (this.size + r), this.y + Math.sin(angle) * (this.size + r), r, 0, TAU);
  ctx.stroke();*/
}

function generateMap(){
  var yLevel = 500;
  var yVar = 100;
  var xSpeed = 100;
  var xVar = 50;

  var lx = -100, ly = yLevel;

  for(var i = 0; i < 500; i++){
    var nx = lx + xSpeed + (Math.random() * xVar),
        ny = yLevel + (Math.random() - Math.random()) * yVar;
    walls.push([
      {x: lx, y: ly},
      {x: nx, y: ny}
    ]);

    yLevel = ny;
    lx = nx;
    ly = ny;
  }
}

function log(s){
  if(debug) console.log(s);
}
