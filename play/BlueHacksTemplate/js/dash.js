var side, sched, data, lookupValues = [], selected = [], days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], daysHTML = {};

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

  selected.push(Number(user.facebook.id));

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
    sched.style.height = "100%";
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
  }, false);

  document.getElementById("summarybutt").addEventListener("click", function(){
    summary = true;
    document.getElementById("summarybutt").className = "selected";
    document.getElementById("detailedbutt").className = "";
  }, false);

  displaySelection();
}

function addSelection(a){
  if(selected.indexOf(Number(a)) == -1){
    selected.push(Number(a));
  }

  displaySelection();
}

function displaySelection(){
  if(data){
    var html = "";
    for(var i in selected){
      html += "<a href='javascript: removeSelection(" + selected[i] + ")'>" + data.accounts[selected[i]].name + "</a>";
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
            html += (mil2min(sched[i][c].start - earliestTime)/(latestTime - earliestTime));
            html += "%; height: ";
            //html += (mil2min(sched[i][c].end - mil2min(sched[i][c].start))/(latestTime - earliestTime));
            html += "50%;'> " + c + "</div>";
          }

          daysHTML[i] += html;
        }
      }
    }

    for(var i in days){
      document.getElementById(days[i]).innerHTML = daysHTML[days[i]];
    }
  }
}

function removeSelection(a){
  selected.splice(selected.indexOf(a), 1);
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
