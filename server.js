const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const axios = require('axios')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/heights', (req, res) => {
    axios({
        method: 'post',
        url: 'http://lvh.me:8088/v2',
        data: {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "heights"
          }
    }).then((response) => {
        res.send(response.data)
    })
});

app.get('/properties', (req, res) => {
    axios({
        method: 'post',
        url: 'http://lvh.me:8088/v2',
        data: {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "properties"
          }
    }).then((response) => {
        res.send(response.data)
    })
});

app.get('/network-info', (req, res) => {
    axios({
        method: 'post',
        url: 'http://lvh.me:8088/debug',
        data: {  
            "jsonrpc":"2.0",
            "id":0,
            "method":"network-info"
         }
    }).then((response) => {
        res.send(response.data)
    })
});

app.get('/config', (req, res) => {
    axios({
        method: 'post',
        url: 'http://lvh.me:8088/debug',
        data: {  
            "jsonrpc":"2.0",
            "id":0,
            "method":"configuration"
         }
    }).then((response) => {
        res.send(response.data)
    })
});

app.listen(process.env.PORT || 8080);