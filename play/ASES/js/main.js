var animatedElemets = ["anim1", "anim2", "anim3"];

window.addEventListener("load", function(){
  for(var i in animatedElemets){
    var e = document.getElementById(animatedElemets[i]);
    e.className = e.className.replace(" pre", "");
  }
}, false);

window.addEventListener("load", setLinkFunctions, false);

var linkClickables = [];
var stopScrolling = true;
var scrollTarget = 0;
var windowScroll = 0;
var scrollEase = 10;

function setLinkFunctions(){
  var links = document.getElementsByTagName("a");
  for(var i = 0; i < links.length; i++){
    var link = links[i];
    var href = link.getAttribute("href") || "";
    var hrefr = href.replace("#", "");
    if(hrefr != href){
      linkClickables.push(hrefr);
      link.setAttribute("data-link-id", hrefr);
      link.addEventListener("click", smoothScroll, false);
    }
  }

  document.addEventListener("mousewheel", smoothScrollStop, false);
  document.addEventListener("touchstart", smoothScrollStop, false);
  document.addEventListener("mousedown", smoothScrollStop, false);
  document.addEventListener("keydown", smoothScrollStop, false);
  window.addEventListener("resize", smoothScrollStop, false);

  document.addEventListener("scroll", function(){
    windowScroll = document.body.scrollTop;
  }, false);
}

function smoothScrollStop(){
  if(!stopScrolling) stopScrolling = true;
}

function smoothScrollUpdate(){
  windowScroll += ((scrollTarget - windowScroll)/scrollEase);
  document.body.scrollTop = Math.round(windowScroll);
  if(Math.round(windowScroll - scrollTarget) == 0) stopScrolling = true;
  if(!stopScrolling){
    if(window.requestAnimationFrame){
      window.requestAnimationFrame(smoothScrollUpdate);
    } else{
      setTimeout(smoothScrollUpdate, 1000/30);
    }
  }
}

function smoothScroll(e){
  var goto = document.getElementById(this.getAttribute("data-link-id"));
  console.log(goto);
  if(goto){
    scrollTarget = goto.offsetTop;
    scrollEase = Math.abs(scrollTarget - windowScroll)/150;
    stopScrolling = false;
    smoothScrollUpdate();
  }
  e.preventDefault();
}

function countimate(start, end, ease, action){
  var prev = start;
  function loop(){
    prev = start;
    start += (end - start)/ease;
    action(start, prev);
    if(Math.round(start - end) != 0){
      window.requestAnimationFrame(loop);
    }
  }
  loop();
}

var animScroll = [
  {
    id: "people",
    anim: function(){
      countimate(1, 40, 20, function(s, p){
        document.getElementById("delegateCount").innerHTML = Math.round(s);
        for(var i = Math.round(p); i <= Math.round(s); i++){
          if(document.getElementById("person" + i).className == "hidden"){
            document.getElementById("person" + i).className = "";
          }
        }
      });
    },
    done: false
  },
  {
    id: "earlybirdPrice",
    anim: function(){
      countimate(0, 350, 20, function(s){
        document.getElementById("earlybirdPrice").innerHTML = "$" + Math.round(s);
      });
    },
    done: false
  },
  {
    id: "regularPrice",
    anim: function(){
      countimate(0, 400, 20, function(s){
        document.getElementById("regularPrice").innerHTML = "$" + Math.round(s);
      });
    },
    done: false
  }
];

document.addEventListener("scroll", checkAnimScroll, false);
window.addEventListener("load", checkAnimScroll, false);

function checkAnimScroll(){
  for(var i = 0; i < animScroll.length; i++){
    var as = animScroll[i];
    if(as.done) continue;
    var elem = document.getElementById(as.id);
    if(elem.offsetTop + elem.offsetHeight/2 <= document.body.scrollTop + window.innerHeight && elem.offsetTop + elem.offsetHeight/2 >= document.body.scrollTop && !as.done){
      as.anim();
      as.done = true;
    }
  }
}
