const express = require('express');
const router = express.Router();
const db = require('../db/relationsDB');
const relationsSchemas = require('../utils/schemas/relationsSchemas');
const relationSchema = relationsSchemas.relationsSchema;
const paramConverter = require('../utils/paramConverter');
const convertToInt = paramConverter.convertToInt;
const queryHandler = require('../utils/queryHandler');
const handleQuery = queryHandler.handleQuery;
const relationsSchemaQuery = relationsSchemas.relationsSchemaQuery;



router.get('/id=:id?', async (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing "id" parameter. Please include an "id" parameter in the request URL.' })
    }
    req.params.id = parseInt(req.params.id);
    await handleQuery(req, res, next, db.relationsById.bind(null, req.params.id), req.params, relationSchema);
});


router.get('/name=:name?', async(req, res, next) => {
    if (!req.params.name) {
      return res.status(400).json({ error: 'Missing "name" parameter. Please include an "name" parameter in the request URL.' })
    }
    await handleQuery(req, res, next, db.relationsByName.bind(null, req.params.name), req.params, relationSchema);
});

router.get('/type=:type?', async(req, res, next) => {
    if (!req.params.type) {
      return res.status(400).json({ error: 'Missing "type" parameter. Please include an "type" parameter in the request URL.' })
    }
    await handleQuery(req, res, next, db.relationsByType.bind(null, req.params.type), req.params, relationSchema);
});

router.get('/', convertToInt, async (req, res, next) => {
    await handleQuery(req, res, next, db.relationsByQuery, req.query, relationsSchemaQuery);
  });


module.exports = router;