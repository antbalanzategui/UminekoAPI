const pool = require('../db/dbConnection');

const checkApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(403).json({ error: 'API key is required' });
  }

  const sqlCheckApiKey = 'SELECT * FROM users WHERE apikey = ? AND api_call_limit > 0';
  pool.query(sqlCheckApiKey, [apiKey], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const user = results[0];

      const sqlDecrementApiCallLimit = 'UPDATE users SET api_call_limit = api_call_limit - 1 WHERE apikey = ?';
      pool.query(sqlDecrementApiCallLimit, [apiKey], (err, updateResults) => {
        if (err) throw err;
        
        req.user = user; // Attach the user to the request object
        next();
      });
    } else {
      return res.status(403).json({ error: 'Invalid or exhausted API key' });
    }
  });
};

module.exports = checkApiKey;
