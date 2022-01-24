module.exports = (baseUrl) => {
  return {
    "@context": "https://www.w3.org/2019/wot/td/v1",
    title: "Signal lights",
    base: "http://localhost:3000",
    securityDefinitions: {
      nosec_sc: {
        scheme: "nosec",
      },
    },
    security: "nosec_sc",
    properties: {
      on: {
        type: "boolean",
        forms: [
          {
            op: "readproperty",
            href: "/on",
            "htv:methodName": "GET",
          },
          {
            op: "writeproperty",
            href: "/on",
            "htv:methodName": "PUT",
          },
        ],
      },
      red: {
        type: "object",
        properties: {
          value: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          blink: {
            type: "boolean",
          },
        },
        forms: [
          {
            op: "readproperty",
            href: "/red",
            "htv:methodName": "GET",
          },
          {
            op: "writeproperty",
            href: "/red",
            "htv:methodName": "PUT",
          },
        ],
      },
      yellow: {
        type: "object",
        properties: {
          value: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          blink: {
            type: "boolean",
          },
        },
        forms: [
          {
            op: "readproperty",
            href: "/yellow",
            "htv:methodName": "GET",
          },
          {
            op: "writeproperty",
            href: "/yellow",
            "htv:methodName": "PUT",
          },
        ],
      },
      green: {
        type: "object",
        properties: {
          value: {
            type: "integer",
            minimum: 0,
            maximum: 255,
          },
          blink: {
            type: "boolean",
          },
        },
        forms: [
          {
            op: "readproperty",
            href: "/green",
            "htv:methodName": "GET",
          },
          {
            op: "writeproperty",
            href: "/green",
            "htv:methodName": "PUT",
          },
        ],
      },
      interval: {
        type: "integer",
        unit: "milliseconds",
        minimum: 0,
        maximum: 3000,
        forms: [
          {
            op: "readproperty",
            href: "/interval",
            "htv:methodName": "GET",
          },
          {
            op: "writeproperty",
            href: "/interval",
            "htv:methodName": "PUT",
          },
        ],
      },
    },
    forms: [
      {
        op: "readallproperties",
        href: "/status",
        "htv:methodName": "GET",
      },
      {
        op: "writemultipleproperties",
        href: "/update",
        "htv:methodName": "PUT",
      },
    ],
  };
};
