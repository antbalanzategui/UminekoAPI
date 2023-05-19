// This function is a used to convert certain possible parameters within a query to an integer
// essentially, this is necessary occasionally as we need to evaluate whether it is within a particular
// range of numbers, positive, etc...
const convertToInt = (req, res, next) => {
    if (req.query.id) {
      req.query.id = parseInt(req.query.id);
    }
    if (req.query.birthMonth) {
      req.query.birthMonth = parseInt(req.query.birthMonth);
    }
    if (req.query.episode) {
        req.query.episode = parseInt(req.query.episode);
    }
    next();
  };

  module.exports = {
    convertToInt
  };