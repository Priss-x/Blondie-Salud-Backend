
const swaggerJsdoc = require("swagger-jsdoc");

const opciones = {
    definition: {
        openapi: "3.0.0",
        info: {title: "API Centro Médico Blondie-Salud", version: "1.0.0", description: "Documentación de la API REST para la gestión de pacientes, autenticación y agendamientos médicos."},
        servers: [
            {url: "http://localhost:3000", description: "Servidor local"}],
        components: {
            securitySchemes: {
                bearerAuth: {type: "http", scheme: "bearer", bearerFormat: "JWT"}
            }
        }
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(opciones);
module.exports = swaggerSpec;
