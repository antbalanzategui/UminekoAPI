const pool = require('./dbConnection');
let imagesDB = {};


imagesDB.imageById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.images WHERE id = ?`, id, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results[0]);
        });
    });
};


module.exports = imagesDB;
