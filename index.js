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
var isrobotRuning;
var isSpeedMax;
var isSpeedMin;
var isStepMin;
var incomingData;


app.use(cors());
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));
app.use(express.static('Webgl'));






/////// ------- serving html/webgl -------/////
server.listen(3000, function () {
    console.log('listening on *:3000');
});




//////-------Websocket Setup------------//// 
const wss = new wsunity.Server({ port: 8080 }, () => {
    console.log('websocket server online');
});

wss.on('connection', function connection(ws) {
    isrobotRuning = false;
    isSpeedMax = false;
    isSpeedMin = false;
    isStepMin = false;
    ws.on('message', function incoming(data) {
        console.log("recevied data: " + data)
        incomingData = data
        wss.clients.forEach(function each(client) {
            if (data == "busy") {
                isrobotRuning = true;
            //    console.log('isrobotRuning: ' + isrobotRuning);
            } else if (data == "nobusy") {
                isrobotRuning = false;
            //    console.log('isrobotRuning: ' + isrobotRuning);
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
                app.get('/Scenario2/signal_lights/yellow', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {

        wsc.send(JSON.stringify(req.body));
        waitForData(() => incomingData != null)
        res.status(200).send(incomingData);
        incomingData = null
    }
})
            }
            //else if (data == "ozobot_enter") {
            //    console.log("ozobot_enter");
            //} else if (data == "ozobot_exit") {
            //    console.log("ozobot_exit");
            //}
            else {
                if (client !== ws && client.readyState === wsunity.OPEN) {
                    client.send(data.toString());
                    client.send("boardcast");
                }
            }
        });
    });
});

wss.on('listening', () => {
    console.log("listening");
});

const wsc = new wsclient('ws://localhost:8080/');  //Using an additional websocket client as a "trigger" to tell the websocket server to send the message to all clients except the trigger, since I have not yet found a way to let websocket-server actively send the message to the clients.
wsc.on('open', function open() {
    //wsc.send('trigger socket oppened');
    incomingData = null;
});
wsc.on('message', function incoming(message) {
//    console.log('websocket client trigger received: %s', message);
});


const waitForData = (condition) => {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!condition()) {
                return
            }

            clearInterval(interval)
            resolve()
        }, 100)
    })
}






////////// ------------------Socket.io--------------------//////////////

io.on('connection', function (socket) {
    console.log('a user connected, user id: ' + socket.userId);
    socket.on('status', (status) => {
        isrobotRuning = status;
        console.log(status);
    });

});



app.post('/Actions/test', (req, res) => {

    console.log(req.body);
    wsc.send(JSON.stringify(req.body));
    res.status(200).send();
})






app.post('/Websockettest', (req, res) => {
    //wsc.send(JSON.stringify(req.body));
    io.emit("chat", "hi from nodejs");
    res.status(200).send();
})


app.post('/Scenario1/Mirobot/Pick_Green', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "auto",
        //    Object: "green"
        //});
        wsc.send(JSON.stringify({
            "Action": "auto",
            "Object": "green",
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Pick_Yellow', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "auto",
        //    Object: "yellow"
        //});
        wsc.send(JSON.stringify({
            "Action": "auto",
            "Object": "yellow",
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Pick_Red', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "auto",
        //    Object: "red"
        //});
        wsc.send(JSON.stringify({
            "Action": "auto",
            "Object": "red",
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/Pick_Blue', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "auto",
        //    Object: "blue"
        //});
        wsc.send(JSON.stringify({
            "Action": "auto",
            "Object": "blue",
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J1plus', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //Action: "manuel",
        //Joint: {
        //    Joint1: "+",
        //}
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint1": "+",
            }
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J1minus', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint1: "-",
        //    }
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint1": "-",
            }
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J2plus', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint2: "+",
        //    }
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint2": "+",
            }
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J2minus', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint2: "-",
        //    }
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint2": "-",
            }
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J3plus', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint3: "+",
        //    }
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint3": "+",
            }
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J3minus', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint3: "-",
        //    }
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint3": "-",
            }
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J4plus', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint4: "+",
        //    }
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint4": "+",
            }
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J4minus', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint4: "-",
        //    }
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint4": "-",
            }
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J5plus', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint5: "+",
        //    }
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint5": "+",
            }
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J5minus', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint5: "-",
        //    }
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint5": "-",
            }
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J6plus', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint6: "+",
        //    }
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint6": "+",
            }
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/J6minus', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "manuel",
        //    Joint: {
        //        Joint6: "-",
        //    }
        //});
        wsc.send(JSON.stringify({
            "Action": "manuel",
            "Joint": {
                "Joint6": "-",
            }
        }));
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
        wsc.send(JSON.stringify({
            "Speed": "+500"
        }));
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
        wsc.send(JSON.stringify({
            "Speed": "-500"
        }));
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
        wsc.send(JSON.stringify({
            "Speed": "+200"
        }));
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
        wsc.send(JSON.stringify({
            "Speed": "-200"
        }));
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
        wsc.send(JSON.stringify({
            "Step": "+5"
        }));
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
        wsc.send(JSON.stringify({
            "Step": "-5"
        }));
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
        wsc.send(JSON.stringify({
            "Step": "+2"
        }));
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
        wsc.send(JSON.stringify({
            "Step": "-2"
        }));
        res.status(200).send();
    }
})

app.post('/Scenario1/Mirobot/grabObject', (req, res) => {
    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        //io.emit('receive', {
        //    Action: "grab"
        //});
        wsc.send(JSON.stringify({
            "Action": "grab"
        }));
        res.status(200).send();
    }
})



app.post('/Scenario3/ozobot/followline', (req, res) => {
    wsc.send(JSON.stringify({
        "Ozobot": "followline"
    }));
    res.status(200).send();
})

app.post('/Scenario3/ozobot/forward', (req, res) => {
    wsc.send(JSON.stringify({
        "Ozobot": "front"
    }));
    res.status(200).send();
})

app.post('/Scenario3/ozobot/back', (req, res) => {
    wsc.send(JSON.stringify({
        "Ozobot": "back"
    }));
    res.status(200).send();
})

app.post('/Scenario3/ozobot/left', (req, res) => {
    wsc.send(JSON.stringify({
        "Ozobot": "left"
    }));
    res.status(200).send();
})

app.post('/Scenario3/ozobot/right', (req, res) => {
    wsc.send(JSON.stringify({
        "Ozobot": "right"
    }));
    res.status(200).send();
})

app.post('/Scenario3/ozobot/stop', (req, res) => {
    wsc.send(JSON.stringify({
        "Ozobot": "stop"
    }));
    res.status(200).send();
})



app.post('/Scenario3/mirobot1/Pick_Box', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {

        //wsc.send(JSON.stringify({
        //    "Action": "auto",
        //    "Object": "green"
        //}));

        wsc.send(JSON.stringify(req.body));
        res.status(200).send();
    //    console.log(req.body);
    }
})


app.post('/Scenario3/mirobot2/Pick_Box', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {

        //wsc.send(JSON.stringify({
        //    "Action": "auto",
        //    "Object": "green"
        //}));

        wsc.send(JSON.stringify(req.body));
        res.status(200).send();
        //    console.log(req.body);
    }
})



app.post('/Scenario3/mirobot3/Pick_Box', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {

        //wsc.send(JSON.stringify({
        //    "Action": "auto",
        //    "Object": "green"
        //}));

        wsc.send(JSON.stringify(req.body));
        res.status(200).send();
        //    console.log(req.body);
    }
})

app.post('/Scenario2/mirobot/Pick_Box', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {

        //wsc.send(JSON.stringify({
        //    "Action": "auto",
        //    "Object": "green"
        //}));

        wsc.send(JSON.stringify(req.body));
        res.status(200).send();
        //    console.log(req.body);
    }
})


app.get('/Scenario1/signal_lights/red', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {

        wsc.send(JSON.stringify(req.body));
        waitForData(() => incomingData != null)
        res.status(200).send(incomingData);
        incomingData = null
    }
})

app.get('/Scenario1/signal_lights/green', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        incomingData = null
        wsc.send(JSON.stringify(req.body));
        waitForData(() => incomingData != null)
        res.status(200).send(incomingData);
        incomingData = null
    }
})

app.get('/Scenario1/signal_lights/yellow', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        incomingData = null
        wsc.send(JSON.stringify(req.body));
        waitForData(() => incomingData != null)
        res.status(200).send(incomingData);
        incomingData = null
    }
})


app.get('/Scenario2/signal_lights/red', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {

        wsc.send(JSON.stringify(req.body));
        waitForData(() => incomingData != null)
        res.status(200).send(incomingData);
        incomingData = null
    }
})

app.get('/Scenario2/signal_lights/green', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {

        wsc.send(JSON.stringify(req.body));
        waitForData(() => incomingData != null)
        res.status(200).send(incomingData);
        incomingData = null
    }
})

app.get('/Scenario2/signal_lights/yellow', (req, res) => {

    if (isrobotRuning == true) {
        res.status(418).send();
    } else {
        incomingData = null
        wsc.send(JSON.stringify(req.body));
        waitForData(() => incomingData != null)
        res.status(200).send(incomingData);
        incomingData = null
    }
})