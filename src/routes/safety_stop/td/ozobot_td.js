module.exports = (baseUrl) => {
  return {
    " @context": "https://www.w3.org/2019/wot/td/v1",
    title: "Ozobot",
    base: "http://localhost:3000",
    securityDefinitions: {
      nosec_sc: {
        scheme: "nosec",
      },
    },
    security: "nosec_sc",
    properties: {},
    actions: {},
    events: {},
    forms: [],
  };
};
