const pool = require('./dbConnection');
let triviaDB = {};

triviaDB.triviaById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.trivia WHERE id = ?`, id, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results[0]);
        });
    });
};

triviaDB.triviaByName = (name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.trivia WHERE name LIKE CONCAT('%', ?, '%')`, name, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};


triviaDB.triviaByAssociation = (association) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.trivia WHERE association LIKE CONCAT('%', ?, '%')`, association, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

triviaDB.triviaByQuery = (queryParams) => {
    let query = "SELECT * FROM uminekoapi.trivia WHERE 1 = 1";
    let values = [];
    if (queryParams.idStart && queryParams.idEnd) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(queryParams.idEnd);
    } else if (queryParams.idStart) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(147);
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
      query += " AND association LIKE CONCAT('%', ?, '%')";
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




module.exports = triviaDB;