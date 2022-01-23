const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const https = require('https');
const fs = require('fs');

const key = fs.readFileSync('./cert/key.pem');
const cert = fs.readFileSync('./cert/cert.pem');

const server = http.Server(app);
//const server = https.createServer({ key: key, cert: cert }, app);
//const { Server } = require("socket.io");
const io = require("socket.io")(server);
const wsunity = require("ws");
const wsclient = require("ws");
const bodyPraser = require("body-parser");
//const { stat } = require('fs');
var isSc1robotRuning;
var isSc2robotRuning;
var isSc3robot1Runing;
var isSc3robot2Runing;
var isSc3robot3Runing;
var isSpeedMax;
var isSpeedMin;
var isStepMin;
var isSc2OzobotinArea;
app.use(cors());
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));
app.use(express.static('Webgl'));



/////// ------- serving html/webgl -------/////
server.listen(3000, function () {
    console.log('listening on *:3000');
});


//////-------Websocket Server for Update checking Setup------------//// 

const wss_update = new wsunity.Server({ port: 8081 }, () => {
    console.log('websocket server for status update checking online');
});

wss_update.on('connection', function connection(ws) {
    ws.on('message', function status_update(data) {
        //console.log("recevied data: " + data)
        if (data == "busy") {
            isrobotRuning = true;
        } else if (data == "nobusy") {
            isrobotRuning = false;
        } else if (data == "minSpeed") {
            isSpeedMin = true;
            console.log('isSpeedMin: ' + isSpeedMin);
        } else if (data == "maxSpeed") {
            isSpeedMax = true;
            console.log('isSpeedMax: ' + isSpeedMax);
        } else if (data == "Speedokay") {
            isSpeedMin = false;
            isSpeedMax = false;
            console.log('Speedokay');
        } else if (data == "minStep") {
            isStepMin = true;
            console.log('isStepMin: ' + isStepMin);
        } else if (data == "Stepokay") {
            isStepMin = false;
            console.log('isStepMin: ' + isStepMin);
        } else if (JSON.parse(data).colliderEnter == "Ozobot_sc2") {
            console.log("ozobotSc2_enter");
            isSc2OzobotinArea = true;
        } else if (JSON.parse(data).colliderExit == "Ozobot_sc2") {
            console.log("ozobotSc2_exit");
            isSc2OzobotinArea = false;
        } else if (JSON.parse(data).isNotMoving == "FK_Sc1") {
            //console.log("FK_Sc1 Stopping");
            isSc1robotRuning = false;
        } else if (JSON.parse(data).isMoving == "FK_Sc1") {
            //console.log("FK_Sc1 Running");
            isSc1robotRuning = true;
        } else if (JSON.parse(data).isNotMoving == "FK_Sc2") {
            isSc2robotRuning = false;
        } else if (JSON.parse(data).isMoving == "FK_Sc2") {
            isSc2robotRuning = true;
        } else if (JSON.parse(data).isNotMoving == "FK_grp1") {
            isSc3robot1Runing = false;
        } else if (JSON.parse(data).isMoving == "FK_grp1") {
            isSc3robot1Runing = true;
        } else if (JSON.parse(data).isNotMoving == "FK_grp2") {
            isSc3robot2Runing = false;
        } else if (JSON.parse(data).isMoving == "FK_grp2") {
            isSc3robot2Runing = true;
        } else if (JSON.parse(data).isNotMoving == "FK_grp3") {
            isSc3robot3Runing = false;
        } else if (JSON.parse(data).isMoving == "FK_grp3") {
            isSc3robot3Runing = true;
        }
    });

    //ws.on('close', function close() {
    //    ws.removeListener('message', status_update);
    //});

});



//////-------Websocket Server for communicating Setup------------//// 

const wss = new wsunity.Server({ port: 8080 }, () => {
    console.log('websocket server online');
});

wss.on('connection', function connection(ws) {
    isrobotRuning = false;
    isSpeedMax = false;
    isSpeedMin = false;
    isStepMin = false;
    isSc2OzobotinArea = false;

    //////////-----------------sc1 sl----------------///////////////
    app.get('/Scenario1/signal_lights/yellow', (req, res) => {
        ws.on('message', function S1SLyellow(data) {
            console.log('received: %s', data);
            if (JSON.parse(data).request_id == "s1slcol") {
                console.log('read color:' + JSON.parse(data).yellow);
                res.status(200).send(JSON.parse(data).yellow);
            } else {
                res.status(418).send();
            }
            ws.removeListener('message', S1SLyellow)
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "1",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario1/signal_lights/red', (req, res) => {
        ws.on('message', function S1SLred(data) {
            console.log('received: %s', data);
            if (data.request_id = "s1slcol") {
                console.log('read color:' + JSON.parse(data).red);
                res.status(200).send(JSON.parse(data).red);
                ws.removeListener('message', S1SLred)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "1",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario1/signal_lights/green', (req, res) => {
        ws.on('message', function S1SLgreen(data) {
            console.log('received: %s', data);
            if (data.request_id = "s1slcol") {
                console.log('read color:' + JSON.parse(data).green);
                res.status(200).send(JSON.parse(data).green);
                ws.removeListener('message', S1SLgreen)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "1",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario1/signal_lights/status', (req, res) => {
        ws.on('message', function S1SLcolor(data) {
            console.log('received: %s', data);
            if (data.request_id = "s1slcol") {
                //console.log('read color:' + JSON.parse(data).color);
                res.status(200).send(JSON.parse(data));
                ws.removeListener('message', S1SLcolor)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "1",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })


    //////////////------------------------s2 sl------------------//////////////
    app.get('/Scenario2/signal_lights/yellow', (req, res) => {
        ws.on('message', function S2SLyellow(data) {
            console.log('received: %s', data);
            if (data.request_id = "s2slcol") {
                console.log('read color:' + JSON.parse(data).yellow);
                res.status(200).send(JSON.parse(data).yellow);
                ws.removeListener('message', S2SLyellow)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "2",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario2/signal_lights/red', (req, res) => {
        ws.on('message', function S2SLred(data) {
            console.log('received: %s', data);
            if (data.request_id = "s2slcol") {
                console.log('read color:' + JSON.parse(data).red);
                res.status(200).send(JSON.parse(data).red);
                ws.removeListener('message', S2SLred)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "2",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario2/signal_lights/green', (req, res) => {
        ws.on('message', function S2SLgreen(data) {
            console.log('received: %s', data);
            if (data.request_id = "s2slcol") {
                console.log('read color:' + JSON.parse(data).green);
                res.status(200).send(JSON.parse(data).green);
                ws.removeListener('message', S2SLgreen)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "2",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario2/signal_lights/status', (req, res) => {
        ws.on('message', function S2SLcolor(data) {
            console.log('received: %s', data);
            if (data.request_id = "s2slcol") {
                //console.log('read color:' + JSON.parse(data).color);
                res.status(200).send(JSON.parse(data));
                ws.removeListener('message', S2SLcolor)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "2",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })


    ///////////////----------------sc3-1 sl----------------////////////////////////
    app.get('/Scenario3_grp1/signal_lights/yellow', (req, res) => {
        ws.on('message', function S3grp1SLyellow(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_1slcol") {
                console.log('read color:' + JSON.parse(data).yellow);
                res.status(200).send(JSON.parse(data).yellow);
                ws.removeListener('message', S3grp1SLyellow)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "3",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario3_grp1/signal_lights/red', (req, res) => {
        ws.on('message', function S3grp1SLred(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_1slcol") {
                console.log('read color:' + JSON.parse(data).red);
                res.status(200).send(JSON.parse(data).red);
                ws.removeListener('message', S3grp1SLred)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "3",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario3_grp1/signal_lights/green', (req, res) => {
        ws.on('message', function S3grp1SLgreen(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_1slcol") {
                console.log('read color:' + JSON.parse(data).green);
                res.status(200).send(JSON.parse(data).green);
                ws.removeListener('message', S3grp1SLgreen)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "3",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario3_grp1/signal_lights/status', (req, res) => {
        ws.on('message', function S3grp1SLcolor(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_1slcol") {
                //console.log('read color:' + JSON.parse(data).color);
                res.status(200).send(JSON.parse(data));
                ws.removeListener('message', S3grp1SLcolor)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "3",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })



    ///////////////----------------sc3-2 sl----------------////////////////////////
    app.get('/Scenario3_grp2/signal_lights/yellow', (req, res) => {
        ws.on('message', function S3grp2SLyellow(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_2slcol") {
                console.log('read color:' + JSON.parse(data).yellow);
                res.status(200).send(JSON.parse(data).yellow);
                ws.removeListener('message', S3grp2SLyellow)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "4",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario3_grp2/signal_lights/red', (req, res) => {
        ws.on('message', function S3grp2SLred(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_2slcol") {
                console.log('read color:' + JSON.parse(data).red);
                res.status(200).send(JSON.parse(data).red);
                ws.removeListener('message', S3grp2SLred)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "4",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario3_grp2/signal_lights/green', (req, res) => {
        ws.on('message', function S3grp2SLgreen(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_2slcol") {
                console.log('read color:' + JSON.parse(data).green);
                res.status(200).send(JSON.parse(data).green);
                ws.removeListener('message', S3grp2SLgreen)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "4",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario3_grp2/signal_lights/status', (req, res) => {
        ws.on('message', function S3grp1SLcolor(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_2slcol") {
                //console.log('read color:' + JSON.parse(data).color);
                res.status(200).send(JSON.parse(data));
                ws.removeListener('message', S3grp1SLcolor)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "4",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    ///////////////----------------sc3-2 sl----------------////////////////////////
    app.get('/Scenario3_grp3/signal_lights/yellow', (req, res) => {
        ws.on('message', function S3grp3SLyellow(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_3slcol") {
                console.log('read color:' + JSON.parse(data).yellow);
                res.status(200).send(JSON.parse(data).yellow);
                ws.removeListener('message', S3grp3SLyellow)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "5",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario3_grp3/signal_lights/red', (req, res) => {
        ws.on('message', function S3grp3SLred(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_3slcol") {
                console.log('read color:' + JSON.parse(data).red);
                res.status(200).send(JSON.parse(data).red);
                ws.removeListener('message', S3grp3SLred)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "5",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario3_grp3/signal_lights/green', (req, res) => {
        ws.on('message', function S3grp3SLgreen(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_3slcol") {
                console.log('read color:' + JSON.parse(data).green);
                res.status(200).send(JSON.parse(data).green);
                ws.removeListener('message', S3grp3SLgreen)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "5",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })

    app.get('/Scenario3_grp3/signal_lights/status', (req, res) => {
        ws.on('message', function S3grp3SLcolor(data) {
            console.log('received: %s', data);
            if (data.request_id = "s3_3slcol") {
                res.status(200).send(JSON.parse(data));
                ws.removeListener('message', S3grp3SLcolor)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Signallight":
                    {
                        "id": "5",
                        "getcolor": "color"
                    }
                }));
            }
        });
    })


    app.get('/Scenario3_grp3/ozobot_1/LED0', (req, res) => {
        ws.on('message', function S3grpOzobo1LED0(data) {
            console.log('received: %s', data);
            if (JSON.parse(data).request_id = "oz_led0col") {
                res.status(200).send(JSON.parse(data));
                ws.removeListener('message', S3grpOzobo1LED0)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Ozobot": "LED0"
                }));
            }
        });
    })

    app.get('/Scenario3_grp3/ozobot_1/LED1', (req, res) => {
        ws.on('message', function S3grpOzobo1LED1(data) {
            console.log('received: %s', data);
            if (JSON.parse(data).request_id = "oz_led1col") {
                res.status(200).send(JSON.parse(data));
                ws.removeListener('message', S3grpOzobo1LED1)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Ozobot": "LED1"
                }));
            }
        });
    })

    app.get('/Scenario3_grp3/ozobot_1/LED2', (req, res) => {
        ws.on('message', function S3grpOzobo1LED2(data) {
            console.log('received: %s', data);
            if (JSON.parse(data).request_id = "oz_led2col") {
                res.status(200).send(JSON.parse(data));
                ws.removeListener('message', S3grpOzobo1LED2)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Ozobot": "LED2"
                }));
            }
        });
    })

    app.get('/Scenario3_grp3/ozobot_1/LED3', (req, res) => {
        ws.on('message', function S3grpOzobo1LED3(data) {
            console.log('received: %s', data);
            if (JSON.parse(data).request_id = "oz_led3col") {
                res.status(200).send(JSON.parse(data));
                ws.removeListener('message', S3grpOzobo1LED3)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Ozobot": "LED3"
                }));
            }
        });
    })

    app.get('/Scenario3_grp3/ozobot_1/LED4', (req, res) => {
        ws.on('message', function S3grpOzobo1LED4(data) {
            console.log('received: %s', data);
            if (JSON.parse(data).request_id = "oz_led4col") {
                res.status(200).send(JSON.parse(data));
                ws.removeListener('message', S3grpOzobo1LED4)
            }
        });
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Ozobot": "LED4"
                }));
            }
        });
    })

    /////------------------------event status update-------------------------//////////////
    //ws.on('message', function status_update(data) {
    //    console.log("recevied data: " + data)
    //    if (data == "busy") {
    //        isrobotRuning = true;
    //        //console.log('isrobotRuning: ' + isrobotRuning);
    //    } else if (data == "nobusy") {
    //        isrobotRuning = false;
    //        //    console.log('isrobotRuning: ' + isrobotRuning);
    //    } else if (data == "minSpeed") {
    //        isSpeedMin = true;
    //        console.log('isSpeedMin: ' + isSpeedMin);
    //    } else if (data == "maxSpeed") {
    //        isSpeedMax = true;
    //        console.log('isSpeedMax: ' + isSpeedMax);
    //    } else if (data == "Speedokay") {
    //        isSpeedMin = false;
    //        isSpeedMax = false;
    //        console.log('Speedokay');
    //    } else if (data == "minStep") {
    //        isStepMin = true;
    //        console.log('isStepMin: ' + isStepMin);
    //    } else if (data == "Stepokay") {
    //        isStepMin = false;
    //        console.log('isStepMin: ' + isStepMin);
    //    } else if (data.colliderEnter == "Ozobot_sc2") {
    //        console.log("ozobotSc2_enter");
    //        isSc2OzobotinArea = true;
    //    } else if (data.colliderExit == "Ozobot_sc2") {
    //        console.log("ozobotSc2_exit");
    //        isSc2OzobotinArea = false;

    //    }
    //});

    //ws.on('close', function close() {
    //    ws.removeListener('message', status_update);
    //});

});

wss.on('listening', () => {
    console.log("listening");
});



////////////////-------------------------------------websocket client---------------------/////////////////////////////////

//const wsc = new wsclient('ws://localhost:8080/');  
//wsc.on('open', function open() {
//    //wsc.send('trigger socket oppened');
//    incomingData = null;
//});
//wsc.on('message', function incoming(message) {
//    console.log('websocket client trigger received: %s', message);
//});







////////// ------------------Socket.io--------------------//////////////

io.on('connection', function (socket) {
    console.log('a user connected, user id: ' + socket.userId);
    socket.on('status', (status) => {
        isrobotRuning = status;
        console.log(status);
    });

});



///////////--------------TD Implementation ---------------/////////////

app.post('/Actions/test', (req, res) => {

    console.log(req.body);
    wsc.send(JSON.stringify(req.body));
    res.status(200).send();
})


//app.post('/Websockettest', (req, res) => {
//    //wsc.send(JSON.stringify(req.body));
//    //io.emit("chat", "hi from nodejs");
//    wss.send("test");
//    res.status(200).send();
//})


app.post('/Scenario1/Mirobot/Pick_Green', (req, res) => {

    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "auto",
        //    Object: "green"
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "auto",
        //    "Object": "green",
        //}));

        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "auto",
                    "Object": "green",
                }));
            }
        });



        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Pick_Yellow', (req, res) => {

    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "auto",
        //    Object: "yellow"
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "auto",
        //    "Object": "yellow",
        //}));

        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "auto",
                    "Object": "yellow",
                }));
            }
        });

        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Pick_Red', (req, res) => {
    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "auto",
        //    Object: "red"
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "auto",
        //    "Object": "red",
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "auto",
                    "Object": "red",
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Pick_Blue', (req, res) => {

    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "auto",
        //    Object: "blue"
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "auto",
        //    "Object": "blue",
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "auto",
                    "Object": "blue",
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J1plus', (req, res) => {
    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //Action: "manuel",
        //Joint: {
        //    Joint1: "+",
        //}
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint1": "+",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint1": "+",
                    }
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J1minus', (req, res) => {

    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint1: "-",
        //    }
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint1": "-",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint1": "-",
                    }
                }));
            }
        });

        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J2plus', (req, res) => {
    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint2: "+",
        //    }
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint2": "+",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint2": "+",
                    }
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J2minus', (req, res) => {

    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint2: "-",
        //    }
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint2": "-",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint2": "-",
                    }
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J3plus', (req, res) => {
    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint3: "+",
        //    }
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint3": "+",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint3": "+",
                    }
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J3minus', (req, res) => {
    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint3: "-",
        //    }
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint3": "-",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint3": "-",
                    }
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J4plus', (req, res) => {

    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint4: "+",
        //    }
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint4": "+",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint4": "+",
                    }
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J4minus', (req, res) => {
    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint4: "-",
        //    }
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint4": "-",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint4": "-",
                    }
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J5plus', (req, res) => {
    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint5: "+",
        //    }
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint5": "+",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint5": "+",
                    }
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J5minus', (req, res) => {
    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint5: "-",
        //    }
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint5": "-",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint5": "-",
                    }
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J6plus', (req, res) => {
    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint6: "+",
        //    }
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint6": "+",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint6": "+",
                    }
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J6minus', (req, res) => {
    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint6: "-",
        //    }
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "manuel",
        //    "Joint": {
        //        "Joint6": "-",
        //    }
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "manuel",
                    "Joint": {
                        "Joint6": "-",
                    }
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Speedplus500', (req, res) => {
    if (isSpeedMax == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Speed: "+500"
        //});
        //wsc.send(JSON.stringify({
        //    "Speed": "+500"
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Speed": "+500"
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Speedminus500', (req, res) => {
    if (isSpeedMin == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Speed: "-500"
        //});
        //wsc.send(JSON.stringify({
        //    "Speed": "-500"
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Speed": "-500"
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Speedplus200', (req, res) => {
    if (isSpeedMax == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Speed: "+200"

        //});
        //wsc.send(JSON.stringify({
        //    "Speed": "+200"
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Speed": "+200"
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Speedminus200', (req, res) => {
    if (isSpeedMin == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Speed: "-200"

        //});
        //wsc.send(JSON.stringify({
        //    "Speed": "-200"
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Speed": "-200"
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Stepplus5', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Step: "+5"
        //});
        //wsc.send(JSON.stringify({
        //    "Step": "+5"
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Step": "+5"
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Stepminus5', (req, res) => {
    if (isStepMin == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Step: "-5"
        //});
        //wsc.send(JSON.stringify({
        //    "Step": "-5"
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Step": "-5"
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Stepplus2', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Step: "+2"
        //});
        //wsc.send(JSON.stringify({
        //    "Step": "+2"
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Step": "+2"
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Stepminus2', (req, res) => {
    if (isStepMin == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Step: "-2"
        //});
        //wsc.send(JSON.stringify({
        //    "Step": "-2"
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Step": "-2"
                }));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/grabObject', (req, res) => {
    if (isSc1robotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "grab"
        //});
        //wsc.send(JSON.stringify({
        //    "Action": "grab"
        //}));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify({
                    "Action": "grab"
                }));
            }
        });
        res.status(200).send();
    }
})



app.post('/Scenario3/ozobot/followline', (req, res) => {
    //wsc.send(JSON.stringify({
    //    "Ozobot": "followline"
    //}));
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify({
                "Ozobot": "followline"
            }));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/ozobot/forward', (req, res) => {
    //wsc.send(JSON.stringify({
    //    "Ozobot": "front"
    //}));
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify({
                "Ozobot": "front"
            }));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/ozobot/back', (req, res) => {
    //wsc.send(JSON.stringify({
    //    "Ozobot": "back"
    //}));
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify({
                "Ozobot": "back"
            }));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/ozobot/left', (req, res) => {
    //wsc.send(JSON.stringify({
    //    "Ozobot": "left"
    //}));
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify({
                "Ozobot": "left"
            }));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/ozobot/right', (req, res) => {
    //wsc.send(JSON.stringify({
    //    "Ozobot": "right"
    //}));
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify({
                "Ozobot": "right"
            }));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/ozobot/stop', (req, res) => {
    //wsc.send(JSON.stringify({
    //    "Ozobot": "stop"
    //}));
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify({
                "Ozobot": "stop"
            }));
        }
    });
    res.status(200).send();
})



app.post('/Scenario3/mirobot1/Pick_Box', (req, res) => {

    if (isSc3robot1Runing == true) {
        res.status(418).send();
    } else {

        //wsc.send(JSON.stringify({
        //    "Action": "auto",
        //    "Object": "green"
        //}));
        //wsc.send(JSON.stringify(req.body));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    //    console.log(req.body);
    }
})


app.post('/Scenario3/mirobot2/Pick_Box', (req, res) => {

    if (isSc3robot2Runing == true) {
        res.status(418).send();
    } else {
        //wsc.send(JSON.stringify(req.body));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})



app.post('/Scenario3/mirobot3/Pick_Box', (req, res) => {

    if (isSc3robot3Runing == true) {
        res.status(418).send();
    } else {
        //wsc.send(JSON.stringify(req.body));
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/Scenario2/mirobot/Pick_Box', (req, res) => {

    if (isSc2robotRuning == true) {
        res.status(418).send();
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})
