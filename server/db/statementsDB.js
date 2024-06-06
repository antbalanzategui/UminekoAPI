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


module.exports = statementDB;