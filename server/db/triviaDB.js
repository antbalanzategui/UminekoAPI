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




module.exports = triviaDB;