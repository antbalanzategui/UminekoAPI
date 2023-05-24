/*
npm run dev 
*/
const express = require('express');
const characterRouter = require('./routes/characterRoutes');
const soundtrackRouter = require('./routes/soundtrackRoutes');
const app = express();
const cors = require('cors')
const path = require('path');

// Establishes MiddleWare
app.use(express.json());
app.use(cors())

app.use('/api', express.static(path.join(__dirname, '../public/images')));

app.use('/api/umineko/characters', characterRouter);
app.use('/api/umineko/soundtrack', soundtrackRouter);

app.listen(process.env.PORT || '3001', () => {
    console.log(`Sever is running on port: ${process.env.PORT || '3001'}`);
});
