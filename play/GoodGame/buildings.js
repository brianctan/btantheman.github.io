var buildings = [];
var buildingChunks = [];

var GoldMiner = function(x, y){
  Point.apply(this, arguments);
  this.state = 0;
  this.range = 0;
  updateBuildingLighting(this, 0);
  this.timeOffset = time;
  this.buildDuration = 60 * 3;
  this.capacity = 5000;
  this.stored = 0;
  this.rate = 1;
  this.interval = 60;

  this.type = "Miner";

  this.healthCapacity = 30;
  this.health = this.healthCapacity;
}

GoldMiner.prototype.update = function(){
  if(this.state == 0){
    if(time - this.timeOffset >= this.buildDuration){
      this.state = 1;
      updateBuildingLighting(this, 2);
    }
  } else if(this.state == 1){
    if((this.timeOffset + time)%this.interval == 0) this.stored += this.rate;
  }
}

GoldMiner.prototype.draw = function(){
  ctx.fillStyle = "gold";
  if(this.state == 0){
    ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize, tileSize * ((time - this.timeOffset)/this.buildDuration));
  } else if(this.state == 1){
    ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
  }

  drawHealthBar(this.x, this.y, this.health, this.healthCapacity);
}

var Turret = function(x, y){
  Point.apply(this, arguments);

  this.state = 0;
  this.range = 0;
  updateBuildingLighting(this, 0);
  this.timeOffset = time;
  this.buildDuration = 60 * 4;
  this.interval = 10;
  this.damage = 2;

  this.target = null;

  this.healthCapacity = 50;
  this.health = this.healthCapacity;
}

Turret.prototype.update = function(){
  if(this.state == 0){
    if(time - this.timeOffset >= this.buildDuration){
      this.state = 1;
      updateBuildingLighting(this, 3);
    }
  } else if(this.state == 1){
    if(this.target != null) if(this.target.health <= 0) this.target = null;

    if(this.target == null){
      this.target = findNearestEntity(this.x + 1/2, this.y + 1/2, enemyChunks, enemies, 1, 1);
    }

    if(this.target != null){
      if(Math.sqrt((this.target.x - this.x + 1/2) * (this.target.x - this.x + 1/2) + (this.target.y - this.y + 1/2) * (this.target.y - this.y + 1/2)) <= this.range){
        if((this.timeOffset + time) % this.interval == 0){
          this.target.health -= this.damage;
        }
      }
    }
  }
}

Turret.prototype.draw = function(){
  ctx.fillStyle = "blue";
  if(this.state == 0){
    ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize, tileSize * ((time - this.timeOffset)/this.buildDuration));
  } else if(this.state == 1){
    ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
  }

  drawHealthBar(this.x, this.y, this.health, this.healthCapacity);
}

var addType = 1;

function gameMouseDown(e){
  addBuilding([GoldMiner, Turret][addType], Math.floor(mx/tileSize), Math.floor(my/tileSize));
}

function addBuilding(Type, x, y){
  var b = new Type(x, y);
  updateChunkTargets(x, y, enemyChunks);
  buildings.push(b);
  buildingChunks[x >> MAP.CHUNK_SIZE][y >> MAP.CHUNK_SIZE].push(b);
}

function updateBuildingLighting(building, range){
  if(building.range > 0) editLightRadius(building.x, building.y, building.range, -1);
  building.range = range;
  if(building.range > 0) editLightRadius(building.x, building.y, building.range, 1);
}
