exports.options = {
  routePrefix: "/doc",
  exposeRoute: true,
  openapi: {
    info: {
      title: "MS",
      description: "Swagger API",
      version: "1.0.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost:1111",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    components: {
      securitySchemes: {
        basicAuth: {
          type: 'http' || 'https',
          scheme: 'basic'
        }
      }
    },
    security: [{
      basicAuth: []
    }]
  },

};