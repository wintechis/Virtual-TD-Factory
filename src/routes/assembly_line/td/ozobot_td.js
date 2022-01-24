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
    properties: {},
    actions: {
      move: {
        input: {
          type: "object",
          properties: {
            direction: {
              type: "string",
              enum: ["forward", "backward", "left", "right"],
            },
            required: ["direction"],
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
    events: {},
    forms: [],
  };
};
