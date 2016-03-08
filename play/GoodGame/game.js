var camera = {
  x: 0,
  y: 0
}, tileSize = 30;

var fps = 0;
var time = 0;
var statsRate = 1000;

var money = 0;
var difficultyLevel = 0;
var difficultyRate = 0.00001;

function gameInit(){
  setInterval(function(){
    stats.innerHTML = "FPS: " + (fps/(statsRate/1000)) + "<br/>";
    stats.innerHTML += "Money: " + money + "<br/>";
    stats.innerHTML += "Difficulty: " + difficultyLevel + "<br/>";
    stats.innerHTML += "<a href='javascript: addType = 0;'>Select Miner</a><br/>";
    stats.innerHTML += "<a href='javascript: addType = 1;'>Select Turret</a><br/>";
    fps = 0;
  }, statsRate);

  initMaps();
  createChunks();
  update();
}

function createChunks(){
  for(var x = 0; x < MAP.WIDTH>>MAP.CHUNK_SIZE; x++){
    if(buildingChunks[x] == null) buildingChunks[x] = [];
    if(enemyChunks[x] == null) enemyChunks[x] = [];
    for(var y = 0; y < MAP.HEIGHT>>MAP.CHUNK_SIZE; y++){
      if(buildingChunks[x][y] == null) buildingChunks[x][y] = [];
      if(enemyChunks[x][y] == null) enemyChunks[x][y] = [];
    }
  }
}

function update(){
  ctx.clearRect(0, 0, c.width, c.height);

  money = 0;

  for(var x = 0; x < Math.floor(c.width/tileSize); x++){
    for(var y = 0; y < Math.floor(c.height/tileSize); y++){
      ctx.fillStyle = "gray";
      if(lightMap[x][y] == 0)
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }

  for(var i = 0; i < buildings.length; i++){
    var b = buildings[i];
    if(b.health <= 0){
      buildings.splice(i, 1);
      var a = buildingChunks[b.x >> MAP.CHUNK_SIZE][b.y >> MAP.CHUNK_SIZE];
      a.splice(a.indexOf(b), 1);
      updateBuildingLighting(b, 0);
      updateChunkTargets(b.x, b.y, enemyChunks);
    } else{
      b.update();
      b.draw();
      if(b.type == "Miner"){
        money += b.stored;
      }
    }
  }

  for(var i = 0; i < enemies.length; i++){
    var e = enemies[i];
    if(e.health <= 0){
      enemies.splice(i, 1);
      var a = enemyChunks[e.x >> MAP.CHUNK_SIZE][e.y >> MAP.CHUNK_SIZE];
      a.splice(a.indexOf(e), 1);
    } else{
      e.update();
      if(lightMap[Math.floor(e.x)] != null)
      if(lightMap[Math.floor(e.x)][Math.floor(e.y)] != null)
      if(lightMap[Math.floor(e.x)][Math.floor(e.y)]) e.draw();
    }
  }

  ctx.fillStyle = "rgba(200, 200, 200, 0.5)";
  ctx.fillRect(Math.floor((mx)/tileSize) * tileSize, Math.floor(my/tileSize) * tileSize, tileSize, tileSize);

  fps++;
  time++;
  difficultyLevel += difficultyRate;
  if(time%Math.floor(100/(difficultyRate + 1)) == 0 && enemies.length <= 20){
    spawnRandomEnemy();
  }
  window.requestAnimationFrame(update);
}


var Point = function(x, y){
  this.x = x;
  this.y = y;
}

function findNearestEntity(x, y, chunkArray, array, startRange, maxRange){
  var chunkX = x >> MAP.CHUNK_SIZE;
  var chunkY = y >> MAP.CHUNK_SIZE;
  var searchRadius = startRange;
  var found = null;
  var searchArray = chunkArray[chunkX][chunkY];

  var closestDistance = MAP.WIDTH * MAP.HEIGHT;
  var closest = null;

  var DEBUG_iterations = 0;

  do{
    if(searchRadius != 0){
      for(var n = -1; n < 2; n += 2){
        for(var m = -searchRadius; m <= searchRadius; m++){
          if(chunkArray[chunkX + m] != null){
            if(chunkArray[chunkX + m][chunkY + n] != null){
              if(chunkArray[chunkX + m][chunkY + n].length > 0){
                searchArray = searchArray.concat(chunkArray[chunkX + m][chunkY + n]);
              }
            }
          }
        }
        for(var m = -searchRadius + 1; m <= searchRadius - 1; m++){
          if(chunkArray[chunkX + n] != null){
            if(chunkArray[chunkX + n][chunkY + m] != null){
              if(chunkArray[chunkX + n][chunkY + m].length > 0){
                searchArray = searchArray.concat(chunkArray[chunkX + n][chunkY + m]);
              }
            }
          }
        }
      }
    }
    for(var i = 0; i < searchArray.length; i++){
      var entity = searchArray[i];
      var distance = Math.sqrt((x - entity.x) * (x - entity.x) + (y - entity.y) * (y - entity.y));
      if(distance < closestDistance){
        closest = entity;
        closestDistance = distance;
      }
      DEBUG_iterations++;
    }
    if(closest != null){
      found = closest;
    } else{
      searchArray = [];
      searchRadius++;
    }
    DEBUG_iterations++;
  } while(found == null && searchRadius <= maxRange && array.length > 0);

  return found;
}

function drawHealthBar(x, y, health, healthCapacity){
  ctx.fillStyle = "darkgreen";
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, 4);
  ctx.fillStyle = "green";
  ctx.fillRect(x * tileSize, y * tileSize, tileSize * (health/healthCapacity), 4);
}
