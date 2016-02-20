var c, ctx;

function windowLoad(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  windowResize();
  window.addEventListener("resize", windowResize, false);

  ctx.fillRect(0, 0, c.width, c.height);
}

window.addEventListener("load", windowLoad, false);

function windowResize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}
