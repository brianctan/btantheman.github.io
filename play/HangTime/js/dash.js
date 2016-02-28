var side, sched, data, lookupValues = [], selected = [], days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], daysHTML = {};
var colors = [];
var templateColors = ["#40a4d8", "#33beb7", "#acc523", "#ffcb33", "#f8a227", "#db3937", "#ee6579", "#a364d9"];
var summary = true;

var earliestTime = mil2min(2400), latestTime = 0;

window.addEventListener("load", function(){
  side = document.getElementById("dashside");
  sched = document.getElementById("dashscheds");

  windowResize();
  window.addEventListener("resize", windowResize, false);

  $('#friendfield').autocomplete({
    lookup: lookupValues,
    onSelect: function (suggestion) {
      alert(suggestion.data)
    }
  });

  addSelection(String(user.facebook.id));

  displaySelection();

  fire.on("value", valueHandler);
}, false);


function windowResize(){
  if(window.innerWidth < 1000){
    side.style.position = sched.style.position = "relative";
    side.style.top = sched.style.top = "0px";
    side.style.left = sched.style.left = "0px";
    side.style.width = sched.style.width = "100vw";
    sched.style.height = (600) + "px";
  } else {
    width = 325;
    side.style.position = sched.style.position = "absolute";
    side.style.top = sched.style.top = "65px";
    side.style.width = sched.style.left = width + "px";;
    sched.style.width = (window.innerWidth - width) + "px";
    side.style.height = sched.style.height = "calc(100% - 65px)";
  }
}

function valueHandler(s){
  data = s.val();

  lookupValues = [];

  for(var key in data.accounts[user.facebook.id].friends){
    lookupValues.push({
      value: data.accounts[key].name,
      data: key
    });
  }

  $('#friendfield').autocomplete({
    autoFocus: true,
    lookup: lookupValues,
    onSelect: function (suggestion) {
      document.getElementById('friendfield').value = "";
      addSelection(suggestion.data);
    }
  });

  document.getElementById("detailedbutt").addEventListener("click", function(){
    summary = false;
    document.getElementById("detailedbutt").className = "selected";
    document.getElementById("summarybutt").className = "";
    displaySelection();
  }, false);

  document.getElementById("summarybutt").addEventListener("click", function(){
    summary = true;
    document.getElementById("summarybutt").className = "selected";
    document.getElementById("detailedbutt").className = "";
    displaySelection();
  }, false);

  displaySelection();
}

function addSelection(a){
  if(selected.indexOf(String(a)) == -1){
    selected.push(String(a));
    colors.push(getRandomColor());
  }

  displaySelection();
}

function getRandomColor(){
  var n;
  do{
    n = templateColors[Math.floor(Math.random() * templateColors.length)];
  } while(colors.indexOf(n) != -1);
  return n;
}

function displaySelection(){
  if(data){
    var html = "";
    for(var i in selected){
      if(!summary) sstyle = "style=\"background-color: " + colors[i] + "\"";
      else sstyle = "";
      html += "<a href='javascript: removeSelection(\"" + String(selected[i]) + "\")' " + sstyle + "><img src=\"http://graph.facebook.com/" + selected[i] + "/picture\" /><span>" + data.accounts[selected[i]].name + "</span></a>";
    }
    if(html == "") html = "<i>This is where selected people appear.</i>";
    document.getElementById("dashselected").innerHTML = html;

    for(var i in days){
      document.getElementById(days[i]).innerHTML = "";
    }

    earliestTime = mil2min(2400);
    latestTime = 0;

    for(var j in selected){
      var sched = data.accounts[selected[j]].sched;
      for(var i in sched){
        for(var c in sched[i]){
          if(sched[i][c].start != null) earliestTime = Math.min(mil2min(sched[i][c].start), earliestTime);
          if(sched[i][c].end != null) latestTime = Math.max(mil2min(sched[i][c].end), latestTime);
        }
      }
    }

    for(var i in days){
      daysHTML[days[i]] = "";
    }

    for(var j in selected){
      var sched = data.accounts[selected[j]].sched;
      for(var i in sched){
        for(var c in sched[i]){
          var html = "";

          if(summary){
            html += "<div class='summarynode' style='top: ";
            html += Number(((mil2min(sched[i][c].start) - earliestTime)/(latestTime - earliestTime)) * 100).toFixed(2);
            html += "%; height: ";
            html += Number(((mil2min(sched[i][c].end) - mil2min(sched[i][c].start))/(latestTime - earliestTime)) * 100).toFixed(2);
            html += "50%; opacity:";
            html += Math.min(0.9, Math.pow(1/selected.length, 1/(2)));
            html += "'></div>";
          } else{
            html += "<div class='detailednode' style='top: ";
            html += Number(((mil2min(sched[i][c].start) - earliestTime)/(latestTime - earliestTime)) * 100).toFixed(2);
            html += "%; height: ";
            html += Number(((mil2min(sched[i][c].end) - mil2min(sched[i][c].start))/(latestTime - earliestTime)) * 100).toFixed(2);
            html += "50%; background-color:";
            html += colors[j];
            html += "; width: "
            html += Number(100/selected.length).toFixed(2);
            html += "%; left: ";
            html += Number(j * 100/selected.length).toFixed(2);
            html += "%;'><b>" + c.replace("_", ".") + "</b><i>" + sched[i][c].location + "</i></div>";
          }


          daysHTML[i] += html;
        }
      }
    }

    if(summary){
      document.getElementById("dashscrollwide").style.minWidth = "120%";
      document.getElementById("legend").innerHTML = "<img src='img/redgradient.png' /><div style='float: left'>Not Free</div><div style='float: right'>Free</div>";
    } else{
      document.getElementById("dashscrollwide").style.minWidth = selected.length * 6 * 50 + "px";
      document.getElementById("dashscrollwide").style.width = "120%";
      document.getElementById("legend").innerHTML = "The colors correspond to a single person!";
    }

    for(var i in days){
      document.getElementById(days[i]).innerHTML = daysHTML[days[i]];
    }

    html = "";

    interval = (latestTime - earliestTime) > 540 ? 60 : 30;

    for(var i = Math.ceil(earliestTime/interval) * interval; i <= latestTime; i += interval){
      html += "<div class='timelockperiod' style='top: ";
      html += Number((i - earliestTime)/(latestTime - earliestTime) * 100).toFixed(2);
      html += "%;'>";
      html += mil2stan(min2mil(i));
      html += "</div>";
    }

    document.getElementById("timelock").innerHTML = html;
  }
}

function removeSelection(a){
  i = selected.indexOf(String(a));
  colors.splice(i, 1);
  selected.splice(i, 1);
  displaySelection();
}

function mil2min(x){
  x = Number(x);
  var h = Math.floor(x/100);
  var m = x - h * 100;
  return h * 60 + m;
}

function min2mil(x){
  x = Number(x);
  var h = Math.floor(x/60);
  var m = x%60;
  return h * 100 + m;
}

function mil2stan(x){
  x = Number(x);
  var h = Math.floor(x/100);
  var m = x - h * 100;
  return (h > 12 ? h - 12 : h) + ":" + (m < 10 ? "0" + m : m) + " " + (h >= 12 ? "PM" : "AM");
}
