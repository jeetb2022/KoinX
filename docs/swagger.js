import swaggerAutogen from 'swagger-autogen';
import msg from '../utils/lang/messages';

const options = {
  openapi: 'OpenAPI 3',
  language: 'en-US',
  disableLogs: false,
  autoHeaders: false,
  autoQuery: false,
  autoBody: false
};

const doc = {
  info: {
    version: '2.0.0',
    title: 'CloudAgent Apis',
    description: 'API for Managing queue calls',
    contact: {
      name: 'API Support',
      email: 'rajputankit22@gmail.com'
    }
  },
  host: 'http://ec2-34-234-82-27.compute-1.amazonaws.com:8000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Queue CRUD',
      description: 'Queue related apis'
    },
    {
      name: 'Health',
      description: 'Health Check'
    }
  ],
  securityDefinitions: {},
  definitions: {
    helathResponse: {
      code: msg.response.CAG001.code,
      message: msg.response.CAG001.message,
    },
    'errorResponse.400': {
      code: msg.response.CAGE002.code,
      message: msg.response.CAGE002.message,
    },
    'errorResponse.403': {
      code: msg.response.CAGE001.code,
      message: msg.response.CAGE001.message,
    },
    'errorResponse.404': {
      code: '404',
      message: 'Not found',
    },
    'errorResponse.500': {
      code: msg.response.CAGE003.code,
      message: msg.response.CAGE003.message,
    }
  }
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./app.js', './controllers/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

// If you use the express Router, you must pass in the 'endpointsFiles'
// only the root file where the route starts, such as: index.js, app.js, routes.js, ...
// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//   require('./index.js'); // Your project's root file
// });
