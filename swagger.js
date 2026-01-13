const YAML = require('yamljs');
const path = require('path');

// Load the OpenAPI YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'openapi.yaml'));

module.exports = swaggerDocument;
