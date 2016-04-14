window.addEventListener("load", function(){
  var cms = document.getElementsByClassName("cleanMath");
  for(var i = 0; i < cms.length; i++){
    cms[i].innerHTML = String(cms[i].innerHTML).replace(/>\s*</g, "><");
  }
  var symbols = document.getElementsByClassName("symbol");
  var ref = {
    "-": "&minus;",
    "x": "&times;",
    "*": "&times;",
    "/": "&divide",
    "+-": "&plusmn;",
    "/=": "&ne;"
  };
  for(var i = 0; i < symbols.length; i++){
    var s = symbols[i];
    if(ref[s.innerHTML]) s.innerHTML = ref[s.innerHTML];
  }
  document.getElementById("textarea").addEventListener("input", function(){
    cleanMath(this.value);
  }, false);
}, false);

function cleanMath(string){
  string = string.replace(/\ */g, "");
  var output = string;
  var symbolRef = {
    "-": "&minus;",
    "*": "&times;",
    "/": "&divide",
    "+-": "&plusmn;",
    "/=": "&ne;",
    "+": "&plus;",
    "=": "&equals;",
    "<": "&lt;",
    ">": "&gt;"
  };

  function type(s){
    if(symbolRef[s]) return "symbol";
    else if(Number(s) == s) return "number";
    else return "variable";
  }

  function getExpressionPoint(index, dir){
    var i = index;
    while(i >= 0 && i < output.length){
      if(type(output.charAt(i)) == "symbol" && i != index) break;
      else i += dir;
    }
    return (i);
  }

  while(output.match(/\([^\(\)]*\)/g)){
    var matches = output.match(/\([^\(\)]*\)/g);
    var first = matches[0];
    var firstr = first.replace(/[\(\)]*/g, "");
    output = output.replace(first, String.fromCharCode(0) + firstr + String.fromCharCode(1));
  }

  var toReplace = {};

  for(var i = 0; i < output.length; i++){
    var char = output.charAt(i);
    if(char == "/"){
      var s = getExpressionPoint(i, -1) + 1;
      var e = getExpressionPoint(i, 1);
      var frac = String.fromCharCode(2) + output.substring(s, i) + String.fromCharCode(3) + output.substring(i + 1, e) + String.fromCharCode(4);
      //console.log(frac);
      //toReplace[output.substring(s, e)] = frac;
      output = output.replace(output.substring(s, e), frac);
      i = 0;
    }
  }

  for(var r in toReplace){
    console.log(r);
    output = output.replace(r, toReplace[r]);
  }

  var html = "";

  for(var i = 0; i < output.length; i++){
    var char = output.charAt(i);
    if(char.charCodeAt(0) == 0){
      html += "<div class='grouping'>";
    } else if(char.charCodeAt(0) == 1){
      html += "</div>";
    } else if(char.charCodeAt(0) == 2){
      html += "<div class='fraction'><div class='numerator'>";
    } else if(char.charCodeAt(0) == 3){
      html += "</div><div class='denominator'>";
    } else if(char.charCodeAt(0) == 4){
      html += "</div></div>";
    } else if(type(char) == "number"){
      html += "<span class='number'>" + char + "</span>";
    } else if(type(char) == "symbol"){
      html += "<span class='symbol'>" + symbolRef[char] + "</span>";
    } else if(type(char) == "variable"){
      html += "<span class='variable'>" + char + "</span>";
    }
  }

  console.log("OUTPUT");
  console.log(string);
  console.log(output);
  console.log(html);
  document.getElementById("test").innerHTML = html;
}
