const swaggerJSDoc = require("swagger-jsdoc");

// Definição das opções do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Gateway CRM Omie",
      version: "1.0.0",
      description: "API de integração com Omie",
      contact: {
        name: "Suporte API",
      },
      servers: [
        {
          url: "http://localhost:4000",
        },
      ],
    },
  },
  // Caminho para os arquivos que contêm as anotações Swagger para documentar as rotas
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
