const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const axios = require('axios')


var http = require('http').Server(app);
// const io = require('socket.io')();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// console.log("IP Addresses: ", process.env.IPLIST[0])
// console.log("PORT LIST: ", process.env.PORTLIST)


// io.on('connection', (client) => {
//     console.log('a user connected');
//   });


app.post('/heights', (req, res) => {
    console.log(req.body)
    axios({
        method: 'post',
        url: `http://lvh.me:8088/v2`,
        data: {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "heights"
          }
    }).then((response) => {
        res.send(response.data)
    }).catch((response) => {
        console.log(response)
    })
});

app.get('/properties', (req, res) => {
    axios({
        method: 'post',
        url: `http://lvh.me:8088/v2`,
        data: {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "properties"
          }
    }).then((response) => {
        res.send(response.data)
    }).catch((response) => {
        console.log(response)
    })
});

app.get('/network-info', (req, res) => {

    axios({
        method: 'post',
        url: `http://lvh.me:8088/debug`,
        data: {  
            "jsonrpc":"2.0",
            "id":0,
            "method":"network-info"
         }
    }).then((response) => {
        res.send(response.data)
    }).catch((response) => {
        console.log(response)
    })
});

app.get('/config', (req, res) => {
    axios({
        method: 'post',
        url: `http://lvh.me:8088/debug`,
        data: {  
            "jsonrpc":"2.0",
            "id":0,
            "method":"configuration"
         }
    }).then((response) => {
        res.send(response.data)
    }).catch((response) => {
        console.log(response)
    })
});

app.listen(process.env.PORT || 8080);