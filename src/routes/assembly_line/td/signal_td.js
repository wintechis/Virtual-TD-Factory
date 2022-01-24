module.exports = (baseUrl) => {
  return {
    "@context": "https://www.w3.org/2019/wot/td/v1",
    title: "Signal lights",
    base: "http://localhost:3000",
    modified: "2021-11-12T17:00:00.000Z",
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
            href: baseUrl + "/on",
            "htv:methodName": "GET",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/on",
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
            href: baseUrl + "/red",
            "htv:methodName": "GET",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/red",
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
            href: baseUrl + "/yellow",
            "htv:methodName": "GET",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/yellow",
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
            href: baseUrl + "/green",
            "htv:methodName": "GET",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/green",
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
            href: baseUrl + "/interval",
            "htv:methodName": "GET",
          },
          {
            op: "writeproperty",
            href: baseUrl + "/interval",
            "htv:methodName": "PUT",
          },
        ],
      },
    },
    forms: [
      {
        op: "readallproperties",
        href: baseUrl + "/status",
        "htv:methodName": "GET",
      },
      {
        op: "writemultipleproperties",
        href: baseUrl + "/update",
        "htv:methodName": "PUT",
      },
    ],
  };
};
