const express = require('express');
const router = express.Router();
const db = require('../db');
const queryValidator = require('../utils/queryValidator');
querySchema = queryValidator.querySchema;
validateQuery = queryValidator.validateQuery;

const convertToInt = (req, res, next) => {
  if (req.query.id) {
    req.query.id = parseInt(req.query.id);
  }
  if (req.query.birthMonth) {
    req.query.birthMonth = parseInt(req.query.birthMonth);
  }
  next();
};
// KEEP IN MIND THE yOU MUST HAVE THE QUESTION MARK HERE TO COVER THE CASE OF = ''
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