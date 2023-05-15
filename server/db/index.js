require('dotenv').config({ path: './server/.env' });
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE
});

let uminekoDB = {};

uminekoDB.characterAll = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.characters`, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

uminekoDB.characterById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.characters WHERE id = ?`, id, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results[0]);
        });
    });
};

uminekoDB.characterByName = (name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.characters WHERE name LIKE CONCAT('%', ?, '%')`, name, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

uminekoDB.characterByGender = (gender) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.characters WHERE gender = ?`, gender, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

uminekoDB.characterByBirthMonth = (birthMonth) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM uminekoapi.characters WHERE birthMonth = ?`, birthMonth, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
}


uminekoDB.characterByQuery = (queryParams) => {
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

module.exports = uminekoDB;
