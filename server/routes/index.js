const express = require('express');
const router = express.Router();
const db = require('../db');
const queryValidator = require('../utils/queryValidator');
querySchema = queryValidator.querySchema;
validateQuery = queryValidator.validateQuery;

// This file contains essentially everything 
// related to the MiddleWare for Express
// Currently only consists of get requests
// Plan to potentially create a register system for a key
// which would require a post middleware route


// This is a function which converts the id parameter within the query
// or the birthMonth parameter within the query to integer
// the reason this is done is to easily evaluate inequalities with the parameter
const convertToInt = (req, res, next) => {
  if (req.query.id) {
    req.query.id = parseInt(req.query.id);
  }
  if (req.query.birthMonth) {
    req.query.birthMonth = parseInt(req.query.birthMonth);
  }
  next();
};
// MiddleWare for the /id, utilizes querySchema (check utils for more info)
router.get('/id=:id?', async (req, res, next) => {

  if (!req.params.id) {
    return res.status(400).json({ error: 'Missing "id" parameter. Please include an "id" parameter in the request URL.' })
  }
  req.params.id = parseInt(req.params.id);
  const errors = validateQuery(req.params);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  try{
      let results = await db.characterById(req.params.id);
      res.json(results);
  } catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});
// MiddleWare for the /name, utilizes querySchema
router.get('/name=:name?', async(req, res, next) => {
  if (!req.params.name) {
    return res.status(400).json({ error: 'Missing "name" parameter. Please include an "name" parameter in the request URL.' })
  }
  const errors = validateQuery(req.params);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  try {
      let results = await db.characterByName(req.params.name)
      res.json(results);
  } catch (e) {
      console.log(e);
      res.sendStatus(500);
  }
});
// MiddleWare for the /gender, utilizes querySchema
router.get('/gender=:gender?', async(req, res, next) => {
  if (!req.params.gender) {
    return res.status(400).json({ error: 'Missing "gender" parameter. Please include an "gender" parameter in the request URL.' })
  }
  const errors = validateQuery(req.params);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  try {
    let results = await db.characterByGender(req.params.gender)
    res.json(results);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});
// MiddleWare for the /birthMonth, utilizes querySchema
router.get('/birthMonth=:birthMonth?', async(req, res, next) => {
  if (!req.params.birthMonth) {
    return res.status(400).json({ error: 'Missing "birthMonth" parameter. Please include an "birthMonth" parameter in the request URL.' })
  }
  req.params.birthMonth = parseInt(req.params.birthMonth);
  const errors = validateQuery(req.params);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  try {
      let results = await db.characterByBirthMonth(req.params.birthMonth)
      res.json(results);
  } catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
});


// localhost:3000/api/umineko/characters?name=shi&id=1 // 

// MiddleWare for the query search...
router.get('/', convertToInt, async (req, res, next) => {

    const errors = validateQuery(req.query);

  
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }
  
    try {
      let results = await db.characterByQuery(req.query);
      res.json(results);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
  
  

module.exports = router;