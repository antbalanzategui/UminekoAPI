const express = require('express');
const router = express.Router();
const db = require('../db/characterDB');
const characterSchemas = require('../utils/schemas/characterSchemas');
const characterSchema = characterSchemas.characterSchema;
const paramConverter = require('../utils/paramConverter');
const convertToInt = paramConverter.convertToInt;
const queryHandler = require('../utils/queryHandler');
const handleQuery = queryHandler.handleQuery;
const characterSchemaQuery = characterSchemas.characterSchemaQuery;


// This file contains essentially everything 
// related to the MiddleWare for Express
// Currently only consists of get requests
// Plan to potentially create a register system for a key
// which would require a post middleware route


// This is a function which converts the id parameter within the query
// or the birthMonth parameter within the query to integer
// the reason this is done is to easily evaluate inequalities with the parameter

// MiddleWare for the /id, utilizes querySchema (check utils for more info)
router.get('/id=:id?', async (req, res, next) => {

  if (!req.params.id) {
    return res.status(400).json({ error: 'Missing "id" parameter. Please include an "id" parameter in the request URL.' })
  }
  req.params.id = parseInt(req.params.id);
  await handleQuery(req, res, next, db.characterById.bind(null, req.params.id), req.params, characterSchema);
});
// MiddleWare for the /name, utilizes querySchema
router.get('/name=:name?', async(req, res, next) => {
  if (!req.params.name) {
    return res.status(400).json({ error: 'Missing "name" parameter. Please include an "name" parameter in the request URL.' })
  }
  await handleQuery(req, res, next, db.characterByName.bind(null, req.params.name), req.params, characterSchema);
});
// MiddleWare for the /gender, utilizes querySchema
router.get('/gender=:gender?', async(req, res, next) => {
  if (!req.params.gender) {
    return res.status(400).json({ error: 'Missing "gender" parameter. Please include an "gender" parameter in the request URL.' })
  }
  await handleQuery(req, res, next, db.characterByGender.bind(null, req.params.gender), req.params, characterSchema);
});
// MiddleWare for the /birthMonth, utilizes querySchema
router.get('/birthMonth=:birthMonth?', async(req, res, next) => {
  if (!req.params.birthMonth) {
    return res.status(400).json({ error: 'Missing "birthMonth" parameter. Please include an "birthMonth" parameter in the request URL.' })
  }
  req.params.birthMonth = parseInt(req.params.birthMonth);
  await handleQuery(req, res, next, db.characterByBirthMonth.bind(null, req.params.birthMonth), req.params, characterSchema);
});


// localhost:3000/api/umineko/characters?name=shi&id=1 // 

// MiddleWare for the query search...
router.get('/', convertToInt, async (req, res, next) => {
  await handleQuery(req, res, next, db.characterByQuery, req.query, characterSchemaQuery);
  });
  
  

module.exports = router;