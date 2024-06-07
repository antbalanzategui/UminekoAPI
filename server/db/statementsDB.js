const pool = require('./dbConnection');
let statementDB = {};


// localhost:3001/api/episode?type=ans&idStart=8&images=true&soundtrack=true


statementDB.statementsById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.statements WHERE id = ?`, id, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results[0]);
        });
    });
};

statementDB.statementsByType = (type) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.statements WHERE type LIKE CONCAT('%', ?, '%')`, type, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

statementDB.statementsByEpisode = (episode) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.statements WHERE episode = ?`, episode, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        })
    })
}

statementDB.statementsByQuery = (queryParams) => {
    let query = "SELECT * FROM uminekoapi.statements WHERE 1 = 1";
    let values = [];
  
    if (queryParams.idStart && queryParams.idEnd) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(queryParams.idEnd);
    } else if (queryParams.idStart) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(2578);
    } else if (queryParams.idEnd) {
      query += " AND id BETWEEN ? AND ?";
      values.push(1);
      values.push(queryParams.idEnd);
    }
  
    if (queryParams.type) {
      query += " AND type LIKE CONCAT('%', ?, '%')";
      values.push(queryParams.type);
    }
    
    if (queryParams.episodeStart && queryParams.episodeEnd) {
        query += " AND episode BETWEEN ? AND ?";
        values.push(queryParams.episodeStart);
        values.push(queryParams.episodeEnd);
    } else if (queryParams.episodeStart) {
        query += " AND episode BETWEEN ? AND ?";
        values.push(queryParams.episodeStart);
        values.push(8);
    } else if (queryParams.episodeEnd) {
        query += " AND episode BETWEEN ? AND ?";
        values.push(1);
        values.push(queryParams.birthMonthEnd);
    }
  
  
  
    return new Promise((resolve, reject) => {
      pool.query(query, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  };


module.exports = statementDB;