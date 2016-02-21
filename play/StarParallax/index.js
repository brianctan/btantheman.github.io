var c, ctx,
    mx = my = mux = muy = 0, md = false,
    PI = Math.PI, TAU = PI * 2,
    keyCodes = [];

var images = {}, loadingImages = [];

var stars = [], vx = vy = 0, F = 0.9, S = 5, ZC = 1/20, s = 10;

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  windowResize();
  window.addEventListener("resize", windowResize, false);

  c.addEventListener("mousemove", mouseMove, false);
  c.addEventListener("mousedown", mouseDown, false);
  c.addEventListener("mouseup", mouseUp, false);

  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);

  loadImage('star.png');

  for(var i = 0; i < 100; i++){
    stars.push({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      z: Math.random() * s + 0.1,
      size: Math.random() * 1 + 1
    });
  }

  update();
}

function loadImage(url){
  var image = new Image();
  image.src = url;
  image.onload = function(){
    loadingImages.splice(loadingImages.indexOf(this), 1);
    images[url] = this;
  }
  loadingImages.push(image);
}

function update(){
  if(loadingImages.length == 0){
    ctx.fillStyle = "rgba(0,0,0," + 1 + ")";
    ctx.fillRect(0, 0, c.width, c.height);

    if(keyCodes[87]){
      vy -= S;
    }

    if(keyCodes[83]){
      vy += S;
    }

    if(keyCodes[65]){
      vx -= S;
    }

    if(keyCodes[68]){
      vx += S;
    }

    if(keyCodes[39]){
      for(var i in stars){
        var star = stars[i];
        d = Math.sqrt(Math.pow(c.width/2 - star.x, 2) + Math.pow(c.height/2 - star.y, 2));
        v = Math.sqrt(vx*vx+vy*vy);
        a = Math.PI + Math.atan2(c.height/2 - star.y, c.width/2 - star.x);
        n = Math.PI/1000;
        star.x = c.width/2 + d * Math.cos(a + n);
        star.y = c.height/2 + d * Math.sin(a + n);
        vx += Math.cos(a + Math.PI/2);
        vy += Math.sin(a + Math.PI/2);
      }
    }

    vx *= F;
    vy *= F;

    for(var i in stars){
      var star = stars[i];
      star.x += vx * star.z * ZC;
      star.y += vy * star.z * ZC;

      /*
      ctx.beginPath();
      ctx.arc(star.x, star.y, Math.max(1/2, star.z/5 * star.size), 0, TAU);
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fill();

      */

      size = Math.round(Math.max(1, star.z * star.size * 1));
      ctx.drawImage(images['star.png'], Math.round(star.x - size/2 + Math.random()), Math.round(star.y - size/2 + Math.random()), size, size);

      function replaceStar(n){
        if(n == 0){
          star.x = Math.random() > 1/2 ? 0 : c.width;
          star.y = Math.random() * c.height;
        } else{
          star.x = Math.random() * c.width;
          star.y = Math.random() > 1/2 ? 0 : c.height;
        }
        star.z = Math.random() * s;
        star.size = Math.random() * 2;
      }

      if(star.x < 0 || star.x > c.width) replaceStar(0);

      if(star.y < 0 || star.y > c.height) replaceStar(1);
    }
  }
  window.requestAnimationFrame(update);
}

window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function mouseMove(e){
  setMousePosition(e);
}

function mouseDown(e){
  setMousePosition(e);
  md = true;
}

function mouseUp(e){
  mux = mx;
  muy = my;
  setMousePosition(e);
  md = false;
}

function setMousePosition(e){
  mx = e.clientX;
  my = e.clientY;
}

function keyDown(e){
  keyCodes[e.keyCode] = true;
}

function keyUp(e){
  keyCodes[e.keyCode] = false;
}
