
const express = require('express');
const router = express.Router();
const db = require('../db/imagesDB');
const imageSchemas = require('../utils/schemas/imageSchemas');
const imageSchema = imageSchemas.imageSchema;
const paramConverter = require('../utils/paramConverter');
const convertToInt = paramConverter.convertToInt;
const queryHandler = require('../utils/queryHandler');
const handleQuery = queryHandler.handleQuery;
const imageSchemaQuery = imageSchemas.imageSchemaQuery;

const checkApiKey = require('../middleware/apiKeyMiddleware');

router.use(checkApiKey('images'));

router.get('/id=:id?', async (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Missing "id" parameter. Please include an "id" parameter in the request URL.' })
    }
    req.params.id = parseInt(req.params.id);
    await handleQuery(req, res, next, db.imageById.bind(null, req.params.id), req.params, imageSchema);
});


router.get('/type=:type?', async(req, res, next) => {
    if (!req.params.type) {
      return res.status(400).json({ error: 'Missing "type" parameter. Please include an "type" parameter in the request URL.' })
    }
    await handleQuery(req, res, next, db.imageByType.bind(null, req.params.type), req.params, imageSchema);
});

router.get('/episode=:episode?', async (req, res, next) => {
    if (!req.params.episode) {
        return res.status(400).json({ error: 'Missing "episode" parameter. Please include an "episode" parameter in the request URL.' })
      }
      req.params.episode = parseInt(req.params.episode);
      await handleQuery(req, res, next, db.imageByEpisode.bind(null, req.params.episode), req.params, imageSchema);
});

// localhost:3001/api/images?characters[]=Battler&characters[]=Ange&episodeStart=1
router.get('/', convertToInt, async (req, res, next) => {
    await handleQuery(req, res, next, db.imageByQuery, req.query, imageSchemaQuery);
    });
    





module.exports = router;