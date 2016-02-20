var ws = require("nodejs-websocket");

var clients = [];

var server = ws.createServer(function (conn) {
    console.log("New connection");

    clients.push(conn);

    conn.on("text", function (str) {
        console.log("Received "+str)
        clients.forEach(function(client){
          client.sendText(str);
        })
    })
    conn.on("close", function (code, reason) {
      clients.splice(clients.indexOf(conn), 1);
        console.log("Connection closed");
    })
}).listen(8001)
