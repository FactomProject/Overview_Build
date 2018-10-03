const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const socket = require("socket.io");
const axios = require("axios");
require("dotenv").config();

var app = express();
app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

server = app.listen(5001, function() {
  console.log("server is running on port 5001");
});

let disbish = [];
let apisList = [];
let users = [];
let connections = [];

io = socket(server);
// () => {
//   io.emit("ListOfURLs", disbish);
//   socket.brodcast.to()
// };

io.on("connection", socket => {
  console.log(socket.id);
  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);

  socket.on("clickyclick", data => {
    console.log(data, socket.id);
    // io.emit(
    //   "back",
    //   `User Number: ${connections.indexOf(socket) + 1} id: ${socket.id}`
    // );
    io.to(socket.id).emit(
      "back",
      `User Number: ${connections.indexOf(socket) + 1} id: ${socket.id}`
    );
    console.log(connections.length);
  });
  //  io.emit("ListOfURLs", disbish);
  // io.emit("ListOfAPIs", apisList);
  socket.on("firstcall", data => {
    console.log(data);
    disbish = data.ListOfURLs;
    apisList = data.ListOfAPIs;
    io.to(socket.id).emit("ListOfURLs", data.ListOfURLs);
    io.to(socket.id).emit("ListOfAPIs", data.ListOfAPIs);
    // io.sockets.in(socket.id).emit("ListOfURLs", data.ListOfURLs);
    // io.sockets.in(socket.id).emit("ListOfAPIs", data.ListOfAPIs);
    // socket.join(socket.id);
    loopIPs(socket.id);
    // console.log(data)
  });

  socket.on("allothercalls", () => {
    loopIPs(socket.id);
  });
  // console.log(io.sockets);

  socket.on("disconnect", data => {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected: %s sockets connected", connections.length);
  });

  apis = (url, endpoint, method, socketid) => {
    axios({
      method: "post",
      url: `http://${url}/${endpoint}`,
      data: {
        jsonrpc: "2.0",
        id: 0,
        method: `${method}`
      }
    })
      .then(response => {
        let Obj = {};
        Obj[url] = {};
        Obj[url][method] = response.data.result;
        //   io.emit("APIObject", { data: Obj, api: method });
        // io.sockets.in(socket.id).emit("APIObject", { data: Obj, api: method });
        io.to(socketid).emit("APIObject", { data: Obj, api: method });
      })
      .catch(response => {
        //   console.log(response)
        let Obj = {};
        Obj[url] = {};
        Obj[url][method] = {};
        //   io.emit("APIObject", { data: Obj, api: method });
        io.to(socketid).emit("APIObject", { data: Obj, api: method });
        // io.sockets.in(socket.id).emit("APIObject", { data: Obj, api: method });
      });
  };

  loopIPs = socketid => {
    for (let j = 0; j <= apisList.length - 1; j++) {
      for (let i = 0; i <= disbish.length - 1; i++) {
        let splitUp = apisList[j].split("/");
        apis(disbish[i], splitUp[1], splitUp[0], socketid);
      }
    }
    //   setInterval(() => {
    //     for (let j = 0; j <= apisList.length - 1; j++) {
    //       for (let i = 0; i <= disbish.length - 1; i++) {
    //         let splitUp = apisList[j].split("/");
    //         apis(disbish[i], splitUp[1], splitUp[0]);
    //       }
    //     }
    //   }, 20000);
  };
});
