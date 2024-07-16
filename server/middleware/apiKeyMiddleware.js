const pool = require('../db/dbConnection');

const checkApiKey = (queryType) => {
  return async (req, res, next) => {
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

          // Capture the original send method
          const originalSend = res.send;

          // Wrap the send method to capture response size
          res.send = function (data) {
            const responseSize = Buffer.byteLength(data);
            const sqlLogQuery = 'INSERT INTO queries (user_id, query_type, query_time, response_size) VALUES (?, ?, NOW(), ?)';
            pool.query(sqlLogQuery, [user.id, queryType, responseSize], (err, logResults) => {
              if (err) console.error('Failed to log query:', err);
            });

            // Call the original send method
            originalSend.apply(res, arguments);
          };

          next();
        });
      } else {
        return res.status(403).json({ error: 'Invalid or exhausted API key' });
      }
    });
  };
};

module.exports = checkApiKey;
