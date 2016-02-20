var ws = require("nodejs-websocket");

console.log("Starting server...");
var server = ws.createServer(onConnect).listen(8080);
console.log("Server started.");

var messageEvents = {};

function onConnect(con){

  console.log("New client. Currently " + server.connections.length + " client(s).");

  con.on("text", function(msg){
    //console.log("Client #" + (server.connections.indexOf(con) + 1) + ": " + msg);
    var data = decodeMessage(msg);
    messageEvents[data.type](data.data, con);
  });

  con.on("close", function(code, reason){
    console.log("Cliend disconnected. Currently " + server.connections.length + " client(s).");
  });
}

function broadcast(msg) {
	server.connections.forEach(function (conn) {
		conn.sendText(encodeMessage("broadcast", msg))
	})
}

function encodeMessage(type, data){
  return JSON.stringify({type: type, data: data});
}

function decodeMessage(msg){
  return JSON.parse(msg);
}

var players = [];

messageEvents["broadcast"] = broadcast;

messageEvents["newplayer"] = function(data, con){
  players.push(data);
  sendPlayerUpdates(con);
}

function sendPlayerUpdates(con){
  con.send(encodeMessage("updateplayers", JSON.stringify(players)));
}

messageEvents["updateplayer"] = function(data, con){
  var up = data;
  players.forEach(function(p){
    if(p.name == up.name){
      p = up;
    }
  });
  sendPlayerUpdates(con);
}
