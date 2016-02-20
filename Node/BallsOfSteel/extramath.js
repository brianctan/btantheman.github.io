/*
Extra Math
Code by Mike del Castillo
Last Update: Feb 14, 2016
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

function nearestPointFromSegment(x1, y1, x2, y2, x3, y3){
  var segmentLength = distance(x1, y1, x2, y2),
  h1 = distance(x1, y1, x3, y3),
  lineAngle = Math.atan2(y2 - y1, x2 - x1),
  angle = Math.atan2(y3 - y1, x3 - x1) - lineAngle,
  b1 = h1 * Math.sin(angle) / Math.tan(angle),
  x = x1 + Math.cos(lineAngle) * b1,
  y = y1 + Math.sin(lineAngle) * b1,
  d = distance(x, y, x3, y3),
  sx = Math.min(x1, x2),
  sy = Math.min(y1, y2),
  spy = sx == x1 ? y1 : y2,
  sd = distance(x3, y3, sx, spy),
  bx = Math.max(x1, x2),
  by = Math.max(y1, y2),
  bpy = bx == x1 ? y1 : y2,
  bd = distance(x3, y3, bx, bpy);

  if(sx <= x && x <= bx &&
  sy <= y && y <= by){
    return {
      x: x,
      y: y,
      distance: d
    }
  } else{
    if(sd < bd){
      return {
        x: sx,
        y: spy,
        distance: sd
      }
    } else{
      return {
        x: bx,
        y: bpy,
        distance: bd
      }
    }
  }
}
