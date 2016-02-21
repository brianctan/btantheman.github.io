var play;

function windowLoad(){
  $.getJSON('index/play.json', onReqLoad);
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
