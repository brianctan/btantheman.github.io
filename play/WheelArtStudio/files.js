function download(alpha){
  var temp = document.createElement("canvas");
  var ctx = temp.getContext("2d");
  temp.width = project.width;
  temp.height = project.height;
  ctx.fillStyle = "white";
  if(!alpha) ctx.fillRect(0, 0, project.width, project.height);
  for(var i = layers.length - 1; i >= 0; i--){
    if(layers[i].visible) ctx.drawImage(layers[i].canvas, 0, 0);
  }
  var link = document.createElement("a");
  link.download = "wheel_art.png";
  link.setAttribute("target", "_blank");
  link.href = temp.toDataURL("image/png");
  link.click();
}

function exportToJson(visibleOnly){
  visibleOnly = visibleOnly || false;
  var json = {
    project: project,
    layers: []
  };

  for(var i = 0; i < layers.length; i++){
    var l = layers[i];
    var nl = {};
    nl.name = l.textfield.value;
    nl.visible = l.visible;
    nl.data = l.canvas.toDataURL("image/png");
    json.layers.push(nl);
  }

  var link = document.createElement("a");
  link.download = "wheel_art_project.json";
  link.setAttribute("target", "_blank");
  link.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
  var e = document.createEvent("MouseEvents");
  e.initEvent("click", true, true);
  link.dispatchEvent(e);
}

function importJson(js){
  var json = JSON.parse(js);
  for(var i = 0; i < json.layers.length; i++){
    var jl = json.layers[i];
    var l = newLayer(jl.name);
    l.visible = jl.visible;
    var img = new Image();
    img.src = jl.data;
    img.onload = function(){
      l.ctx.drawImage(img, 0, 0);
    }
  }
}
