var animatedElemets = ["anim1", "anim2", "anim3"];

window.addEventListener("load", function(){
  for(var i in animatedElemets){
    var e = document.getElementById(animatedElemets[i]);
    e.className = e.className.replace(" pre", "");
  }
}, false);
