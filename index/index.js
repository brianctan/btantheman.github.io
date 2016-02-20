var req, play;

function windowLoad(){
  req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', 'index/play.json', true);
  req.onreadystatechange = function(){
    if(req.readyState == 4 && req.status == "200"){
      onReqLoad(req.responseText);
    }
  }
  req.send(null);

  //get elements

  
}

window.addEventListener("load", windowLoad, false);

function onReqLoad(data){
  play = JSON.parse(data);
}
