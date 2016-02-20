var socket;

var player = {
  x: Math.random() * 500, y: Math.random() * 500, name: "Guest"
};

var players = [];

var socketEvents = {};

function socketOpen(){
  console.log("Connected");
  socket.send(
    JSON.stringify(
      {
        type: "newplayer",
        data: player
      }
    )
  );
}

function socketMessage(data){
  data = JSON.parse(data.data);
  //console.log(data);
  socketEvents[data.type](data.data);
}

function socketClose(){
  alert("Connection to server closed. :(");
}

socketEvents["broadcast"] = function(msg){
  alert(msg);
}

socketEvents["updateplayers"] = function(data){
  players = JSON.parse(data);
  sendPlayerData();
}

function sendPlayerData(){
  socket.send(
    JSON.stringify(
      {
        type: "updateplayer",
        data: player
      }
    )
  );
}
