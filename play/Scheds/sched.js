var visibleList, choicesList, schedulesHTML, mondayHTML, tuesdayHTML, wednesdayHTML, thursdayHTML, fridayHTML, saturdayHTML;
var nicknameHTML, lastnameHTML, schoolHTML, schoolCodeHTML, nameHTML, locationHTML, starthHTML, startmHTML, startapHTML, endhHTML, endmHTML, endapHTML, monHTML, tueHTML, wedHTML, thuHTML, friHTML, satHTML, addHTML, jsonHTML;

var timestampsHTML, earliestTime, latestTime;
var visibleIndices = [];
var daysHTML, dayTimes = [[], [], [], [], [], []];

var color = "#F44336";

var personJSON = '{   "nickname": "Mike",   "lastname": "del Castillo",   "school": "Ateneo de Manila University",   "schoolCode": "ADMU",   "schedule": [     [       {"name": "EN 12", "location": "B-209",         "start": "1000", "end": "1100"},       {"name": "LIT 14", "location": "B-209",         "start": "1100", "end": "1200"},       {"name": "BI 5", "location": "SEC-A117A",         "start": "1300", "end": "1400"},       {"name": "InTACT", "location": "TBA",         "start": "1500", "end": "1600"},       {"name": "MA 20.2", "location": "SEC-A123A",         "start": "1600", "end": "1700"}     ],     [       {"name": "MA 20.2", "location": "K-304",         "start": "0800", "end": "0930"},       {"name": "PE 110", "location": "COV COURTS",         "start": "1030", "end": "1200"},       {"name": "CS 21B", "location": "F-204",         "start": "1400", "end": "1600"}     ],     [       {"name": "EN 12", "location": "B-209",         "start": "1000", "end": "1100"},       {"name": "LIT 14", "location": "B-209",         "start": "1100", "end": "1200"},       {"name": "BI 5", "location": "SEC-A117A",         "start": "1300", "end": "1400"},       {"name": "MA 20.2", "location": "SEC-A123A",         "start": "1600", "end": "1700"}     ],     [       {"name": "MA 20.2", "location": "K-304",         "start": "0800", "end": "0930"},       {"name": "PE 110", "location": "COV COURTS",         "start": "1030", "end": "1200"},       {"name": "CS 21B", "location": "F-204",         "start": "1400", "end": "1600"}     ],     [       {"name": "EN 12", "location": "B-209",         "start": "1000", "end": "1100"},       {"name": "LIT 14", "location": "B-209",         "start": "1100", "end": "1200"},       {"name": "BI 5", "location": "SEC-A117A",         "start": "1300", "end": "1400"},       {"name": "BI 6", "location": "SEC-B106A",         "start": "1400", "end": "1600"},       {"name": "MA 20.2", "location": "SEC-A123A",         "start": "1600", "end": "1700"}     ]   ] }';

var person = JSON.parse(personJSON);

function windowLoad(){
  schedulesHTML = document.getElementById("schedules");

  mondayHTML = document.getElementById("monday");
  tuesdayHTML = document.getElementById("tuesday");
  wednesdayHTML = document.getElementById("wednesday");
  thursdayHTML = document.getElementById("thursday");
  fridayHTML = document.getElementById("friday");
  saturdayHTML = document.getElementById("saturday");

  daysHTML = [mondayHTML, tuesdayHTML, wednesdayHTML, thursdayHTML, fridayHTML, saturdayHTML];

  nicknameHTML = document.getElementById("nickname");
  lastnameHTML = document.getElementById("lastname");
  schoolHTML = document.getElementById("school");
  schoolCodeHTML = document.getElementById("schoolCode");
  locationHTML = document.getElementById("location");
  nameHTML = document.getElementById("name");
  starthHTML = document.getElementById("starth");
  startmHTML = document.getElementById("startm");
  startapHTML = document.getElementById("startap");
  endhHTML = document.getElementById("endh");
  endmHTML = document.getElementById("endm");
  endapHTML = document.getElementById("endap");
  monHTML = document.getElementById("mon");
  tueHTML = document.getElementById("tue");
  wedHTML = document.getElementById("wed");
  thuHTML = document.getElementById("thu");
  friHTML = document.getElementById("fri");
  satHTML = document.getElementById("sat");
  dayCheckboxesHTML = [monHTML, tueHTML, wedHTML, thuHTML, friHTML, satHTML];
  jsonHTML = document.getElementById("json");

  addHTML = document.getElementById("add");
  addHTML.addEventListener("mousedown", addToSched, false);
  document.getElementById("clearSched").addEventListener("mousedown", clearSched, false);
  document.getElementById("clearForm").addEventListener("mousedown", clearForm, false);
  document.getElementById("useJSON").addEventListener("mousedown", useJSON, false);

  update();

  jsonHTML.value = JSON.stringify(person);
  nicknameHTML.value = person.nickname ;
  lastnameHTML.value = person.lastname;
  schoolHTML.value = person.school;
  schoolCodeHTML.value = person.schoolCode;
}

window.addEventListener("load", windowLoad, false);

function update(){
  //getting bounds

  earliestTime = mil2min(2400);
  latestTime = 0;
  dayTimes = [[], [], [], [], [], []];


  for(var j = 0; j < person.schedule.length; j++){
    for(var k = 0; k < person.schedule[j].length; k++){
      var a = person.schedule[j][k];

      if(dayTimes[j].indexOf(a.start) == -1) dayTimes[j].push(a.start);
      if(dayTimes[j].indexOf(a.end) == -1) dayTimes[j].push(a.end);

      if(mil2min(a.start) <= earliestTime) earliestTime = mil2min(a.start);
      if(mil2min(a.end) >= latestTime) latestTime = mil2min(a.end);
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

  var p = person;
  var pwidth = 100;
  var pleft = 0;

  for(var j = 0; j < person.schedule.length; j++){
    for(var k = 0; k < person.schedule[j].length; k++){
      var a = person.schedule[j][k];
      var aHTML = "<div class=\"agendum\" style=\"";
      aHTML += "top:" + (100 * (mil2min(a.start) - earliestTime)/totalTime) + "%;";
      aHTML += "left:" + pleft + "%;";
      aHTML += "width:" + pwidth + "%;";
      aHTML += "background-color: " + color + ";";
      aHTML += "height:" + (100 * (mil2min(a.end) - mil2min(a.start))/totalTime) + "%;";
      aHTML += "\"><h1>" + a.name + "</h1><h2>" + a.location + "</h2>";
      aHTML += "<button onmousedown=\"editSched(" + j + ", " + k + ")\">Edit</button>";
      aHTML += "<button onmousedown=\"delSched(" + j + ", " + k + ")\">Delete</button>";
      aHTML += "</div>";
      daysHTML[j].innerHTML += aHTML;
    }
  }

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

function delSched(a, b){
  person.schedule[a].splice(b, 1);
  update();
}

function editSched(a, b){
  nicknameHTML.value = person.nickname;
  lastnameHTML.value = person.lastname;
  schoolHTML.value = person.school;
  schoolCodeHTML.value = person.schoolCode;

  nameHTML.value = person.schedule[a][b].name;
  locationHTML.value = person.schedule[a][b].location;

  starthHTML.value = Math.floor(person.schedule[a][b].start/100) > 12 ? Math.floor(person.schedule[a][b].start/100) - 12 : Math.floor(person.schedule[a][b].start/100);
  startmHTML.value = person.schedule[a][b].start - Math.floor(person.schedule[a][b].start/100) * 100;
  startapHTML.value = Number(person.schedule[a][b].start) >= 1200 ? "12" : "0";

  endhHTML.value = Math.floor(person.schedule[a][b].end/100) > 12 ? Math.floor(person.schedule[a][b].end/100) - 12 : Math.floor(person.schedule[a][b].end/100);
  endmHTML.value = person.schedule[a][b].end - Math.floor(person.schedule[a][b].end/100) * 100;
  endapHTML.value = Number(person.schedule[a][b].end) >= 1200 ? "12" : "0";

  for(var i = 0; i < daysHTML.length; i++){
    dayCheckboxesHTML[i].checked = i == a;
  }

  delSched(a, b);
}

function addToSched(){
  person.nickname = nicknameHTML.value;
  person.lastname = lastnameHTML.value;
  person.school = schoolHTML.value;
  person.schoolCode = schoolCodeHTML.value;

  if(person.schedule == null) person.schedule = [
    [], [], [], [], [], []
  ]

  var a = ({
    name: nameHTML.value,
    location: locationHTML.value,
    start: (Number(starthHTML.value)%12) * 100 + Number(startapHTML.value) * 100 + Number(startmHTML.value),
    end: (Number(endhHTML.value)%12) * 100 + Number(endapHTML.value) * 100 + Number(endmHTML.value)
  });

  var checkboxes = [monHTML, tueHTML, wedHTML, thuHTML, friHTML, satHTML];

  for(var i = 0; i < dayCheckboxesHTML.length; i++){
    if(dayCheckboxesHTML[i].checked) person.schedule[i].push(a);
  }

  update();

  jsonHTML.value = JSON.stringify(person);
  clearForm();
}

function clearSched(){
  person.schedule = [[], [], [], [] ,[] ,[]];
  jsonHTML.value = JSON.stringify(person);
  update();
}

function clearForm(){
  nameHTML.value = "";
  locationHTML.value = "";
  starthHTML.value = 8;
  startmHTML.value = 0;
  startapHTML.value = 0;
  endhHTML.value = 9;
  endmHTML.value = 0;
  endapHTML.value = 0;
  jsonHTML.value = JSON.stringify(person);
}

function useJSON(){
  try{
    person = JSON.parse(jsonHTML.value);
    nicknameHTML.value = person.nickname ;
    lastnameHTML.value = person.lastname;
    schoolHTML.value = person.school;
    schoolCodeHTML.value = person.schoolCode;
    update();
  } catch(e){
    alert("Could not parse JSON");
  }
}
