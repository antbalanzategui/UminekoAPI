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

stDB.soundtrackByEpisode = (episode) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.soundtrack WHERE episode = ?`, episode, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        })
    })
}


stDB.soundtrackByQuery = (queryParams) => {
    // This intialization of query statement allows characters?, where no 
    // parameters are assigned to return the same as characters/
    let query = "SELECT * FROM uminekoapi.soundtrack WHERE 1 = 1";
    let values = [];
    if (queryParams.idStart && queryParams.idEnd) {
        query += " AND id BETWEEN ? AND ?";
        values.push(queryParams.idStart);
        values.push(queryParams.idEnd);
    } else if (queryParams.idStart) {
        query += " AND id BETWEEN ? AND ?";
        values.push(queryParams.idStart);
        values.push(208);
    } else if (queryParams.idEnd) {
        query += " AND id BETWEEN ? AND ?";
        values.push(1);
        values.push(queryParams.idEnd);
    }
    if (queryParams.title) {
        query += " AND title LIKE CONCAT('%', ?, '%')";
        values.push(queryParams.title);
    }

    if (queryParams.composer) {
        query += " AND composer LIKE CONCAT('%', ?, '%')";
        values.push(queryParams.composer);
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
                return reject(err)
            }
            return resolve(results);
        });
    });
};
module.exports = stDB;
