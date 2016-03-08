var enemies = [];
var enemyChunks = [];

function updateChunkTargets(x, y, chunkArray){
  var a = chunkArray[x >> MAP.CHUNK_SIZE][y >> MAP.CHUNK_SIZE];
  for(var i = 0; i < a.length; i++){
    var n = a[i];
    n.target = null;
  }
}

var BasicEnemy = function(x, y){
  Point.apply(this, arguments);

  this.interactionRange = 1.5;
  this.speed = 0.01;

  this.target = null;
  this.interval = 200;
  this.timeOffset = time;
  this.damage = 5;

  this.chunkLocation = new Point(x >> MAP.CHUNK_SIZE, y >> MAP.CHUNK_SIZE);
  updateChunkTargets(x, y, buildingChunks);

  this.healthCapacity = 25;
  this.health = this.healthCapacity;
}

BasicEnemy.prototype.update = function(){
  if(this.x >> MAP.CHUNK_SIZE != this.chunkLocation.x || this.y >> MAP.CHUNK_SIZE != this.chunkLocation.y){
    var index = enemyChunks[this.chunkLocation.x][this.chunkLocation.y].indexOf(this);
    enemyChunks[this.chunkLocation.x][this.chunkLocation.y].splice(index, 1);

    this.chunkLocation.x = this.x >> MAP.CHUNK_SIZE;
    this.chunkLocation.y = this.y >> MAP.CHUNK_SIZE;
    updateChunkTargets(this.x, this.y, buildingChunks);

    enemyChunks[this.chunkLocation.x][this.chunkLocation.y].push(this);
  }

  if(this.target != null) if(this.target.health <= 0) this.target = null;

  if(this.target == null) this.target = findNearestEntity(this.x, this.y, buildingChunks, buildings, 1, 3);

  if(this.target != null){
    if(Math.sqrt((this.target.x - this.x + 1/2) * (this.target.x - this.x + 1/2) + (this.target.y - this.y + 1/2) * (this.target.y - this.y + 1/2)) <= this.interactionRange){
      if((this.timeOffset + time) % this.interval == 0){
        this.target.health -= this.damage;
      }
    } else{
      var angle = Math.atan2(this.target.y - this.y + 1/2, this.target.x - this.x + 1/2);
      this.x += this.speed * Math.cos(angle);
      this.y += this.speed * Math.sin(angle);
    }
  }
}

BasicEnemy.prototype.draw = function(){
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(this.x * tileSize, this.y * tileSize, tileSize/4, 0, TAU);
  ctx.fill();

  drawHealthBar(this.x - 0.5, this.y - 0.5, this.health, this.healthCapacity);
}

function spawnRandomEnemy(){
  var x, y;
  do{
    x = Math.floor(Math.random() * MAP.WIDTH);
    y = Math.floor(Math.random() * MAP.HEIGHT);
  } while(lightMap[x][y] > 0);

  spawnEnemy(BasicEnemy, x, y);
}

function spawnEnemy(Type, x, y){
  var enemy = new Type(x + 1/2, y + 1/2);
  enemies.push(enemy);
  enemyChunks[x >> MAP.CHUNK_SIZE][y >> MAP.CHUNK_SIZE].push(enemy);
}
