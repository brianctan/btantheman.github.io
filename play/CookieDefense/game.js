var map = [];
var creatures = [];
var structures = [];
var time = 0;
var money = 0;

var enemyFrequency = 400;

var GRID_SIZE = 30;
var MAP_WIDTH = 30;
var MAP_HEIGHT = 30;

function gameInit(){
  for(var i = 0; i < MAP_WIDTH; i++){
    map.push([]);
    for(var j = 0; j < MAP_HEIGHT; j++){
      map[i].push(1);
    }
  }
}

function gameTick(){


  for(var x = 0; x < map.length; x++){
    for(var y = 0; y < map[x].length; y++){
      if(map[x][y] == 1){
        ctx.fillStyle = "black";
        ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      }
    }
  }


  ctx.fillStyle = "#EEE";
  ctx.fillRect(Math.round(mx/GRID_SIZE - 0.5) * GRID_SIZE, Math.round(my/GRID_SIZE - 0.5) * GRID_SIZE, GRID_SIZE, GRID_SIZE);

  for(var i in structures){
    var s = structures[i];
    if(s.health <= 0){
      structures.splice(i, 1);
      continue;
    }
    s.tick();
    s.draw();
  }

  for(var i in creatures){
    var c = creatures[i];
    if(c.health <= 0){
      creatures.splice(i, 1);
      continue;
    }
    c.tick();
    c.draw();
  }

  if(time%enemyFrequency == 0 && structures.length > 0){
    var r;
    do{
      r = new Point(Math.round(Math.random() * (MAP_WIDTH - 1)), Math.round(Math.random() * (MAP_HEIGHT - 1)));
    } while(map[r.x][r.y] == 0);
    spawnEnemy(r.x, r.y);
  }


  time++;
}

var clickType = 0;
function gameClick(){
  var s = new [Miner, BasicTurret][clickType](Math.round(mx/GRID_SIZE - 0.5), Math.round(my/GRID_SIZE - 0.5), clickType);
  for(var x = -s.range; x <= s.range; x++){
    for(var y = -s.range; y <=  s.range; y++){
      if(x*x + y*y <= s.range*s.range){
        map[Math.max(0, Math.min(MAP_WIDTH - 1, s.x + x))][Math.max(0, Math.min(MAP_HEIGHT - 1, s.y + y))] = 0;
      }
    }
  }
  structures.push(s);
}
