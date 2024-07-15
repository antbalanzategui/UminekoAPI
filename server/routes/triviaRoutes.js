
const express = require('express');
const router = express.Router();
const db = require('../db/triviaDB');
const triviaSchemas = require('../utils/schemas/triviaSchemas');
const triviaSchema = triviaSchemas.triviaSchema;
const paramConverter = require('../utils/paramConverter');
const convertToInt = paramConverter.convertToInt;
const queryHandler = require('../utils/queryHandler');
const handleQuery = queryHandler.handleQuery;
const triviaSchemaQuery = triviaSchemas.triviaSchemaQuery;

const checkApiKey = require('../middleware/apiKeyMiddleware');

router.use(checkApiKey);



router.get('/id=:id?', async (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing "id" parameter. Please include an "id" parameter in the request URL.' })
    }
    req.params.id = parseInt(req.params.id);
    await handleQuery(req, res, next, db.triviaById.bind(null, req.params.id), req.params, triviaSchema);
});

router.get('/name=:name?', async(req, res, next) => {
    if (!req.params.name) {
      return res.status(400).json({ error: 'Missing "name" parameter. Please include an "name" parameter in the request URL.' })
    }
    await handleQuery(req, res, next, db.triviaByName.bind(null, req.params.name), req.params, triviaSchema);
});

router.get('/type=:type?', async(req, res, next) => {
    if (!req.params.type) {
      return res.status(400).json({ error: 'Missing "type" parameter. Please include an "type" parameter in the request URL.' })
    }
    await handleQuery(req, res, next, db.triviaByAssociation.bind(null, req.params.type), req.params, triviaSchema);
});

router.get('/', convertToInt, async (req, res, next) => {
  await handleQuery(req, res, next, db.triviaByQuery, req.query, triviaSchemaQuery);
});
  



module.exports = router;