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

imagesDB.imageByType = (type) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.images WHERE type LIKE CONCAT('%', ?, '%')`, type, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};


imagesDB.imageByEpisode = (episode) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.images WHERE episode = ?`, episode, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        })
    })
}

imagesDB.imageByEpisodeRoute = (episodeIds) => {
  const query = `SELECT * FROM uminekoapi.images WHERE episode IN (?)`;
  return new Promise((resolve, reject) => {
    pool.query(query, [episodeIds], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

imagesDB.imageByQuery = (queryParams) => {
    let query = "SELECT * FROM uminekoapi.images WHERE 1 = 1";
    let values = [];

    if (queryParams.idStart && queryParams.idEnd) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(queryParams.idEnd);
    } else if (queryParams.idStart) {
      query += " AND id BETWEEN ? AND ?";
      values.push(queryParams.idStart);
      values.push(58);
    } else if (queryParams.idEnd) {
      query += " AND id BETWEEN ? AND ?";
      values.push(1);
      values.push(queryParams.idEnd);
    }
  
    if (queryParams.type) {
      query += " AND type LIKE CONCAT('%', ?, '%')";
      values.push(queryParams.type);
    }
  
    if (queryParams.characters) {
        const characterNames = Array.isArray(queryParams.characters) ? queryParams.characters : [queryParams.characters];
        characterNames.forEach(name => {
            if (/^[A-Za-z]+$/.test(name)) {
                query += " AND characters LIKE ?";
                values.push(`%${name}%`); // Add wildcards to match the character name anywhere in the "characters" column
            }
        });
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







module.exports = imagesDB;
