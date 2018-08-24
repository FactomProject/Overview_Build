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

console.log("DIS: ",process.env.IPLIST)
let disbish = process.env.IPLIST.split(`','`)

io = socket(server);
() => {io.emit('ListOfURLs', disbish)}


// for (let i = 0; i<=disbish.length-1; i++) {
    console.log(disbish[0])
    io.on('connection', (socket) => {
    
        io.emit('ListOfURLs', disbish)
        socket.on('heightsAPI', (data) => {
            // console.log("YOOOO",data)
            HeightsApi(data);
            PropertiesApi(data);
        })
        // setInterval( function() {
        //     HeightsApi(disbish[0])
            
        // }, 5000)
        // HeightsApi(url)
        // PropertiesApi(url)
        // NetworkInfoApi(url)
        // ConfigApi(urk)
        // sendlist(disbish)
    });

// }

// sendlist = (disbish) => {
//     io.emit('ListOfURLs', disbish)
// }

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
}

global.propObj = {}
PropertiesApi = (url) => {
    console.log('called propsAPI')
    axios({
        method: 'post',
        url: `http://${url}/v2`,
        data: {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "properties"
          }
    }).then((response) => {
        console.log('in then props: ', response.data.result)
        propObj[url] = {}
        propObj[url]['properties'] = response.data.result
        console.log('propObj: ', propObj)
        // io.emit('propertiesAPI', response.data)
    }).catch((response) => {
        console.log(response)
    })
    io.emit('propsAPIObject', propObj)
}

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
        io.emit('networkinfoAPI', response.data)
    }).catch((response) => {
        console.log(response)
    })
}

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
        io.emit('configAPI', response.data)
    }).catch((response) => {
        console.log(response)
    })
}


for (let i = 0; i <= disbish.length-1; i++) {
    // newObj[disbish[i]] = {};
    // newObj[disbish[i]]['heightsAPI'] = 
    // HeightsApi(disbish[i])
    PropertiesApi(disbish[i])
    // console.log('global bish: ',holderObj)s
    // console.log('func: ',HeightsApi(disbish[i]))
    // newObj[disbish[i]][heightsAPI] = HeightsApi(url)
}
// console.log(newObj)
// app.post('/heights', (req, res) => {
//     console.log(req.body)
//     axios({
//         method: 'post',
//         url: `http://lvh.me:8088/v2`,
//         data: {
//             "jsonrpc": "2.0",
//             "id": 0,
//             "method": "heights"
//           }
//     }).then((response) => {
//         res.send(response.data)
//     }).catch((response) => {
//         console.log(response)
//     })
// });

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
