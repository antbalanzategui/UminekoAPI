/*
npm run dev 
*/
require('dotenv').config({ path: './server/.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const characterRouter = require('./routes/characterRoutes');
const soundtrackRouter = require('./routes/soundtrackRoutes');
const imageRouter = require('./routes/imagesRoutes');
const triviaRouter = require('./routes/triviaRoutes');
const relationsRouter = require('./routes/relationsRoutes');
const informationRouter = require('./routes/informationRoutes');
const episodeRouter = require('./routes/episodeRoutes');
const statementsRouter = require('./routes/statementsRoutes');
const verifyToken = require('./middleware/verifyToken');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Static file serving
app.use('/api/media', express.static(path.join(__dirname, '../public/images')));

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRouter);
app.use('/api/soundtrack', soundtrackRouter);
app.use('/api/images', imageRouter);
app.use('/api/trivia', triviaRouter);
app.use('/api/relations', relationsRouter);
app.use('/api/info', informationRouter);
app.use('/api/episode', episodeRouter);
app.use('/api/statements', statementsRouter);

// Example protected route using middleware
app.get('/api/series', verifyToken, (req, res) => {
  const sql = 'SELECT * FROM series';
  pool.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
