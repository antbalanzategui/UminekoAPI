const express = require('express');
const pool = require('../db/dbConnection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const router = express.Router();

function generateApiKey() {
  return crypto.randomBytes(20).toString('hex'); // Generates a random API key
}

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    const sqlCheckEmail = 'SELECT * FROM users WHERE email = ?';
    pool.query(sqlCheckEmail, [email], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).send('Email already in use');
      }

      let apiKey = generateApiKey();
      const sqlCheckApiKey = 'SELECT * FROM users WHERE apikey = ?';

      // Ensure API key is unique
      pool.query(sqlCheckApiKey, [apiKey], (err, results) => {
        if (err) throw err;

        while (results.length > 0) {
          apiKey = generateApiKey();
          pool.query(sqlCheckApiKey, [apiKey], (err, results) => {
            if (err) throw err;
          });
        }

        const sqlInsertUser = 'INSERT INTO users (name, email, password, apikey, api_call_limit, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
        pool.query(sqlInsertUser, [username, email, hash, apiKey, 100], (err, result) => {
          if (err) throw err;
          res.status(201).send('User registered with API key');
        });
      });
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  pool.query(sql, [email], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.json({ token, apiKey: user.apikey });
        } else {
          res.status(400).send('Password incorrect');
        }
      });
    } else {
      res.status(400).send('User not found');
    }
  });
});

module.exports = router;