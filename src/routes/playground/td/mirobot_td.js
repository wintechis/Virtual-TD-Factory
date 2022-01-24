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
    properties: {
      speed: {
        type: "integer",
        unit: "degree per second",
        minimum: 500,
        maximum: 5000,
        forms: [
          {
            op: "writeproperty",
            href: baseUrl + "/speed",
            "htv:methodName": "PUT",
            contentType: "application/json",
          },
          {
            op: "readproperty",
            href: baseUrl + "/speed",
            "htv:methodName": "GET",
            contentType: "application/json",
          },
        ],
      },
    },
    actions: {
      pick_box: {
        input: {
          type: "object",
          properties: {
            color: {
              type: "string",
              enum: ["red", "green", "blue", "yellow"],
            },
            required: ["color"],
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
      rotate_joint: {
        input: {
          type: "object",
          properties: {
            joint: {
              type: "string",
              enum: [
                "Joint1",
                "Joint2",
                "Joint3",
                "Joint4",
                "Joint5",
                "Joint6",
              ],
            },
            direction: {
              type: "string",
              enum: ["plus", "minus"],
            },
            required: ["joint_number", "direction"],
          },
        },
        forms: [
          {
            op: "invokeaction",
            href: baseUrl + "/rotate_joint",
            "htv:methodName": "POST",
            contentType: "application/json",
          },
        ],
      },
    },
  };
};
