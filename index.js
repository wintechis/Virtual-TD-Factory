const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
/*const https = require('https');*/
/*const fs = require('fs');*/
//const key = fs.readFileSync('./cert/key.pem');
//const cert = fs.readFileSync('./cert/cert.pem');
const server = http.Server(app);
//const server = https.createServer({ key: key, cert: cert }, app);
//const { Server } = require("socket.io");
const wsunity = require("ws");
const bodyparse = require("body-parser");
//const { stat } = require('fs');
const { v4: uuidv4 } = require("uuid");
const uniqid = require('uniqid');


app.use(cors());
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: true }));
app.use(express.static('Webgl1280720'));
//app.use(express.static('Webgl_Paul'));


server.listen(3000, function () {
    console.log('listening on *:3000');
});


const wss = new wsunity.Server({ port: 3008 }, () => {
    console.log('websocket server online');
});



wss.on('close', function close() {

});

wss.on('connection', function connection(client) {
    //client.id = uuidv4();
    //wsclients.push(client)
    client.id = uniqid();
    client.subclients = [];
    client.send(JSON.stringify({
        "Websocket": [
            {
                "Socket_id": client.id
            }
        ]
    }))
    client.on('message', function status_update(data) {
        /// status of all the things in Webgl will be updated as a string line ALLStatus every 0.1 sec////
        client.AllStatus = data
        /// Some Example ///////
        //console.log('Mirobot id:' + JSON.parse(client.AllStatus).Mirobot[0].id);
        //console.log('ozobo led RBG:' + JSON.parse(client.AllStatus).Ozobot[0].LED0);
        //console.log('ozobo led R:' + JSON.parse(client.AllStatus).Ozobot[0].LED0[0]);
        //console.log('signallight yellow:' + JSON.parse(client.AllStatus).Signallight[0].yellow);
    });
});

wss.on('listening', () => {
    console.log("listening");
});

function SocketManager(message) {
    wss.clients.forEach(function each(client) {
        if (message.Websocket == null) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(message));
            }
        } else {
            if (client.id == message.Websocket[0].Socket_id) {
                if (client.readyState === wsunity.OPEN) {
                    if (client.sychHost != null) {
                        client.sychHost.send(JSON.stringify(message));
                        client.sychHost.subclients.forEach(function each(subclient) {
                            if (subclient.readyState === wsunity.OPEN) {
                                subclient.send(JSON.stringify(message));
                            }
                        })
                    } else {
                        client.send(JSON.stringify(message));
                        if (client.subclients != null) {
                            client.subclients.forEach(function each(subclient) {
                                if (subclient.readyState === wsunity.OPEN) {
                                    subclient.send(JSON.stringify(message));
                                }
                            })
                        }
                    }
                }

            }
        }
    });
}


app.get('/socketscheck', (req, res) => {
    var socketinfos = []
    var hostinfo
    var clientinfo = []
    wss.clients.forEach(function each(socket) {
        if (socket.sychHost != null) {
            hostinfo = socket.sychHost.id
        }
        if (socket.clients != null) {
            clientinfo = socket.subclients
        }
        socketInfo = { "socket": socket.id, 'host': hostinfo, "clients": clientinfo }
        socketinfos.push(socketInfo)

    });
    res.status(200).send(socketinfos);
})


app.post('/sychronizing', (req, res) => {
    result = false
    //traverse the wss.clients set twice to retrieve the two websocket clients: host socket, which has the socket ID HostID, and the client socket with ClientID. 
    wss.clients.forEach(function each(client) {
        if (client.id == req.body.Websocket[0].Socket_id) {
            wss.clients.forEach(function each(host) {
                if (host.id == req.body.Websocket[0].synHost_id) {
                    if (req.body.Websocket[0].IsSynchronizing == true) {
                        if (client.sychHost == null) {
                            client.sychHost = host;
                            host.subclients.push(client)
                            StatusSync = JSON.parse(host.AllStatus)
                            StatusSync.Websocket[0].IsSynchronizing = true;
                            client.send(JSON.stringify(StatusSync));
                            result = true
                        } else {
                            result = false
                        }
                    } else {
                        client.sychHost = null;
                        host.subclients.pop(client)
                    }
                    result = true
                }
            });
        }
    });
    if (result) {
        res.status(200).send();

    } else {
        res.status(418).send("Clients are not found or synchronized");
    }
})

app.post('/one-for-all', (req, res) => {
    SocketManager(req.body);
    res.status(200).send();
})

///--- Example: respond 418 while mirobot is moving ---///
app.post('/2/mirobot/go_to_axis', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[1].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        SocketManager(req.body);
        res.status(200).send();
    }
})




app.get('/get_All_status', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            if (client.id == req.body.Websocket[0].Socket_id) {
                res.status(200).send(JSON.parse(client.AllStatus));
            }
        }
    });
})


app.get('/get/ozobot/:ozobotID', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            if (client.id == req.body.Websocket[0].Socket_id) {
                res.status(200).send(JSON.parse(client.AllStatus).Ozobot[req.params.ozobotID-1]);
            }
        }
    });
})


app.get('/get/mirobot/:mirobotID', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            if (client.id == req.body.Websocket[0].Socket_id) {
                res.status(200).send(JSON.parse(client.AllStatus).Mirobot[req.params.mirobotID - 1]);
            }
        }
    });
})

app.get('/get/signal_lights/:signalID', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            if (client.id == req.body.Websocket[0].Socket_id) {
                res.status(200).send(JSON.parse(client.AllStatus).Signallight[req.params.signalID - 1]);
            }
        }
    });
})

app.get('/get/barrier/:barrierID', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            if (client.id == req.body.Websocket[0].Socket_id) {
                res.status(200).send(JSON.parse(client.AllStatus).Barrier[req.params.barrierID - 1]);
            }
        }
    });
})



app.get('/get/websocket', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            if (client.id == req.body.Websocket[0].Socket_id) {
                res.status(200).send(JSON.parse(client.AllStatus).Websocket);
            }
        }
    });
})

app.get('/get/camera', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            if (client.id == req.body.Websocket[0].Socket_id) {
                res.status(200).send(JSON.parse(client.AllStatus).Camera);
            }
        }
    });
})