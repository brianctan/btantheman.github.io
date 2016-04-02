var stroke = {
  color: {
    r: 0, g: 0, b: 0, a: 1
  },
  width: 3,
  lag: 0,
  angles: 8,
  x: 0, y: 0,
  tx: 0, ty: 0,
  px: 0, py: 0,
  draw: false,
  follow: true
};

var project = {
  title: "Untitled",
  width: 800,
  height: 800,
  diagonal: 1132
}

var guides = {
  cursor: true,
  stroke: true,
  angles: true,
  ctx: null
};

var layers = [];
var selectedLayer = null;

function windowLoad(){
  initElements();
  updateColor();

  elements.guides.style.width = project.width + "px";
  elements.guides.style.height = project.height + "px";
  elements.canvases.style.width = project.width + "px";
  elements.canvases.style.height = project.height + "px";

  guides.ctx = elements.guides.getContext("2d");
  elements.guides.width = project.width;
  elements.guides.height = project.height;

  newLayer();

  update();

  window.onbeforeunload = function() {
    return "Exiting will delete all progress.";
  }
}

window.addEventListener("load", windowLoad, false);

function update(){
  stroke.px = stroke.x;
  stroke.py = stroke.y;
  stroke.x += (stroke.tx - stroke.x) / Math.pow(1.2, stroke.lag);
  stroke.y += (stroke.ty - stroke.y) / Math.pow(1.2, stroke.lag);

  guides.ctx.clearRect(0, 0, project.width, project.height);

  if(guides.angles){
    guides.ctx.beginPath();
    guides.ctx.strokeStyle = "#DDD";
    for(var i = 0; i < Math.PI * 1.999; i += Math.PI * 2 / stroke.angles){
      guides.ctx.moveTo(project.width/2, project.height/2);
      guides.ctx.lineTo(project.width/2 + Math.cos(i) * project.diagonal, project.height/2 + Math.sin(i) * project.diagonal);
    }
    guides.ctx.stroke();
  }

  if(guides.stroke){
    guides.ctx.beginPath();
    guides.ctx.strokeStyle = "#333";
    guides.ctx.arc(stroke.x, stroke.y, 0.5, 0, Math.PI * 2);
    guides.ctx.moveTo(stroke.x + stroke.width/2, stroke.y);
    guides.ctx.arc(stroke.x, stroke.y, stroke.width/2, 0, Math.PI * 2);
    guides.ctx.stroke();
  }

  if(stroke.draw && selectedLayer){
    selectedLayer.ctx.strokeStyle = rgbString(stroke.color.r, stroke.color.g, stroke.color.b, stroke.color.a);
    selectedLayer.ctx.lineWidth = stroke.width;
    selectedLayer.ctx.beginPath();
    var distp = Math.sqrt((project.width/2 - stroke.px) * (project.width/2 - stroke.px) + (project.height/2 - stroke.py) * (project.height/2 - stroke.py));
    var anglp = Math.atan2((project.height/2 - stroke.py), (project.width/2 - stroke.px));
    var dist = Math.sqrt((project.width/2 - stroke.x) * (project.width/2 - stroke.x) + (project.height/2 - stroke.y) * (project.height/2 - stroke.y));
    var angl = Math.atan2((project.height/2 - stroke.y), (project.width/2 - stroke.x));
    if(stroke.angles % 2 == 1){
      anglp += Math.PI;
      angl += Math.PI;
    }
    for(var i = 0; i < Math.PI * 1.999; i += Math.PI * 2 / stroke.angles){

      selectedLayer.ctx.moveTo(project.width/2 + distp * Math.cos(anglp + i), project.height/2 + distp * Math.sin(anglp + i));
      selectedLayer.ctx.lineTo(project.width/2 + dist * Math.cos(angl + i), project.height/2 + dist * Math.sin(angl + i));
    }
    selectedLayer.ctx.stroke();
  }

  window.requestAnimationFrame(update);
}

function mouseDown(e){
  stroke.draw = true;
  setStrokeTarget(e);
}

function mouseUp(e){
  setStrokeTarget(e);
  stroke.draw = false;
}

function mouseMove(e){
  if(stroke.follow) setStrokeTarget(e);
}

function setStrokeTarget(e){
  stroke.tx = e.clientX - elements.canvases.offsetLeft + window.pageXOffset;
  stroke.ty = e.clientY - elements.canvases.offsetTop + window.pageYOffset;
}

function rgbString(r, g, b, a){
  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

function newLayer(){
  var layer = {
    name: "Layer " + (layers.length + 1),
    visible: true,
    switchSelected: switchSelected
  };

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = project.width;
  canvas.height = project.height;

  layer.canvas = canvas;
  layer.ctx = ctx;

  elements.canvases.appendChild(canvas);

  var layerElement = document.createElement("div");
  layerElement.className = "layer";
  layer.layerElement = layerElement;

  var visibilityToggle = document.createElement("div");
  visibilityToggle.className = "visibilityToggle visible";
  layerElement.appendChild(visibilityToggle);

  visibilityToggle.addEventListener("mouseover", function(){
    layer.canvas.style.opacity = 0.5;
  }, false);

  visibilityToggle.addEventListener("mouseout", function(){
    layer.canvas.style.opacity = layer.visible ? 1 : 0;
  }, false);

  visibilityToggle.addEventListener("click", function(){
    layer.visible = !layer.visible;
    layer.visibilityToggle.className = "visibilityToggle" + (layer.visible ? " visible" : "");
    layer.canvas.style.opacity = layer.visible ? 1 : 0;
  }, false);

  var textfield = document.createElement("input");
  textfield.value = layer.name;
  textfield.className = "layerName";
  layerElement.appendChild(textfield);

  var clear = document.createElement("br");
  clear.className = "clear";
  layerElement.appendChild(clear);
  elements.layers.appendChild(layerElement);

  layer.visibilityToggle = visibilityToggle;
  layers.push(layer);

  function switchSelected(){
    if(selectedLayer){
      selectedLayer.layerElement.className = "layer";
    }
    selectedLayer = layer;
    selectedLayer.layerElement.className = "layer selected";
  }

  textfield.addEventListener("focus", switchSelected, false);
  textfield.focus();

  updateLayers();
}

function updateLayers(){
  for(var i = 0; i < layers.length; i++){
    var l = layers[i];
    l.canvas.style.zIndex = layers.length - i;
  }
}

function deleteLayer(){
  var i = layers.indexOf(selectedLayer);
  var layer = layers[i];
  elements.layers.removeChild(layer.layerElement);
  elements.canvases.removeChild(layer.canvas);
  layers.splice(i, 1);
  if(layers.length){
    layers[Math.max(0, i - 1)].switchSelected();
  } else{
    newLayer();
  }
  updateLayers();
}

function moveLayerUp(){
  var i = layers.indexOf(selectedLayer);
  if(i > 0){
    selectedLayer.layerElement.parentNode.insertBefore(selectedLayer.layerElement, selectedLayer.layerElement.previousSibling);
    var temp = layers[i - 1];
    layers[i - 1] = selectedLayer;
    layers[i] = temp;
  }
  updateLayers();
}

function moveLayerDown(){
  var i = layers.indexOf(selectedLayer);
  if(i < layers.length - 1){
    selectedLayer.layerElement.parentNode.insertBefore(selectedLayer.layerElement, selectedLayer.layerElement.nextSibling.nextSibling);
    var temp = layers[i + 1];
    layers[i + 1] = selectedLayer;
    layers[i] = temp;
  }
  updateLayers();
}

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
  link.target = "_blank";
  link.href = temp.toDataURL("image/png");
  link.click();
}
