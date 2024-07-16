
const express = require('express');
const router = express.Router();
const db = require('../db/informationDB');
const informationSchemas = require('../utils/schemas/informationSchemas');
const informationSchema = informationSchemas.informationSchema;
const paramConverter = require('../utils/paramConverter');
const convertToInt = paramConverter.convertToInt;
const queryHandler = require('../utils/queryHandler');
const handleQuery = queryHandler.handleQuery;
const informationSchemaQuery = informationSchemas.informationSchemaQuery;

const checkApiKey = require('../middleware/apiKeyMiddleware');

router.use(checkApiKey('information'));


router.get('/id=:id?', async (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing "id" parameter. Please include an "id" parameter in the request URL.' })
    }
    req.params.id = parseInt(req.params.id);
    await handleQuery(req, res, next, db.informationById.bind(null, req.params.id), req.params, informationSchema);
});


router.get('/name=:name?', async(req, res, next) => {
    if (!req.params.name) {
      return res.status(400).json({ error: 'Missing "name" parameter. Please include an "name" parameter in the request URL.' })
    }
    await handleQuery(req, res, next, db.informationByName.bind(null, req.params.name), req.params, informationSchema);
});

router.get('/type=:type?', async(req, res, next) => {
    if (!req.params.type) {
      return res.status(400).json({ error: 'Missing "type" parameter. Please include an "type" parameter in the request URL.' })
    }
    await handleQuery(req, res, next, db.informationByType.bind(null, req.params.type), req.params, informationSchema);
});

router.get('/', convertToInt, async (req, res, next) => {
    await handleQuery(req, res, next, db.informationByQuery, req.query, informationSchemaQuery);
  });



module.exports = router;