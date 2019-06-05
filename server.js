const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const socket = require('socket.io');
const axios = require('axios');

require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const server = app.listen(5001, () => {
  console.log('server is running on port 5001');
});

const regex = /\[(.*?)\]/;

const ipList = regex
  .exec(process.env.IPLIST)[1]
  .replace(/'/g, '')
  .split(',');
for (let i = 0; i < ipList.length; i += 1) {
  if (ipList[i].indexOf(':') === -1) {
    ipList[i] = `${ipList[i]}:8088`;
  }
}
const apisList = regex
  .exec(process.env.APILIST)[1]
  .replace(/'/g, '')
  .split(',');

const DisplayedAPIs = regex.exec(process.env.DISPLAYEDAPIS)[1].replace(/'/g, '').split(',');
console.log("DisplayedAPIs: ", DisplayedAPIs)

const NOTDisplayedAPIs = regex.exec(process.env.NOTDISPLAYEDAPIS)[1].replace(/'/g, '').split(',');
console.log("NOTDisplayedAPIs: ", NOTDisplayedAPIs)

const connections = [];

const io = socket(server);

const apis = (url, endpoint, method, socketid) => {
  axios({
    method: 'post',
    url: `http://${url}/${endpoint}`,
    data: {
      jsonrpc: '2.0',
      id: 0,
      method: `${method}`
    }
  })
    .then(res => {
      const Obj = {};
      Obj[url] = {};
      Obj[url][method] = res.data.result;

      io.to(socketid).emit('APIObject', {
        data: Obj,
        api: method
      });
    })
    .catch(err => {
      const Obj = {};
      Obj[url] = {};
      Obj[url][method] = {};
      io.to(socketid).emit('APIObject', {
        data: Obj,
        api: method
      });
      console.log('Error ', err);
    });
};

const loopIPs = socketid => {
  for (let j = 0; j <= apisList.length - 1; j += 1) {
    for (let i = 0; i <= ipList.length - 1; i += 1) {
      const splitUp = apisList[j].split('/');
      apis(ipList[i], splitUp[1], splitUp[0], socketid);
    }
  }
};

io.on('connection', currentSocket => {
  connections.push(currentSocket);
  io.to(currentSocket.id).emit('DisplayedAPIs', DisplayedAPIs);
  io.to(currentSocket.id).emit('NOTDisplayedAPIs', NOTDisplayedAPIs);
  
  currentSocket.on('firstcall', () => {
    io.to(currentSocket.id).emit('ListOfURLs', ipList);
    io.to(currentSocket.id).emit('ListOfAPIs', apisList);
    
    loopIPs(currentSocket.id);
  });

  currentSocket.on('allothercalls', () => {
    loopIPs(currentSocket.id);
  });

  currentSocket.on('disconnect', () => {
    connections.splice(connections.indexOf(currentSocket), 1);
  });
});
