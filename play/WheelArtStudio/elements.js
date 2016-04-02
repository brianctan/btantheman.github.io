var elements = [];
var displayString = "display";
var elementsWidthDisplays = [
  "colorR",
  "colorG",
  "colorB",
  "colorA",
  "colorR",
  "swidth",
  "lag",
  "angles"
];
var elementIds = [
  "canvases",
  "guides",
  "layers",
  "colorPreview"
];
var guideString = "guide";
var elementsForGuides = [
  "anglesguide",
  "strokeguide"
];

function initElements(){
  for(var i = 0; i < elementIds.length; i++){
    elements[elementIds[i]] = document.getElementById(elementIds[i]);
  }

  for(var i = 0; i < elementsWidthDisplays.length; i++){
    var id = elementsWidthDisplays[i];
    elements[id] = document.getElementById(id);
    elements[id + displayString] = document.getElementById(id + "display");

    elements[id].addEventListener("input", updateDisplayText, false);
    updateDisplayText.apply(elements[id]);

    elements[id + displayString].addEventListener("input", updateSlider, false);
    updateSlider.apply(elements[id + displayString]);

    if(id.replace("color", "") != id){
      elements[id].addEventListener("input", updateColor, false);
      elements[id + displayString].addEventListener("input", updateColor, false);
    }
    if(id == "swidth"){
      elements[id].addEventListener("input", updateWidth, false);
      elements[id + displayString].addEventListener("input", updateWidth, false);
    }
    if(id == "lag"){
      elements[id].addEventListener("input", updateLag, false);
      elements[id + displayString].addEventListener("input", updateLag, false);
    }
    if(id == "angles"){
      elements[id].addEventListener("input", updateAngles, false);
      elements[id + displayString].addEventListener("input", updateAngles, false);
    }
  }

  for(var i = 0; i < elementsForGuides.length; i++){
    var id = elementsForGuides[i];
    elements[id] = document.getElementById(id);
    elements[id].addEventListener("change", function(){
      guides[this.id.replace(guideString, "")] = this.checked;
    }, false);
  }

  elements.canvases.addEventListener("mousedown", mouseDown, false);
  elements.canvases.addEventListener("mouseup", mouseUp, false);
  elements.canvases.addEventListener("mouseout", mouseUp, false);
  elements.canvases.addEventListener("mousemove", mouseMove, false);
}

function updateDisplayText(){
  elements[this.id + displayString].value = this.value || this.getAttribute("min");
}

function updateSlider(){
  elements[this.id.replace(displayString, "")].value = this.value || this.getAttribute("min");
}

function updateColor(){
  stroke.color.r = Number(elements.colorR.value);
  stroke.color.g = Number(elements.colorG.value);
  stroke.color.b = Number(elements.colorB.value);
  stroke.color.a = Number(elements.colorA.value)/100;
  elements.colorPreview.style.backgroundColor = rgbString(stroke.color.r, stroke.color.g, stroke.color.b, stroke.color.a);
}

function updateWidth(){
  stroke.width = Number(elements.swidth.value);
}

function updateLag(){
  stroke.lag = Number(elements.lag.value);
}

function updateAngles(){
  stroke.angles = Number(elements.angles.value);
}

function setLag(n){
  elements.lag.value = n;
  elements.lagdisplay.value = n;
  updateLag();
}

function setAngles(n){
  elements.angles.value = n;
  elements.anglesdisplay.value = n;
  updateAngles();
}
