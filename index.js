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

app.use(cors());
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));
app.use(express.static('Webgl'));

var AllStatus;



/////// ------- serving html/webgl -------/////
server.listen(3000, function () {
    console.log('listening on *:3000');
});



//////-------Websocket Server for communicating Setup------------//// 

const wss = new wsunity.Server({ port: 8080 }, () => {
    console.log('websocket server online');
});

wss.on('close', function close() {
});

wss.on('connection', function connection(ws) {
    ws.on('message', function status_update(data) {
        //console.log("recevied data: " + data)
        AllStatus = data
        //console.log('Mirobot id:' + JSON.parse(AllStatus).Mirobot[0].id);
        //console.log('ozobo led:' + JSON.parse(AllStatus).Ozobot[0].LED0);
        //console.log('ozobo led:' + JSON.parse(AllStatus).Ozobot[0].LED0[0]);
        //console.log('ozobo led:' + JSON.parse(AllStatus).Signallight[0].yellow);

    });
});

wss.on('listening', () => {
    console.log("listening");
});




///////////--------------TD Implementation ---------------/////////////

app.post('/Actions/test', (req, res) => {

    console.log(req.body);
    wsc.send(JSON.stringify(req.body));
    res.status(200).send();
})


/////////////-------------------SC1-----------------------///////////////
app.post('/Scenario1/Mirobot/Pick_Green', (req, res) => {

    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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

    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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

    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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

    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send();
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send();
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send();
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send();
    } else {
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
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send();
    } else {
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


app.post('/Scenario1/signal_lights/interval', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario1/signal_lights/on', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario1/signal_lights/off', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario1/signal_lights/red', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario1/signal_lights/green', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})






////////////////-------------------SC 2 ------------------------////////////////////
app.post('/Scenario2/mirobot/Pick_Box', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[1].Mirobot_status == true) {
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


app.post('/Scenario2/signal_lights/interval', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario2/signal_lights/on', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario2/signal_lights/off', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario2/signal_lights/red', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario2/signal_lights/green', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})




////////////////-------------------SC 3 ------------------------////////////////////

app.post('/Scenario3/ozobot/followline', (req, res) => {
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
    if (JSON.parse(AllStatus).Mirobot[2].Mirobot_status == true) {
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


app.post('/Scenario3/mirobot2/Pick_Box', (req, res) => {

    if (JSON.parse(AllStatus).Mirobot[3].Mirobot_status == true) {
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



app.post('/Scenario3/mirobot3/Pick_Box', (req, res) => {

    if (JSON.parse(AllStatus).Mirobot[4].Mirobot_status == true) {
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

app.post('/Scenario3/signal_lights_1/interval', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_1/on', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_1/off', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_1/red', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_1/green', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})



app.post('/Scenario3/signal_lights_2/interval', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_2/on', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_2/off', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_2/red', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_2/green', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/Scenario3/signal_lights_3/interval', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_3/on', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_3/off', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_3/red', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/Scenario3/signal_lights_3/green', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})





app.get('/get_All_status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus));
})


app.get('/Scenario1/signal_lights/yellow', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[0].yellow.toString());
})


app.get('/Scenario1/signal_lights/red', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[0].red.toString());
})

app.get('/Scenario1/signal_lights/green', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[0].green.toString());
})

app.get('/Scenario1/signal_lights/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[0].Signallight_status.toString());
})



app.get('/Scenario2/signal_lights/yellow', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[1].yellow.toString());
})


app.get('/Scenario2/signal_lights/red', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[1].red.toString());
})

app.get('/Scenario2/signal_lights/green', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[1].green.toString());
})

app.get('/Scenario2/signal_lights/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[1].Signallight_status.toString());
})


app.get('/Scenario3/signal_lights_1/yellow', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[3].yellow.toString());
})


app.get('/Scenario3/signal_lights_1/red', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[3].red.toString());
})

app.get('/Scenario3/signal_lights_1/green', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[3].green.toString());
})

app.get('/Scenario3/signal_lights_1/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[3].Signallight_status.toString());
})




app.get('/Scenario3/signal_lights_2/yellow', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].yellow.toString());
})


app.get('/Scenario3/signal_lights_2/red', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].red.toString());
})

app.get('/Scenario3/signal_lights_2/green', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].green.toString());
})

app.get('/Scenario3/signal_lights_2/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].Signallight_status.toString());
})



app.get('/Scenario3/signal_lights_3/yellow', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].yellow.toString());
})


app.get('/Scenario3/signal_lights_3/red', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].red.toString());
})

app.get('/Scenario3/signal_lights_3/green', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].green.toString());
})

app.get('/Scenario3/signal_lights_3/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].Signallight_status.toString());
})



app.get('/Scenario3/ozobot_1/LED0', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[0].LED0.toString());
})

app.get('/Scenario3/ozobot_1/LED1', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[0].LED1.toString());
})

app.get('/Scenario3/ozobot_1/LED2', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[0].LED2.toString());
})

app.get('/Scenario3/ozobot_1/LED3', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[0].LED3.toString());
})

app.get('/Scenario3/ozobot_1/LED4', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[0].LED4.toString());
})



app.get('/Scenario1/mirobot/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Mirobot[0].Mirobot_status.toString());
})

app.get('/Scenario2/mirobot/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Mirobot[1].Mirobot_status.toString());
})

app.get('/Scenario3/mirobot1/LED2', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Mirobot[2].Mirobot_status.toString());
})

app.get('/Scenario3/mirobot2/LED3', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Mirobot[3].Mirobot_status.toString());
})

app.get('/Scenario3/mirobot3/LED4', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Mirobot[4].Mirobot_status.toString());
})

