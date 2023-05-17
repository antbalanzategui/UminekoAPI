const pool = require('./dbConnection');
let charDB = {};

// This establishes the Data which we will return when characters/id=? is called
// we will fetch data from the database of the character whose id is equal to that number
charDB.characterById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.characters WHERE id = ?`, id, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results[0]);
        });
    });
};
// This establishes the Data which we will return when characters/name=? is called
// we will fetch data from the database of the character whose name "partially" matches the name
charDB.characterByName = (name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.characters WHERE name LIKE CONCAT('%', ?, '%')`, name, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};
// This establishes the Data which we will return when characters/gender=? is called
// we will fetch data from the database of the character whose gender "partially" matches the name
// Notes the Gender within the Database are given as follows: "Male", "Female", "NA" (NOTE there is no slash for N/A, only one character within the database has NA)
charDB.characterByGender = (gender) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.characters WHERE gender = ?`, gender, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};
// This establishes the Data which we will return when characters/birthMonth=? is called
// we will fetch data from the database of the character whose birthMonth is equal to that number
// NOTE: I said number, meaning birthMonth needs to be enter in format of 1 <= x <= 12. NOT Name of Month
charDB.characterByBirthMonth = (birthMonth) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.characters WHERE birthMonth = ?`, birthMonth, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
}

// This essentially has the same functionality as all the other previous queries however, 
// it allows for the concatenation of the all query options
// This is given via characters?id=?&gender=?..., etc...
// This is capable of everything which the previous iterations are capable of
// I made this after all previous queries were made, and decided to keep them for sake of logic
charDB.characterByQuery = (queryParams) => {
    // This intialization of query statement allows characters?, where no 
    // parameters are assigned to return the same as characters/
    let query = "SELECT * FROM uminekoapi.characters WHERE 1 = 1";
    let values = [];
    if (queryParams.id) {
        query += " AND id = ?";
        values.push(queryParams.id);
    }

    if (queryParams.name) {
        query += " AND name LIKE CONCAT('%', ?, '%')";
        values.push(queryParams.name);
    }

    if (queryParams.gender) {
        query += " AND gender = ?";
        values.push(queryParams.gender);
    }
    if (queryParams.birthMonth) {
        query += " AND birthMonth = ?"
        values.push(queryParams.birthMonth);
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

module.exports = charDB;
