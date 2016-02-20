/*
Virtual Camera
Code by Mike del Castillo
Last Update: Feb 14, 2016
*/

function getURLQuery(nullistrue){
  var params = window.location.search.substring(1).split("&");
  var queries = {};
  for(var i = 0; i < params.length && window.location.search != ""; i++){
    var parts = params[i].split("=");
    queries[decodeURIComponent(parts[0])] = parts[1] == null ? nullistrue : decodeURIComponent(parts[1]);
  }
  return queries;
}
