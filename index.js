const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
//const io = new Server(server);
const wsunity = require("ws");
const wsclient = require("ws");
const bodyPraser = require("body-parser");

app.use(cors());
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));
app.use(express.static('Webgl'));




//////-------Websocket Setup------------//// 
const wss = new wsunity.Server({ port: 8080 }, () => {
    console.log('websocket server online');
});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(data.toString());
                client.send("boardcast");
            }
        });
    });
});

wss.on('listening', () => {
    console.log("listening");
});

const wsc = new wsclient('ws://localhost:8080/');  //Using an additional websocket client as a "trigger" to tell the websocket server to send the message to all clients except the trigger, since I have not yet found a way to let websocket-server actively send the message to the clients.
wsc.on('open', function open() {
    wsc.send('trigger socket oppened');
});
wsc.on('message', function incoming(message) {
    console.log('websocket client trigger received: %s', message);
});




//io.on("connection", socket => {

//    console.log(socket.id)
//    socket.on("chat", (obj) => {
//        console.log(obj)
//    })
//})

//io.on('connection', (socket) => {
//    console.log(socket.id + ' user connected');
//});



/////// ------- serving html/webgl -------/////
server.listen(3000, () => {
    console.log('listening on *:3000');
});




app.post('/Websockettest', (req, res) => {
    wsc.send(JSON.stringify(req.body));
    //io.emit("chat", "hi from nodejs");
    res.status(200).send();
})


app.post('/Pick_Green', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "auto",
        "Object": "green",
        "Speed": "3000",
        "Step": "10"
    }));
    res.status(200).send();
})

app.post('/Pick_Green', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "auto",
        "Object": "green",
        "Speed": "3000",
        "Step": "10"
    }));
    res.status(200).send();
})

app.post('/Pick_Yellow', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "auto",
        "Object": "yellow",
        "Speed": "3000",
        "Step": "10"
    }));
    res.status(200).send();
})

app.post('/Pick_Red', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "auto",
        "Object": "red",
        "Speed": "3000",
        "Step": "10"
    }));
    res.status(200).send();
})

app.post('/Pick_Blue', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "auto",
        "Object": "blue",
        "Speed": "3000",
        "Step": "10"
    }));
    res.status(200).send();
})

app.post('/J1plus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint1": "+",
        }
    }));
    res.status(200).send();
})

app.post('/J1minus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint1": "-",
        }
    }));
    res.status(200).send();
})

app.post('/J2plus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint2": "+",
        }
    }));
    res.status(200).send();
})

app.post('/J2minus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint2": "-",
        }
    }));
    res.status(200).send();
})

app.post('/J3plus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint3": "+",
        }
    }));
    res.status(200).send();
})

app.post('/J3minus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint3": "-",
        }
    }));
    res.status(200).send();
})

app.post('/J4plus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint4": "+",
        }
    }));
    res.status(200).send();
})

app.post('/J4minus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint4": "-",
        }
    }));
    res.status(200).send();
})

app.post('/J5plus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint5": "+",
        }
    }));
    res.status(200).send();
})

app.post('/J5minus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint5": "-",
        }
    }));
    res.status(200).send();
})

app.post('/J6plus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint6": "+",
        }
    }));
    res.status(200).send();
})

app.post('/J6minus', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "manuel",
        "Joint": {
            "Joint6": "-",
        }
    }));
    res.status(200).send();
})

app.post('/Speedplus500', (req, res) => {
    wsc.send(JSON.stringify({
        "Speed": "+500"
        
    }));
    res.status(200).send();
})

app.post('/Speedminus500', (req, res) => {
    wsc.send(JSON.stringify({
        "Speed": "-500"

    }));
    res.status(200).send();
})

app.post('/Speedplus200', (req, res) => {
    wsc.send(JSON.stringify({
        "Speed": "+200"

    }));
    res.status(200).send();
})

app.post('/Speedminus200', (req, res) => {
    wsc.send(JSON.stringify({
        "Speed": "-200"

    }));
    res.status(200).send();
})

app.post('/Stepplus5', (req, res) => {
    wsc.send(JSON.stringify({
        "Step": "+5"

    }));
    res.status(200).send();
})

app.post('/Stepminus5', (req, res) => {
    wsc.send(JSON.stringify({
        "Step": "-5"

    }));
    res.status(200).send();
})

app.post('/Stepplus2', (req, res) => {
    wsc.send(JSON.stringify({
        "Step": "+2"

    }));
    res.status(200).send();
})

app.post('/Stepminus2', (req, res) => {
    wsc.send(JSON.stringify({
        "Step": "-2"

    }));
    res.status(200).send();
})

app.post('/grabObject', (req, res) => {
    wsc.send(JSON.stringify({
        "Action": "grab"
    }));
    res.status(200).send();
})
