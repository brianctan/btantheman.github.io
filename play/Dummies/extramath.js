/*
Extra Math
Code by Mike del Castillo
Last Update: Feb 10, 2016
*/

function normalizeAngle(n){
  n = n % (Math.PI * 2);
  if(n < 0) n += Math.PI * 2;
  return n;
}

function shortestAngleDisplacement(from, to){
  var diff = normalizeAngle(to - from);
  var comp = normalizeAngle(Math.PI * 2 - diff);
  if(diff >= comp){
    return -comp;
  }
  if(comp > diff){
    return diff;
  }
}

function deg2rad(n){
  return n * Math.PI / 180;
}

function rad2deg(n){
  return n * 180 / Math.PI;
}

function signZ(n){
  return n >= 0 ? 1 : -1;
}

function sign(n){
  return n == 0 ? 0 : n > 0 ? 1 : -1;
}

function distance(fx, fy, tx, ty){
  return Math.sqrt(Math.pow(fx - tx, 2) + Math.pow(fy - ty, 2));
}

function twoSegmentIntersection(x1, y1, x2, y2, x3, y3, x4, y4){
  var A1 = y2 - y1;
  var B1 = x1 - x2;
  var C1 = A1 * x1 + B1 * y1;

  var A2 = y4 - y3;
  var B2 = x3 - x4;
  var C2 = A2 * x3 + B2 * y3;

  var D = A1 * B2 - A2 * B1;

  if(D != 0){
    var x = (B2 * C1 - B1 * C2)/D;
    var y = (A1 * C2 - A2 * C1)/D;
    if(Math.min(x1, x2) <= x && x <= Math.max(x1, x2) &&
       Math.min(x3, x4) <= x && x <= Math.max(x3, x4) &&
       Math.min(y1, y2) <= y && y <= Math.max(y1, y2) &&
       Math.min(y3, y4) <= y && y <= Math.max(y3, y4)){
        return {x: x, y: y};
    }
  }

  return null;
}

function rand(from, to){
  return Math.random() * (to - from) + from;
}
