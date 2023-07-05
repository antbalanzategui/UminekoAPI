const pool = require('./dbConnection');
let informationDB = {};

informationDB.informationById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.information WHERE id = ?`, id, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results[0]);
        });
    });
};

informationDB.informationByName = (name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.information WHERE name LIKE CONCAT('%', ?, '%')`, name, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};


informationDB.informationByType = (type) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.information WHERE type LIKE CONCAT('%', ?, '%')`, type, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};


informationDB.informationByQuery = (queryParams) => {
    let query = "SELECT * FROM uminekoapi.information WHERE 1 = 1";
    let values = [];
    if (queryParams.idStart && queryParams.idEnd) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(queryParams.idEnd);
    } else if (queryParams.idStart) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(50);
    } else if (queryParams.idEnd) {
      query += " AND id BETWEEN ? AND ?";
      values.push(1);
      values.push(queryParams.idEnd);
    }
  
    if (queryParams.name) {
      query += " AND name LIKE CONCAT('%', ?, '%')";
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


module.exports = informationDB;