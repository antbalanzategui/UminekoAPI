const queryValidator = require('../utils/queryValidator');
const validateQuery = queryValidator.validateQuery;
const relationsDB = require('../db/relationsDB');
const triviaDB = require('../db/triviaDB');
const stDB = require('../db/soundtrackDB');
const imagesDB = require('../db/imagesDB');

async function handleQuery(req, res, next, queryFunction, queryObj, querySchema) {
    const errors = validateQuery(queryObj, querySchema);
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }
    try {
      let results = await queryFunction(queryObj);

      if (queryObj.random && queryObj.random > results.length) {
        res.status(400).json({
          error: "Random count exceeds the number of results.",
          totalResults: results.length,
        });
        return;
      }

      if (queryObj.random) {
        // Shuffle the results array randomly
        let shuffledResults = results.sort(() => Math.random() - 0.5);
        // Get the first `random` number of results
        results = shuffledResults.slice(0, queryObj.random);
      }
      
      if (queryObj.trivia) {
        if (queryObj.trivia === 'true' && results.length != 0) {
          const characterIds = results.map((character) => character.id);
          const trivia = await triviaDB.triviaByCharacters(characterIds);
          results.forEach((character) => {
            character.trivia = trivia.filter((triviaItem) => triviaItem.charId === character.id);
          });
        }
      }

      if (queryObj.relationships && results.length != 0) {
        if (queryObj.relationships === 'true') {
          const characterIds = results.map((character) => character.id);
          const relationships = await relationsDB.relationsByCharacters(characterIds);
          results.forEach((character) => {
            character.relationships = relationships.filter((relationship) => relationship.charId === character.id);
          });
        }
      }
      if (queryObj.soundtrack && results.length != 0) {
        if (queryObj.soundtrack === 'true') {
          const episodeIds = results.map((episode) => episode.id);
          const soundtracks = await stDB.soundtrackByEpisodeRoute(episodeIds);
          results.forEach((episode) => {
            episode.soundtrack = soundtracks.filter((soundtrack) => soundtrack.episode === episode.id);
          })
        }
      }
      if (queryObj.images && results.length != 0) {
        if (queryObj.images === 'true') {
          const episodeIds = results.map((episode) => episode.id);
          const images = await imagesDB.imageByEpisodeRoute(episodeIds);
          results.forEach((episode) => {
            episode.image = images.filter((image) => image.episode === episode.id);
          }) 
        }
      }
      
      // Consider refactoring this
      // So thtat you do not have to check results.length for every possible attribute
      // But rather check results at beginning 
      // Seperate if from else...
      if (results.length === 0) {
        res.status(200).json({ message: 'No results found.' });
      } else {
        res.json(results);
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  module.exports = {
    handleQuery
  };