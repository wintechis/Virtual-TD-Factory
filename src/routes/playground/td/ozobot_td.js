module.exports = (baseUrl) => {
  return {
    " @context": "https://www.w3.org/2019/wot/td/v1",
    title: "Ozobot",
    base: "http://localhost:3000",
    modified: "2021-11-12T17:00:00.000Z",
    securityDefinitions: {
      nosec_sc: {
        scheme: "nosec",
      },
    },
    security: "nosec_sc",
    properties: {
      speed: {
        type: "integer",
        minimum: 15,
        maximum: 85,
        unit: "mm/s",
        forms: [
          {
            op: "readproperty",
            href: baseUrl + "/speed",
            "htv:methodName": "GET",
            contentType: "application/json",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/speed",
            "htv:methodName": "PUT",
            contentType: "application/json",
          },
        ],
      },
      intersection_default: {
        type: "string",
        enum: ["stop", "left", "right", "straight", "back"],
        forms: [
          {
            op: "readproperty",
            href: baseUrl + "/intersection_default",
            "htv:methodName": "GET",
            contentType: "application/json",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/intersection_default",
            "htv:methodName": "PUT",
            contentType: "application/json",
          },
        ],
      },
      led0: {
        description: "head led on top of the ozobot",
        type: "object",
        properties: {
          red: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          green: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          blue: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          alpha: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
        },
        forms: [
          {
            op: "readproperty",
            href: baseUrl + "/led0",
            "htv:methodName": "GET",
            contentType: "application/json",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/led0",
            "htv:methodName": "PUT",
            contentType: "application/json",
          },
        ],
      },
      led1: {
        description: "1st front led fltr",
        type: "object",
        properties: {
          red: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          green: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          blue: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          alpha: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
        },
        forms: [
          {
            op: "readproperty",
            href: baseUrl + "/led1",
            "htv:methodName": "GET",
            contentType: "application/json",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/led1",
            "htv:methodName": "PUT",
            contentType: "application/json",
          },
        ],
      },
      led2: {
        description: "2st front led fltr",
        type: "object",
        properties: {
          red: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          green: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          blue: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          alpha: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
        },
        forms: [
          {
            op: "readproperty",
            href: baseUrl + "/led2",
            "htv:methodName": "GET",
            contentType: "application/json",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/led2",
            "htv:methodName": "PUT",
            contentType: "application/json",
          },
        ],
      },
      led3: {
        description: "3st front led fltr",
        type: "object",
        properties: {
          red: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          green: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          blue: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          alpha: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
        },
        forms: [
          {
            op: "readproperty",
            href: baseUrl + "/led3",
            "htv:methodName": "GET",
            contentType: "application/json",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/led3",
            "htv:methodName": "PUT",
            contentType: "application/json",
          },
        ],
      },
      led4: {
        description: "4st front led fltr",
        type: "object",
        properties: {
          red: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          green: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          blue: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          alpha: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
        },
        forms: [
          {
            op: "readproperty",
            href: baseUrl + "/led4",
            "htv:methodName": "GET",
            contentType: "application/json",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/led4",
            "htv:methodName": "PUT",
            contentType: "application/json",
          },
        ],
      },
    },
    actions: {
      move: {
        input: {
          type: "object",
          properties: {
            distance: {
              type: "integer",
              minimum: -300,
              maximum: 300,
              unit: "mm",
            },
          },
        },
        forms: [
          {
            op: "invokeaction",
            href: baseUrl + "/move",
            "htv:methodName": "POST",
            contentType: "application/json",
          },
        ],
      },
      rotate: {
        input: {
          type: "object",
          properties: {
            angle: {
              type: "integer",
              minimum: -360,
              maximum: 360,
              unit: "degree",
            },
          },
        },
        forms: [
          {
            op: "invokeaction",
            href: baseUrl + "/rotate",
            "htv:methodName": "POST",
            contentType: "application/json",
          },
        ],
      },
      follow_line: {
        forms: [
          {
            op: "invokeaction",
            href: baseUrl + "/follow_line",
            "htv:methodName": "POST",
            contentType: "application/json",
          },
        ],
      },
      stop: {
        forms: [
          {
            op: "invokeaction",
            href: baseUrl + "/stop",
            "htv:methodName": "POST",
            contentType: "application/json",
          },
        ],
      },
    },
    events: {
      detect_intersection: {
        description:
          "informs about the moving options of encountered intersection",
        data: {
          type: "object",
          properties: {
            left: {
              type: "boolean",
            },
            right: {
              type: "boolean",
            },
            straight: {
              type: "boolean",
            },
            back: {
              type: "boolean",
            },
          },
        },
        forms: [
          {
            op: "subscribeevent",
            href: baseUrl + "/subscribe",
            contentType: "application/json",
            subprotocol: "longpoll",
          },
          {
            op: "unsubscribeevent",
            contentType: "application/json",
            href: baseUrl + "/unsubscribe",
            subprotocol: "longpoll",
          },
        ],
      },
    },
    forms: [
      {
        op: "readmultipleproperties",
        href: baseUrl + "/leds",
        "htv:methodName": "GET",
        contentType: "application/json",
      },
    ],
  };
};
