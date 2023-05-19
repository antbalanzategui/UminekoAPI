const queryValidator = require('../utils/queryValidator');
const validateQuery = queryValidator.validateQuery;

async function handleQuery(req, res, next, queryFunction, queryObj, querySchema) {
    const errors = validateQuery(queryObj, querySchema);
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }
    try {
      let results = await queryFunction(queryObj);
  
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