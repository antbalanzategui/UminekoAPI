const pool = require('./dbConnection');
let episodeDB = {};

episodeDB.episodeById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.episode WHERE id = ?`, id, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results[0]);
        });
    });
};

episodeDB.episodeByType = (type) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.episode WHERE type LIKE CONCAT('%', ?, '%')`, type, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

episodeDB.episodeByQuery = (queryParams) => {
    let query = "SELECT * FROM uminekoapi.episode WHERE 1 = 1";
    let values = [];
    if (queryParams.idStart && queryParams.idEnd) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(queryParams.idEnd);
    } else if (queryParams.idStart) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(8);
    } else if (queryParams.idEnd) {
      query += " AND id BETWEEN ? AND ?";
      values.push(1);
      values.push(queryParams.idEnd);
    }
    if (queryParams.type) {
      query += " AND type LIKE CONCAT('%', ?, '%')";
      values.push(queryParams.type);
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

module.exports = episodeDB;