# Installation

* [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Download this repo.
* Install the dependencies listed in package.json by typing ```npm install``` in the root directory.
* Run ```node index.js``` in the root directory to start the server.
* Visit http://localhost:3000.
* Optional: Install [Postman](https://www.postman.com/downloads/) and import Examples.postman_collection.json to see some examples of how to interact with the WebGL App.

# Interacting with WebGL
## Getting properties and statuses from WebGL
The status of all the things in Webgl is stored and updated as a JSON string line ```AllStatus``` on the server every 0.1 sec. ```ALLStatus``` can be request with a GET method at the URL http://localhost/get_All_status (visit http://localhost/get_All_status or send GET Request using Postman). 

Prase ```AllStatus``` to retrieve the status of a specific thing in the WebGL, for examples:
```
console.log('Mirobot id:' + JSON.parse(AllStatus).Mirobot[0].id);
console.log('ozobo led RGB values:' + JSON.parse(AllStatus).Ozobot[0].LED0);
console.log('ozobo enter mirobot's working area:' + JSON.parse(AllStatus).Barrier[0].collided);
console.log('Signallight yellow intensity:' + JSON.parse(AllStatus).Signallight[0].yellow);
```
Output:
```
Mirobot id:1
ozobo led RGB values:255,255,255
ozobo enter mirobot's working area:false
Signallight yellow intensity:0
```

## Invoking actions in WebGL
Send followed JSON objects with POST methods will invoke the actions of things in WebGL
```
{
    "Mirobot": [           
        {
            "id": 1, // ID of the Mirobot
            "PickBox": "green" //Action picking Box: green, red, yellow or blue
        },
        {
            "id": 2,
            "Joint1_status": 24,   //Action go_to_axis, the maximum/minimum angle value limit function is currently unavailable
            "Joint2_status": 60,   //exceeding the maximum value will prevent the robot arm from stopping
            "Joint3_status": 35,
            "Joint4_status": 55,
            "Joint5_status": 90,
            "Joint6_status": 120  //In this case, key "PickBox" should not be present.
            }
    ],
    "Signallight": [
        {
            "id": 2,  // ID of the Signallight
            "Signallight_status": true,  // turn on: true, turn off: false
            "red": 0,  //Intensity of the red light
            "green": 255, // Intensity of the green light
            "yellow": 0, // Intensity of the yellow light, currently unavailable.
            "interval": 0.20000000298023224,  //Blink interval, second
            "blink": true //Blink on: true, Blink off: false
        }
    ],
    "Ozobot": [   
        {
            "id": 1,  //ID of the Ozobot. ID:3, 4, 5 Ozobots are temporarily unavailable.
            "LED0": [  // RGB values of each LED.
                12,
                123,
                255
            ],
            "LED1": [
                123,
                255,
                23
            ],
            "LED2": [
                255,
                255,
                255
            ],
            "LED3": [
                255,
                255,
                255
            ],
            "LED4": [
                255,
                123,
                23
            ],
            "Speed": 12 // Movement speed of Ozobot.
        }
    ]
}
```


More examples can be found in the Postman collection.

# Other Features
Use WASD and the right mouse button to move the camera. Press "Reset" to reset the unity scene. Scenario customization demo: press "R" to duplicate a new Mirobot module to the right of Mirobot Nr.17. The duplicated Mirobot module has the same TD implementation and can also be interacted with using the same JSON format and it's ID.
