
const express = require('express');
const router = express.Router();
const db = require('../db/episodeDB');
const episodeSchemas = require('../utils/schemas/episodeSchemas');
const episodeSchema = episodeSchemas.episodeSchema;
const paramConverter = require('../utils/paramConverter');
const convertToInt = paramConverter.convertToInt;
const queryHandler = require('../utils/queryHandler');
const handleQuery = queryHandler.handleQuery;
const episodeSchemaQuery = episodeSchemas.episodeSchemaQuery;
const checkApiKey = require('../middleware/apiKeyMiddleware');

router.use(checkApiKey('episodes'));

router.get('/id=:id?', async (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing "id" parameter. Please include an "id" parameter in the request URL.' })
    }
    req.params.id = parseInt(req.params.id);
    await handleQuery(req, res, next, db.episodeById.bind(null, req.params.id), req.params, episodeSchema);
});

router.get('/type=:type?', async(req, res, next) => {
    if (!req.params.type) {
      return res.status(400).json({ error: 'Missing "type" parameter. Please include an "type" parameter in the request URL.' })
    }
    await handleQuery(req, res, next, db.episodeByType.bind(null, req.params.type), req.params, episodeSchema);
});

router.get('/', convertToInt, async (req, res, next) => {
    await handleQuery(req, res, next, db.episodeByQuery, req.query, episodeSchemaQuery);
});

  



module.exports = router;