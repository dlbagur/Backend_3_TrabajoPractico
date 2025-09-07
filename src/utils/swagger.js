import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Adopt-me API',
      version: '1.0.0',
      description: 'Documentación de la API del proyecto Adopt-me',
    },
  },
  apis: [
    './src/routes/*.js',
    './src/routes/**/*.js'
  ],
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);
export { swaggerUi };
