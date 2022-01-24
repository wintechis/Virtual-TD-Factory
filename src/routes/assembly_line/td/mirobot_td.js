module.exports = (baseUrl) => {
  return {
    "@context": ["https://www.w3.org/2019/wot/td/v1"],
    title: "Virtual WLKata Mirobot",
    base: "http://localhost:3000",
    securityDefinitions: {
      nosec_sc: {
        scheme: "nosec",
      },
    },
    security: "nosec_sc",
    properties: {},
    actions: {
      pick_box: {
        input: {
          type: "object",
          properties: {
            robot: {
              type: "string",
              enum: ["robot 1", "robot 2", "robot 3"],
            },
            color: {
              type: "string",
              enum: ["red", "green", "blue", "yellow"],
            },
            required: ["robot", "color"],
          },
        },
        forms: [
          {
            op: "invokeaction",
            href: baseUrl + "/pick_box",
            "htv:methodName": "POST",
            contentType: "application/json",
          },
        ],
      },
    },
  };
};
