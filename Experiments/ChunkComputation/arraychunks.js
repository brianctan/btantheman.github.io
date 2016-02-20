/*
Array Chunks
Code by Mike del Castillo
Last Update: Feb 16, 2016
*/

var Chunk = function(chunkSize){
  this.chunkSize = chunkSize || 128;
  this.chunks = [];

  this.getChunk = function(x, y){
    if(this.chunks[y] == null) this.chunks[y] = [];
    if(this.chunks[y][x] == null) this.chunks[y][x] = [];

    return this.chunks[y][x];
  }

  this.getChunkNear = function(x, y){
    var p = this.getChunkCoordinates(x, y);
    return this.getChunk(p.x, p.y);
  }

  this.pushToChunk = function(x, y, n){
    if(this.chunks[y] == null) this.chunks[y] = [];
    if(this.chunks[y][x] == null) this.chunks[y][x] = [];
    this.chunks[y][x].push(n);
  }

  this.pushToChunkNear = function(x, y, n){
    var p = this.getChunkCoordinates(x, y);
    return this.pushToChunk(p.x, p.y, n);
  }

  this.push = function(p){
    this.pushToChunkNear(p.x, p.y, p);
  }

  this.getChunkCoordinates = function(x, y){
    return {
      x: Math.round(x/this.chunkSize - 0.5),
      y: Math.round(y/this.chunkSize - 0.5)
    };
  }
}
