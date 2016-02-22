var play, ham, nav, navListener;

function windowLoad(){
  //$.getJSON('index/play.json', onReqLoad);
  ham = document.getElementById("hamburger");
  nav = document.getElementById("navbar");
  ham.addEventListener("click", toggleNavigation, false);
}

window.addEventListener("load", windowLoad, false);

function onReqLoad(data){
  play = data;
  displayList(play);
}

function displayList(list){
  for(var i in list){
    var item = list[i];
  }
}

function toggleNavigation(){
  if(nav.className == "navigation hidden"){
    nav.className = "navigation";
  } else{
    nav.className = "navigation hidden";
  }
}
