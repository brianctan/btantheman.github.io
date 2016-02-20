/*
Sources:

http://www.kirupa.com/html5/setting_css_styles_using_javascript.htm
*/

var visibleList, choicesList, schedulesHTML, mondayHTML, tuesdayHTML, wednesdayHTML, thursdayHTML, fridayHTML, saturdayHTML;
var earliestTime, latestTime;
var visibleIndices = [];
var daysHTML, dayTimes = [[], [], [], [], [], []];

var colors = ["#F44336", "#2196F3", "#FF5722", "#556270", "#009688", "#795548", "#607D8B", "#E91E63", "#9C27B0"];
var currentColors = [];

function availableColor(){
  var colorIndex = Math.floor(Math.random() * colors.length);
  if(currentColors.length < colors.length){
    while(currentColors.indexOf(colors[colorIndex]) != -1){
      colorIndex = (colorIndex + 1) % colors.length;
    }
  }
  return colors[colorIndex];
}

var peopleJSON = [
  '{   "nickname": "Mike",   "lastname": "del Castillo",   "school": "Ateneo de Manila University",   "schoolCode": "ADMU",   "schedule": [     [       {"name": "EN 12", "location": "B-209",         "start": "1000", "end": "1100"},       {"name": "LIT 14", "location": "B-209",         "start": "1100", "end": "1200"},       {"name": "BI 5", "location": "SEC-A117A",         "start": "1300", "end": "1400"},       {"name": "InTACT", "location": "TBA",         "start": "1500", "end": "1600"},       {"name": "MA 20.2", "location": "SEC-A123A",         "start": "1600", "end": "1700"}     ],     [       {"name": "MA 20.2", "location": "K-304",         "start": "0800", "end": "0930"},       {"name": "PE 110", "location": "COV COURTS",         "start": "1030", "end": "1200"},       {"name": "CS 21B", "location": "F-204",         "start": "1400", "end": "1600"}     ],     [       {"name": "EN 12", "location": "B-209",         "start": "1000", "end": "1100"},       {"name": "LIT 14", "location": "B-209",         "start": "1100", "end": "1200"},       {"name": "BI 5", "location": "SEC-A117A",         "start": "1300", "end": "1400"},       {"name": "MA 20.2", "location": "SEC-A123A",         "start": "1600", "end": "1700"}     ],     [       {"name": "MA 20.2", "location": "K-304",         "start": "0800", "end": "0930"},       {"name": "PE 110", "location": "COV COURTS",         "start": "1030", "end": "1200"},       {"name": "CS 21B", "location": "F-204",         "start": "1400", "end": "1600"}     ],     [       {"name": "EN 12", "location": "B-209",         "start": "1000", "end": "1100"},       {"name": "LIT 14", "location": "B-209",         "start": "1100", "end": "1200"},       {"name": "BI 5", "location": "SEC-A117A",         "start": "1300", "end": "1400"},       {"name": "BI 6", "location": "SEC-B106A",         "start": "1400", "end": "1600"},       {"name": "MA 20.2", "location": "SEC-A123A",         "start": "1600", "end": "1700"}     ]   ] }',

  '{   "nickname": "Jaia",   "lastname": "Corral",   "school": "Ateneo de Manila University",   "schoolCode": "ADMU",   "schedule": [     [       {"name": "PE WUSHU", "location": "COV COURTS",         "start": "0730", "end": "0830"},       {"name": "EN 12", "location": "B-207",         "start": "1000", "end": "1100"},       {"name": "LIT 14", "location": "B-207",         "start": "1100", "end": "1200"},       {"name": "CHEM", "location": "C-109",         "start": "1300", "end": "1400"},       {"name": "InTACT", "location": "TBA",         "start": "1500", "end": "1600"}     ],     [       {"name": "MA 18B", "location": "CTC 404",         "start": "1100", "end": "1230"},       {"name": "CS 21B", "location": "F-204",         "start": "1400", "end": "1600"},       {"name": "PSY 101", "location": "SOM 302",         "start": "1700", "end": "1830"}     ],     [       {"name": "PE WUSHU", "location": "COV COURTS",         "start": "0730", "end": "0830"},       {"name": "EN 12", "location": "B-207",         "start": "1000", "end": "1100"},       {"name": "LIT 14", "location": "B-207",         "start": "1100", "end": "1200"},       {"name": "CHEM", "location": "C-109",         "start": "1300", "end": "1400"}     ],     [       {"name": "MA 18B", "location": "CTC 404",         "start": "1100", "end": "1230"},       {"name": "CS 21B", "location": "F-204",         "start": "1400", "end": "1600"},       {"name": "PSY 101", "location": "SOM 302",         "start": "1700", "end": "1830"}     ],     [       {"name": "PE WUSHU", "location": "COV COURTS",         "start": "0730", "end": "0830"},       {"name": "EN 12", "location": "B-207",         "start": "1000", "end": "1100"},       {"name": "LIT 14", "location": "B-207",         "start": "1100", "end": "1200"},       {"name": "CHEM", "location": "C-109",         "start": "1300", "end": "1400"},       {"name": "CHEM LAB", "location": "SEC-C207A",         "start": "1400", "end": "1600"}     ]   ] }',

  '{   "nickname": "Emman",   "lastname": "Ignacio",   "school": "Ateneo de Manila University",   "schoolCode": "ADMU",   "schedule": [     [       {"name": "InTACT", "location": "SOM 106",         "start": "0800", "end": "0900"},       {"name": "PE 112", "location": "COV COURTS",         "start": "0930", "end": "1030"},       {"name": "MA 19", "location": "SOM 103",         "start": "1100", "end": "1200"},       {"name": "FIL 12", "location": "SOM 203",         "start": "1200", "end": "1300"},       {"name": "EN 12", "location": "CTC 302",         "start": "1400", "end": "1500"},       {"name": "LIT 14", "location": "CTC 302",         "start": "1500", "end": "1600"}     ],     [       {"name": "ES 12", "location": "SEC-C307A",         "start": "1000", "end": "1200"},       {"name": "ES 10", "location": "SEC-A124A",         "start": "1230", "end": "1400"},       {"name": "MA 19", "location": "SEC-A203A",         "start": "1400", "end": "1530"}     ],     [       {"name": "PE 112", "location": "COV COURTS",         "start": "0930", "end": "1030"},       {"name": "MA 19", "location": "SOM 103",         "start": "1100", "end": "1200"},       {"name": "FIL 12", "location": "SOM 203",         "start": "1200", "end": "1300"},       {"name": "EN 12", "location": "CTC 302",         "start": "1400", "end": "1500"},       {"name": "LIT 14", "location": "CTC 302",         "start": "1500", "end": "1600"}     ],     [       {"name": "ES 10", "location": "SEC-A124A",         "start": "1230", "end": "1400"},       {"name": "MA 19", "location": "SEC-A203A",         "start": "1400", "end": "1530"}     ],     [       {"name": "PE 112", "location": "COV COURTS",         "start": "0930", "end": "1030"},       {"name": "MA 19", "location": "SOM 103",         "start": "1100", "end": "1200"},       {"name": "FIL 12", "location": "SOM 203",         "start": "1200", "end": "1300"},       {"name": "EN 12", "location": "CTC 302",         "start": "1400", "end": "1500"},       {"name": "LIT 14", "location": "CTC 302",         "start": "1500", "end": "1600"}     ]   ] }',

  '{"nickname":"Dana","lastname":"Argosino","school":"University of Santo Tomas","schoolCode":"UST","schedule":[[{"name":"LOGIC","location":"321","start":"0700","end":"0800"},{"name":"FIL102","location":"321","start":"0800","end":"0900"},{"name":"ENG2","location":"321","start":"0900","end":"1000"},{"name":"TRIGO","location":"321","start":"1000","end":"1100"},{"name":"BIOPSYCH","location":"PSY204","start":"1100","end":"1200"}],[{"name":"PHIST","location":"321","start":"0700","end":"0830"},{"name":"THEORIES OF LEARNING","location":"(PSY203) 321","start":"0830","end":"1000"},{"name":"THY2","location":"321","start":"1130","end":"1300"},{"name":"HUMAN DEVELOPMENT","location":"(PSY202) 321","start":"1300","end":"1430"}],[{"name":"LOGIC","location":"321","start":"0700","end":"0800"},{"name":"FIL102","location":"321","start":"0800","end":"0900"},{"name":"ENG2","location":"321","start":"0900","end":"1000"},{"name":"TRIGO","location":"321","start":"1000","end":"1100"},{"name":"BIOPSYCH","location":"PSY204","start":"1100","end":"1200"},{"name":"PE","location":"","start":"1300","end":"1500"}],[{"name":"PHIST","location":"321","start":"0700","end":"0830"},{"name":"THEORIES OF LEARNING","location":"(PSY203) 321","start":"0830","end":"1000"},{"name":"THY2","location":"321","start":"1130","end":"1300"},{"name":"HUMAN DEVELOPMENT","location":"(PSY202) 321","start":"1300","end":"1430"}],[{"name":"LOGIC","location":"321","start":"0700","end":"0800"},{"name":"FIL102","location":"321","start":"0800","end":"0900"},{"name":"ENG2","location":"321","start":"0900","end":"1000"},{"name":"TRIGO","location":"321","start":"1000","end":"1100"},{"name":"BIOPSYCH","location":"PSY204","start":"1100","end":"1200"}],[]]}',

  '{"nickname":"Pia","lastname":"Lapid","school":"University of Asia and the Pacific","schoolCode":"UA&P","schedule":[[{"name":"FIL102","location":"ACB203","start":"0730","end":"0900"},{"name":"PE (ARNIS)","location":"","start":"0900","end":"1030"},{"name":"ENG101","location":"ACB508","start":"1030","end":"1200"}],[{"name":"TH101","location":"CAS104","start":"1030","end":"1200"},{"name":"PHYSICS","location":"CAS104","start":"1320","end":"1500"},{"name":"MATH1","location":"ACB403","start":"1800","end":"1930"}],[{"name":"NSTP","location":"ACB203","start":"1200","end":"1630"}],[{"name":"FIL102","location":"ACB203","start":"0730","end":"0900"},{"name":"PE (ARNIS)","location":"","start":"0900","end":"1030"},{"name":"ENG101","location":"ACB508","start":"1030","end":"1200"},{"name":"HCD101","location":"ACB507","start":"1330","end":"1630"}],[{"name":"TH101","location":"CAS104","start":"1030","end":"1200"},{"name":"PHYSICS","location":"CAS104","start":"1320","end":"1500"},{"name":"MATH1","location":"ACB403","start":"1800","end":"1930"}],[]]}',

  '{"nickname":"Vince","lastname":"Tumala","school":"","schoolCode":"","schedule":[[{"name":"ENG 102","location":"HSC-LEC102","start":730,"end":900},{"name":"PHILO 101","location":"HSC0LEC102","start":900,"end":1030},{"name":"FIL 102","location":"HSC-LEC102","start":1030,"end":1200}],[{"name":"CHEM 105","location":"335","start":830,"end":1030},{"name":"MATH 102","location":"HSC-LEC102","start":1200,"end":1330},{"name":"LIT 101","location":"HSC-LEC102","start":1330,"end":1500}],[{"name":"ZOOL 100","location":"HSC CONTROLLAB","start":830,"end":1030},{"name":"CH 102","location":"HSC-LEC102","start":1030,"end":1200}],[{"name":"ENG 102","location":"HSC-LEC102","start":730,"end":900},{"name":"PHILO 101","location":"HSC0LEC102","start":900,"end":1030},{"name":"FIL 102","location":"HSC-LEC102","start":1030,"end":1200}],[{"name":"MATH 102","location":"HSC-LEC102","start":1200,"end":1330},{"name":"LIT 101","location":"HSC-LEC102","start":1330,"end":1500},{"name":"CHEM LAB 105","location":"335","start":730,"end":1030}],[{"name":"CH 102","location":"HSC-LEC102","start":1030,"end":1200},{"name":"ZOOL LAB 100","location":"HSC CONTROLLAB","start":730,"end":1030}]]}',

  '{"nickname":"Jo","lastname":"Torres","school":"Ateneo de Manila University","schoolCode":"ADMU","schedule":[[{"name":"PE 101","location":"","start":830,"end":930},{"name":"EN 11","location":"B-207","start":1000,"end":1100},{"name":"LIT 13","location":"B-207","start":1100,"end":1200},{"name":"BI 5","location":"SEC-A117A","start":1300,"end":1400},{"name":"TRAINING","location":"","start":1630,"end":1900}],[{"name":"MA 18B","location":"","start":1100,"end":1230},{"name":"CS 21B","location":"F-204","start":1400,"end":1600},{"name":"PSY 101","location":"","start":1700,"end":1830}],[{"name":"PE 101","location":"","start":830,"end":930},{"name":"EN 11","location":"B-207","start":1000,"end":1100},{"name":"LIT 13","location":"B-207","start":1100,"end":1200},{"name":"BI 5","location":"SEC-A117A","start":1300,"end":1400},{"name":"TRAINING","location":"","start":1630,"end":1900}],[{"name":"MA 18B","location":"","start":1100,"end":1230},{"name":"CS 21B","location":"F-204","start":1400,"end":1600},{"name":"PSY 101","location":"","start":1700,"end":1830}],[{"name":"PE 101","location":"","start":830,"end":930},{"name":"EN 11","location":"B-207","start":1000,"end":1100},{"name":"LIT 13","location":"B-207","start":1100,"end":1200},{"name":"BI 5","location":"SEC-A117A","start":1300,"end":1400},{"name":"BI 6","location":"SEC-B106A","start":1400,"end":1600}],[]]}'
];

var people = [];

function windowLoad(){
  visibleList = document.getElementById("visible");
  choicesList = document.getElementById("choices");
  schedulesHTML = document.getElementById("schedules");

  mondayHTML = document.getElementById("monday");
  tuesdayHTML = document.getElementById("tuesday");
  wednesdayHTML = document.getElementById("wednesday");
  thursdayHTML = document.getElementById("thursday");
  fridayHTML = document.getElementById("friday");
  saturdayHTML = document.getElementById("saturday");

  daysHTML = [mondayHTML, tuesdayHTML, wednesdayHTML, thursdayHTML, fridayHTML, saturdayHTML];

  for(var i = 0; i < peopleJSON.length; i++){
    people[i] = JSON.parse(peopleJSON[i]);
  }

  people.sort(function(a, b){
    return a.nickname > b.nickname ? 1 : -1;
  });

  update();
}

window.addEventListener("load", windowLoad, false);


function update(){
  var visibleTemp = "", choicesTemp = "";

  for(var i = 0; i < visibleIndices.length; i++){
    visibleTemp += "<div class=\"person\" style=\"background-color: " + currentColors[i] + "\" onmousedown=\"hidePerson(" + visibleIndices[i] + ");\" >" + people[visibleIndices[i]].nickname + " " + people[visibleIndices[i]].lastname + "</div>";
  }

  for(var i = 0; i < people.length; i++){
    if(visibleIndices.indexOf(i) == -1){
      choicesTemp += "<div class=\"person\" onmousedown=\"showPerson(" + i + ");\">" + people[i].nickname + " " + people[i].lastname + "</div>";
    } else continue;
  }

  visibleList.innerHTML = visibleTemp;
  choicesList.innerHTML = choicesTemp;

  //getting bounds

  earliestTime = mil2min(2400);
  latestTime = 0;
  dayTimes = [[], [], [], [], [], []];

  for(var i = 0; i < visibleIndices.length; i++){
    var p = people[visibleIndices[i]];
    for(var j = 0; j < p.schedule.length; j++){
      for(var k = 0; k < p.schedule[j].length; k++){
        var a = people[visibleIndices[i]].schedule[j][k];

        if(dayTimes[j].indexOf(a.start) == -1) dayTimes[j].push(a.start);
        if(dayTimes[j].indexOf(a.end) == -1) dayTimes[j].push(a.end);

        if(mil2min(a.start) <= earliestTime) earliestTime = mil2min(a.start);
        if(mil2min(a.end) >= latestTime) latestTime = mil2min(a.end);
      }
    }
  }

  //earliestTime = min2mil(mil2min(earliestTime) - 30);
  latestTime = min2mil(mil2min(latestTime) + 20);

  console.log(earliestTime, latestTime);
  totalTime = latestTime - earliestTime;

  //clear days

  for(var i = 0; i < daysHTML.length; i++){
    daysHTML[i].innerHTML = "";
  }

  for(var i = 0; i < dayTimes.length; i++){
    for(var j = 0; j < dayTimes[i].length; j++){
      daysHTML[i].innerHTML += "<div class=\"timestamp" + (mil2min(dayTimes[i][j])%60 == 0 ? "" : mil2min(dayTimes[i][j])%60 == 30 ? " half" : " odd") + "\" style=\"top: " + (100 * (mil2min(dayTimes[i][j]) - earliestTime)/totalTime) + "%\">" + mil2stan(dayTimes[i][j]) + "</div>";
    }
  }

  //end of getting bounds

  var schedulesTemp = "";

  for(var i = 0; i < visibleIndices.length; i++){
    var p = people[visibleIndices[i]];
    var vlength = visibleIndices.length;
    var pwidth = 100/vlength;
    var pleft = pwidth * i;

    for(var j = 0; j < p.schedule.length; j++){
      for(var k = 0; k < p.schedule[j].length; k++){
        var a = p.schedule[j][k];
        var aHTML = "<div class=\"agendum\" style=\"";
        aHTML += "top:" + (100 * (mil2min(a.start) - earliestTime)/totalTime) + "%;";
        aHTML += "left:" + pleft + "%;";
        aHTML += "width:" + pwidth + "%;";
        aHTML += "background-color:" + currentColors[i] + ";";
        aHTML += "height:" + (100 * (mil2min(a.end) - mil2min(a.start))/totalTime) + "%;";
        aHTML += "\"><h1>" + a.name + "</h1><h2>" + a.location + "</h2></div>";
        daysHTML[j].innerHTML += aHTML;
      }
    }
  }

  document.getElementById("calendar").style.minWidth = (visibleIndices.length * 250) + "px";

  /*
  if(visibleIndices.length == 0){
    schedulesHTML.style.display = "none";
  } else{
    schedulesHTML.style.display = "block";
  }*/
}

function hidePerson(i){
  currentColors.splice(visibleIndices.indexOf(i), 1);
  visibleIndices.splice(visibleIndices.indexOf(i), 1);
  update();
}

function showPerson(i){
  currentColors.push(availableColor());
  visibleIndices.push(i);
  update();
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

//
