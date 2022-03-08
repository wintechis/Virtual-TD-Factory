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
const bodyPraser = require("body-parser");
//const { stat } = require('fs');

app.use(cors());
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));
app.use(express.static('Webgl1280720'));

/// status of all the things in Webgl will be updated as a string line ALLStatus every 0.3 sec////
var AllStatus;


server.listen(3000, function () {
    console.log('listening on *:3000');
});


const wss = new wsunity.Server({ port: 3008 }, () => {
    console.log('websocket server online');
});

wss.on('close', function close() {
});

wss.on('connection', function connection(ws) {
    ws.on('message', function status_update(data) {
        AllStatus = data
        /// Some Example ///////
        //console.log('Mirobot id:' + JSON.parse(AllStatus).Mirobot[0].id);
        //console.log('ozobo led:' + JSON.parse(AllStatus).Ozobot[0].LED0);
        //console.log('ozobo led:' + JSON.parse(AllStatus).Ozobot[0].LED0[0]);
        //console.log('ozobo led:' + JSON.parse(AllStatus).Signallight[0].yellow);
    });
});

wss.on('listening', () => {
    console.log("listening");
});




app.post('/one-for-all', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/1/mirobot/pick_green', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/1/mirobot/pick_yellow', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/1/mirobot/pick_red', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/1/mirobot/pick_blue', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/1/mirobot/go_to_axis', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[0].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/1/signal_lights/interval', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/1/signal_lights/on', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/1/signal_lights/off', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/1/signal_lights/red', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/1/signal_lights/green', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/1/ozobot/speed', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/1/ozobot/led0', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/1/ozobot/led1', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/1/ozobot/led2', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/1/ozobot/led3', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/1/ozobot/led4', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/2/mirobot/pick_green', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[1].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/2/mirobot/pick_yellow', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[1].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/2/mirobot/pick_red', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[1].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/2/mirobot/pick_blue', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[1].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/2/mirobot/go_to_axis', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[1].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})


app.post('/2/signal_lights/interval', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/2/signal_lights/on', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/2/signal_lights/off', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/2/signal_lights/red', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/2/signal_lights/green', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/2/ozobot/speed', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})
app.post('/2/ozobot/led0', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/2/ozobot/led1', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/2/ozobot/led2', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/2/ozobot/led3', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/2/ozobot/led4', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/3/mirobot/pick_green', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[2].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/3/mirobot/pick_yellow', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[2].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/3/mirobot/pick_red', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[2].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/3/mirobot/pick_blue', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[2].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/3/mirobot/go_to_axis', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[2].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/3/signal_lights/interval', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/3/signal_lights/on', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/3/signal_lights/off', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/3/signal_lights/red', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/3/signal_lights/green', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/3/ozobot/speed', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})
app.post('/3/ozobot/led0', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/3/ozobot/led1', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/3/ozobot/led2', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/3/ozobot/led3', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/3/ozobot/led4', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/4/mirobot/pick_green', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[3].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/4/mirobot/pick_yellow', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[3].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/4/mirobot/pick_red', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[3].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/4/mirobot/pick_blue', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[3].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/4/mirobot/go_to_axis', (req, res) => {
    if (JSON.parse(AllStatus).Mirobot[3].Mirobot_status == true) {
        res.status(418).send("Mirobot is moving");
    } else {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wsunity.OPEN) {
                client.send(JSON.stringify(req.body));
            }
        });
        res.status(200).send();
    }
})

app.post('/4/signal_lights/interval', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/4/signal_lights/on', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/4/signal_lights/off', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/4/signal_lights/red', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/4/signal_lights/green', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/4/ozobot/speed', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/4/ozobot/led0', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})

app.post('/4/ozobot/led1', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/4/ozobot/led2', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/4/ozobot/led3', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})


app.post('/4/ozobot/led4', (req, res) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === wsunity.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.status(200).send();
})



/// parse string line AllStatus to get the status////
app.get('/get_All_status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus));
})

app.get('/1/signal_lights/yellow', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[0].yellow.toString());
})


app.get('/1/signal_lights/red', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[0].red.toString());
})

app.get('/1/signal_lights/green', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[0].green.toString());
})

app.get('/1/signal_lights/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[0].Signallight_status.toString());
})


app.get('/1/signal_lights/yellow', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[1].yellow.toString());
})


app.get('/1/signal_lights/red', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[1].red.toString());
})

app.get('/1/signal_lights/green', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[1].green.toString());
})

app.get('/1/signal_lights/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[1].Signallight_status.toString());
})


app.get('/3/signal_lights/yellow', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[3].yellow.toString());
})


app.get('/3/signal_lights/red', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[3].red.toString());
})

app.get('/3/signal_lights/green', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[3].green.toString());
})

app.get('/3/signal_lights/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[3].Signallight_status.toString());
})

app.get('/3/signal_lights/yellow', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].yellow.toString());
})


app.get('/3/signal_lights/red', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].red.toString());
})

app.get('/3/signal_lights/green', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].green.toString());
})

app.get('/3/signal_lights/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].Signallight_status.toString());
})


app.get('/3/signal_lights/yellow', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].yellow.toString());
})


app.get('/3/signal_lights/red', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].red.toString());
})

app.get('/3/signal_lights/green', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].green.toString());
})

app.get('/3/signal_lights/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Signallight[4].Signallight_status.toString());
})

app.get('/1/ozobot/LED0', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[0].LED0.toString());
})

app.get('/1/ozobot/LED1', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[0].LED1.toString());
})

app.get('/1/ozobot/LED2', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[0].LED2.toString());
})

app.get('/1/ozobot/LED3', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[0].LED3.toString());
})

app.get('/1/ozobot/LED4', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[0].LED4.toString());
})

app.get('/1/mirobot/status', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Mirobot[0].Mirobot_status.toString());
})

app.get('/2/ozobot/LED0', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[1].LED0.toString());
})

app.get('/2/ozobot/LED1', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[1].LED1.toString());
})

app.get('/2/ozobot/LED2', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[1].LED2.toString());
})

app.get('/2/ozobot/LED3', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[1].LED3.toString());
})

app.get('/2/ozobot/LED4', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Ozobot[1].LED4.toString());
})


app.get('/1/barrier/collided', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Barrier[0].collided.toString());
})

app.get('/1/barrier/distance', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Barrier[0].distance.toString());
})

app.get('/1/barrier/entertime', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Barrier[0].entertime.toString());
})

app.get('/1/barrier/exittime', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Barrier[0].exittime.toString());
})

app.get('/2/barrier/collided', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Barrier[1].collided.toString());
})

app.get('/2/barrier/distance', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Barrier[1].distance.toString());
})

app.get('/2/barrier/entertime', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Barrier[1].entertime.toString());
})

app.get('/2/barrier/exittime', (req, res) => {
    res.status(200).send(JSON.parse(AllStatus).Barrier[1].exittime.toString());
})