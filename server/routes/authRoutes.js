const express = require('express');
const pool = require('../db/dbConnection');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

function generateApiKey() {
  return crypto.randomBytes(20).toString('hex'); // Generates a random API key
}

function generateVerificationToken() {
  return crypto.randomBytes(20).toString('hex'); // Generates a random verification token
}

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;

    const sqlCheckEmail = 'SELECT * FROM users WHERE email = ?';
    pool.query(sqlCheckEmail, [email], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).send('Email already in use');
      }

      let apiKey = generateApiKey();
      let verificationToken = generateVerificationToken();
      const sqlCheckApiKey = 'SELECT * FROM users WHERE apikey = ?';

      // Hash the API key before storing it
      bcrypt.hash(apiKey, 10, (err, hashedApiKey) => {
        if (err) throw err;

        // Ensure API key is unique
        pool.query(sqlCheckApiKey, [hashedApiKey], (err, results) => {
          if (err) throw err;

          while (results.length > 0) {
            apiKey = generateApiKey();
            bcrypt.hash(apiKey, 10, (err, newHashedApiKey) => {
              if (err) throw err;
              hashedApiKey = newHashedApiKey;
              pool.query(sqlCheckApiKey, [hashedApiKey], (err, results) => {
                if (err) throw err;
              });
            });
          }

          // Send verification email
          const msg = {
            to: email,
            from: 'AntB2002@gmail.com', // Use your verified SendGrid email
            subject: 'Account Verification',
            text: `Please verify your account by clicking the link: http://localhost:3001/api/auth/verify?token=${verificationToken}`,
            html: `<strong>Please verify your account by clicking the link: <a href="http://localhost:3001/api/auth/verify?token=${verificationToken}">Verify Account</a></strong>`,
          };

          sgMail.send(msg)
            .then(() => {
              // Email sent successfully, now insert the user into the database
              const sqlInsertUser = 'INSERT INTO users (name, email, password, apikey, verification_token, created_at, api_call_limit) VALUES (?, ?, ?, ?, ?, NOW(), 100)';
              pool.query(sqlInsertUser, [username, email, hashedPassword, hashedApiKey, verificationToken], (err, result) => {
                if (err) throw err;
                res.status(201).send('User registered. Please check your email to verify your account.');
              });
            })
            .catch((error) => {
              console.error('SendGrid Error:', error.response.body.errors); // More detailed error logging
              res.status(500).send('Failed to send verification email.');
            });
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

      // Check if the account is activated
      if (user.activated !== 1) {
        return res.status(400).send('Account not verified. Please check your email for the verification link.');
      }

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

router.get('/verify', (req, res) => {
  const { token } = req.query;

  // First, retrieve the user based on the verification token
  const sqlGetUser = 'SELECT email, apikey FROM users WHERE verification_token = ?';
  pool.query(sqlGetUser, [token], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const user = results[0];
      
      // Generate a new API key to send unhashed to the user
      const unhashedApiKey = generateApiKey();
      bcrypt.hash(unhashedApiKey, 10, (err, hashedApiKey) => {
        if (err) throw err;

        // Update the user to set activated, clear the verification token, and store the new hashed API key
        const sqlVerifyUser = 'UPDATE users SET activated = 1, verification_token = NULL, apikey = ? WHERE verification_token = ?';
        pool.query(sqlVerifyUser, [hashedApiKey, token], (err, result) => {
          if (err) throw err;

          if (result.affectedRows === 0) {
            return res.status(400).send('Invalid or expired verification token.');
          }

          // Send the API key via email
          const msg = {
            to: user.email,
            from: 'AntB2002@gmail.com', // Use your verified SendGrid email
            subject: 'Your API Key',
            text: `Your account has been verified. Here is your API key: ${unhashedApiKey}`,
            html: `<strong>Your account has been verified. Here is your API key: <code>${unhashedApiKey}</code></strong>`,
          };

          sgMail.send(msg)
            .then(() => {
              res.send('Account verified successfully. Your API key has been sent to your email.');
            })
            .catch((error) => {
              console.error('SendGrid Error:', error.response.body.errors); // More detailed error logging
              res.status(500).send('Account verified, but failed to send API key email.');
            });
        });
      });
    } else {
      res.status(400).send('This verification link has already been used or is invalid.');
    }
  });
});

module.exports = router;
