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

io = socket(server);
() => {io.emit('ListOfURLs', disbish)}

io.on('connection', (socket) => {
    io.emit('ListOfURLs', disbish)
    socket.on('firstcall', (data) => {
        loopIPs()
    })
});

apis = (url, api, apiType) => {
    axios({
        method: 'post',
        url: `http://${url}/${apiType}`,
        data: {  
            "jsonrpc":"2.0",
            "id":0,
            "method":`${api}`
         }
    }).then((response) => {
        let Obj = {};
        Obj[url] = {};
        Obj[url][api] = response.data.result
        io.emit('APIObject', { data : Obj, api: api})
    }).catch((response) => {
        console.log(response)
    })
}

loopIPs = () => {
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
        for (let j = 0; j <= apisList.length-1; j++) {
            for (let i = 0; i <= disbish.length-1; i++) {
                if (v2List.includes(apisList[j])) {
                    apis(disbish[i], apisList[j], "v2")
                } else {
                    apis(disbish[i], apisList[j], "debug")
                } 
            }
        }  
    }, 20000)
}
