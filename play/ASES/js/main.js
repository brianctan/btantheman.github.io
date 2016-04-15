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
  if(!stopScrolling) window.requestAnimationFrame(smoothScrollUpdate);
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
