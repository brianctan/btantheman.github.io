/*
Virtual Camera
Code by Mike del Castillo
Last Update: Feb 14, 2016
*/

var VCam = function(canvas, context, x, y, width, height, angle){
  this.canvas = canvas;
  this.context = context;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.angle = angle;
  this.enabled = true;
}

VCam.prototype.point = function(x, y){
  var scale = Math.min(this.canvas.height/this.height, this.canvas.width/this.width);
  var distance = this.distance(this.x, this.y, x, y);
  var angle = Math.atan2(y - this.y, x - this.x) - Math.PI / 2;
  return {
    x: this.canvas.width/2 + distance * scale * Math.cos(angle + this.angle),
    y: this.canvas.height/2 + distance * scale * Math.sin(angle + this.angle),
    scale: scale,
    angle: angle,
    distance: distance
  };
}

VCam.prototype.lineWidth = function (n) {
  if(this.enabled){
    var scale = Math.min(this.canvas.height/this.height, this.canvas.width/this.width);
    this.context.lineWidth = Number(n) * scale;
  } else this.context.lineWidth = n;
}

VCam.prototype.pointIsInbound = function(x, y){
  var vpoint = this.point(x, y);
  return x >= 0 && x <= this.canvas.width && y >= 0 && y <= this.canvas.height;
}

VCam.prototype.moveTo = function(x, y){
  if(this.enabled){
    var vpoint = this.point(x, y);
    this.context.moveTo(vpoint.x, vpoint.y);
  } else this.context.moveTo(x, y);
}

VCam.prototype.lineTo = function(x, y){
  if(this.enabled){
    var vpoint = this.point(x, y);
    this.context.lineTo(vpoint.x, vpoint.y);
  } else this.context.lineTo(x, y);
}

VCam.prototype.arc = function(x, y, r, sa, ea){
  if(this.enabled){
    var vpoint = this.point(x, y);
    this.context.arc(vpoint.x, vpoint.y, vpoint.scale * r, this.angle + sa - Math.PI/2, this.angle + ea - Math.PI/2);
  } else this.context.arc(x, y, r, sa, ea);
}

VCam.prototype.fillRect = function(x, y, w, h){
  if(this.enabled){
    this.context.beginPath();
    this.moveTo(x, y);
    this.lineTo(x + w, y);
    this.lineTo(x + w, y + h);
    this.lineTo(x, y + h);
    this.context.closePath();
    this.context.fill();
  } else this.context.fillRect(x, y, w, h);
}

VCam.prototype.distance = function(x1, y1, x2, y2){
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
