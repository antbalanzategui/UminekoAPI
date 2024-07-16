const express = require('express');
const router = express.Router();
const db = require('../db/statementsDB');
const statementsSchemas = require('../utils/schemas/statementsSchemas');
const statementsSchema = statementsSchemas.statementsSchema;
const paramConverter = require('../utils/paramConverter');
const convertToInt = paramConverter.convertToInt;
const queryHandler = require('../utils/queryHandler');
const handleQuery = queryHandler.handleQuery;
const statementsSchemaQuery = statementsSchemas.statementsSchemaQuery;

const checkApiKey = require('../middleware/apiKeyMiddleware');

router.use(checkApiKey('statements'));


router.get('/id=:id?', async (req, res, next) => {

    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing "id" parameter. Please include an "id" parameter in the request URL.' })
    }
    req.params.id = parseInt(req.params.id);
    await handleQuery(req, res, next, db.statementsById.bind(null, req.params.id), req.params, statementsSchema);
  });

  router.get('/type=:type?', async(req, res, next) => {
    if (!req.params.type) {
      return res.status(400).json({ error: 'Missing "type" parameter. Please include an "type" parameter in the request URL.' })
    }
    await handleQuery(req, res, next, db.statementsByType.bind(null, req.params.type), req.params, statementsSchema);
  });


  router.get('/episode=:episode?', async (req, res, next) => {
    if (!req.params.episode) {
        return res.status(400).json({ error: 'Missing "episode" parameter. Please include an "episode" parameter in the request URL.' })
      }
      req.params.episode = parseInt(req.params.episode);
      await handleQuery(req, res, next, db.statementsByEpisode.bind(null, req.params.episode), req.params, statementsSchema);
  });


  router.get('/', convertToInt, async (req, res, next) => {
    await handleQuery(req, res, next, db.statementsByQuery, req.query, statementsSchemaQuery);
  });






module.exports = router;