const express = require('express');
const router = express.Router();
const db = require('../db/soundtrackDB');
const queryValidator = require('../utils/queryValidator');
const soundTrackSchema = queryValidator.soundTrackSchema;
const paramConverter = require('../utils/paramConverter');
const convertToInt = paramConverter.convertToInt;
const queryHandler = require('../utils/queryHandler');
const handleQuery = queryHandler.handleQuery;

// This establishes the data which we will get when we call soundtrack/id=? 
// we will fetch data from the database of the soundtrack where id is = ?
router.get('/id=:id?', async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ error: 'Missing "id" parameter. Please include an "id" parameter in the request URL.' })
      }
      req.params.id = parseInt(req.params.id);
      await handleQuery(req, res, next, db.soundtrackById.bind(null, req.params.id), req.params, soundTrackSchema);
  });

// This establishes the data which we will get when we call soundtrack/title=?
// we will fetch data from the database of the soundtrack where title partially matches the ?
router.get('/title=:title?', async (req, res, next) => {
    if (!req.params.title) {
        return res.status(400).json({ error: 'Missing "title" parameter. Please include an "title" parameter in the request URL.' })
      }
      await handleQuery(req, res, next, db.soundtrackByTitle.bind(null, req.params.title), req.params, soundTrackSchema);
});
// This establishes the data which we will get when we call soundtrack/composer=?
// we will fetch data from the database of the soundtrack where composer partially matches the ?
router.get('/composer=:composer?', async (req, res, next) => {
    if (!req.params.composer) {
        return res.status(400).json({ error: 'Missing "composer" parameter. Please include an "composer" parameter in the request URL.' })
      }
      await handleQuery(req, res, next, db.soundtrackByComposer.bind(null, req.params.composer), req.params, soundTrackSchema);
});
// This establishes the data which we will get when we call soundtrack/episode=?
// we will fetch data from the database of the soundtrack where episode = "Episode " + ?
router.get('/episode=:episode?', async (req, res, next) => {
    if (!req.params.episode) {
        return res.status(400).json({ error: 'Missing "episode" parameter. Please include an "episode" parameter in the request URL.' })
      }
      req.params.episode = parseInt(req.params.episode);
      await handleQuery(req, res, next, db.soundtrackByEpisode.bind(null, req.params.episode), req.params, soundTrackSchema);
  });

// This combines all the previous queries methods into one, in which
// allows for users to simultaneously query multiple parameters
router.get('/', convertToInt, async (req, res, next) => {
    await handleQuery(req, res, next, db.soundtrackByQuery, req.query, soundTrackSchema);
  });

  module.exports = router;

  //@popular @category:"themes" 