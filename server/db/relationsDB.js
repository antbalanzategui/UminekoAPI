const pool = require('./dbConnection');
let relationsDB = {};

relationsDB.relationsById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.relationships WHERE id = ?`, id, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results[0]);
        });
    });
};

relationsDB.relationsByName = (name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.relationships WHERE personOne LIKE CONCAT('%', ?, '%')`, name, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

relationsDB.relationsByType = (type) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.relationships WHERE type LIKE CONCAT('%', ?, '%')`, type, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

relationsDB.relationsByCharacters = (characterIds) => {
    const query = `SELECT * FROM uminekoapi.relationships WHERE charId IN (?)`;
    return new Promise((resolve, reject) => {
      pool.query(query, [characterIds], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
};

relationsDB.relationsByQuery = (queryParams) => {
    let query = "SELECT * FROM uminekoapi.relationships WHERE 1 = 1";
    let values = [];
    if (queryParams.idStart && queryParams.idEnd) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(queryParams.idEnd);
    } else if (queryParams.idStart) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(513);
    } else if (queryParams.idEnd) {
      query += " AND id BETWEEN ? AND ?";
      values.push(1);
      values.push(queryParams.idEnd);
    }
  
    if (queryParams.name) {
      query += " AND personOne LIKE CONCAT('%', ?, '%')";
      values.push(queryParams.name);
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




module.exports = relationsDB;