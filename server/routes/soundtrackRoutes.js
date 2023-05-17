const express = require('express');
const router = express.Router();
const db = require('../db/soundtrackDB');
const queryValidator = require('../utils/queryValidator');
soundTrackSchema = queryValidator.soundTrackSchema;
validateQuery = queryValidator.validateQuery;

router.get('/id=:id?', async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ error: 'Missing "id" parameter. Please include an "id" parameter in the request URL.' })
      }
      req.params.id = parseInt(req.params.id);
      const errors = validateQuery(req.params, soundTrackSchema);
    
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }
      try{
          let results = await db.soundtrackById(req.params.id);
          res.json(results);
      } catch(e) {
          console.log(e);
          res.sendStatus(500);
      }
  });

router.get('/title=:title?', async (req, res, next) => {
    if (!req.params.title) {
        return res.status(400).json({ error: 'Missing "title" parameter. Please include an "title" parameter in the request URL.' })
      }
      const errors = validateQuery(req.params, soundTrackSchema);
    
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }
    
      try {
          let results = await db.soundtrackByTitle(req.params.title)
          res.json(results);
      } catch (e) {
          console.log(e);
          res.sendStatus(500);
      }
});

router.get('/composer=:composer?', async (req, res, next) => {
    if (!req.params.composer) {
        return res.status(400).json({ error: 'Missing "composer" parameter. Please include an "composer" parameter in the request URL.' })
      }
      const errors = validateQuery(req.params, soundTrackSchema);
    
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }
    
      try {
          let results = await db.soundtrackByComposer(req.params.composer)
          res.json(results);
      } catch (e) {
          console.log(e);
          res.sendStatus(500);
      }
});



  module.exports = router;