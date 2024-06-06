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


router.get('/id=:id?', async (req, res, next) => {

    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing "id" parameter. Please include an "id" parameter in the request URL.' })
    }
    req.params.id = parseInt(req.params.id);
    await handleQuery(req, res, next, db.statementsById.bind(null, req.params.id), req.params, statementsSchema);
  });



module.exports = router;