const bodyParser = require('body-parser')
const path = require('path');
const express = require('express');
const socket = require('socket.io');
const axios = require('axios');
require('dotenv').config()

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

server = app.listen(5001, function(){
    console.log('server is running on port 5001')
});

let disbish = process.env.IPLIST.split(`','`)
let apisList = process.env.APILIST.split(`","`)
let v2List = ["heights","properties"];
console.log(apisList)

io = socket(server);
() => {io.emit('ListOfURLs', disbish)}

io.on('connection', (socket) => {
    io.emit('ListOfURLs', disbish)
    socket.on('firstcall', (data) => {
        loopIPs()
    })
});

apis = (url, api, apiType) => {
    console.log(url, api)
    axios({
        method: 'post',
        url: `http://${url}/${apiType}`,
        data: {  
            "jsonrpc":"2.0",
            "id":0,
            "method":`${api}`
         }
    }).then((response) => {
        console.log(response.data)
    }).catch((response) => {
        console.log(response)
    })
    // io.emit('configAPIObject', configObj)
}

global.holderObj = {}
HeightsApi = (url) => {
    axios({
        method: 'post',
        url: `http://${url}/v2`,
        data: {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "heights"
        }
    })
    .then((response) => {
        holderObj[url] = {}
        holderObj[url]['heights'] = response.data.result
        io.emit('heightsAPI', response.data)
    }).catch((response) => {
        console.log(response)
    })
    io.emit('heightsAPIObject', holderObj)
    io.emit('heightsAPIObject2', holderObj)
}

global.propObj = {}
PropertiesApi = (url) => {
    axios({
        method: 'post',
        url: `http://${url}/v2`,
        data: {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "properties"
          }
    }).then((response) => {
        propObj[url] = {}
        propObj[url]['properties'] = response.data.result
        io.emit('propertiesAPI', response.data)
    }).catch((response) => {
        console.log(response)
    })
    io.emit('propsAPIObject', propObj)
}

global.networkObj = {}
NetworkInfoApi = (url) => {
    axios({
        method: 'post',
        url: `http://${url}/debug`,
        data: {  
            "jsonrpc":"2.0",
            "id":0,
            "method":"network-info"
         }
    }).then((response) => {
        networkObj[url] = {}
        networkObj[url]['networkinfo'] = response.data.result
        io.emit('networkinfoAPI', response.data)
    }).catch((response) => {
        console.log(response)
    })
    io.emit('netinfoAPIObject', networkObj)
}

global.configObj = {}
ConfigApi = (url) => {
    axios({
        method: 'post',
        url: `http://${url}/debug`,
        data: {  
            "jsonrpc":"2.0",
            "id":0,
            "method":"configuration"
         }
    }).then((response) => {
        configObj[url] = {}
        configObj[url]['config'] = response.data.result
        io.emit('configAPI', response.data)
    }).catch((response) => {
        console.log(response)
    })
    io.emit('configAPIObject', configObj)
}

loopIPs = () => {
    for (let i = 0; i <= disbish.length-1; i++) {
        HeightsApi(disbish[i])
        PropertiesApi(disbish[i])
        NetworkInfoApi(disbish[i])
        ConfigApi(disbish[i])
    }
    for (let j = 0; j <= apisList.length-1; j++) {
        for (let i = 0; i <= disbish.length-1; i++) {
            if (v2List.includes(apisList[j])) {
                apis(disbish[i], apisList[j], "v2")
            } else {
                apis(disbish[i], apisList[j], "debug")
            } 
        }
    }  
    setInterval(() => {
        for (let i = 0; i <= disbish.length-1; i++) {
            HeightsApi(disbish[i])
            PropertiesApi(disbish[i])
            NetworkInfoApi(disbish[i])
            ConfigApi(disbish[i])
        }
    }, 20000)
}
