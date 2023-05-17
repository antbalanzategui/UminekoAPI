const pool = require('./dbConnection');
let stDB = {};

stDB.soundtrackById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.soundtrack WHERE id = ?`, id, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
}
stDB.soundtrackByTitle = (title) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.soundtrack WHERE title LIKE CONCAT('%', ?, '%')`, title, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

stDB.soundtrackByComposer = (composer) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.soundtrack WHERE composer LIKE CONCAT('%', ?, '%')`, composer, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

module.exports = stDB;
