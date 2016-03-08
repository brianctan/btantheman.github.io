var MAP = {
  WIDTH: 64,
  HEIGHT: 64,
  CHUNK_SIZE: 3
};

var lightMap = [];

function initMaps(){
  for(var x = 0; x < MAP.WIDTH; x++){
    lightMap[x] = [];
    for(var y = 0; y < MAP.HEIGHT; y++){
      lightMap[x][y] = 0;
    }
  }
}

function editLightRadius(sx, sy, r, n){
  for(var x = -r; x <= r; x++){
    for(var y = -r; y <= r; y++){
      if(x * x + y * y <= r * r + 1)
        if(lightMap[sx + x] != null)
          if(lightMap[sx + x][sy + y] != null)
            lightMap[sx + x][sy + y] = Math.max(0, lightMap[sx + x][sy + y] + n);
    }
  }
}
