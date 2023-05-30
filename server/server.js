/*
npm run dev 
*/
const express = require('express');
const characterRouter = require('./routes/characterRoutes');
const soundtrackRouter = require('./routes/soundtrackRoutes');
const imageRouter = require('./routes/imagesRoutes');
const app = express();
const cors = require('cors')
const path = require('path');

// Establishes MiddleWare
app.use(express.json());
app.use(cors())

app.use('/api/media', express.static(path.join(__dirname, '../public/images')));

app.use('/api/characters', characterRouter);
app.use('/api/soundtrack', soundtrackRouter);
app.use('/api/images', imageRouter);



app.listen(process.env.PORT || '3001', () => {
    console.log(`Sever is running on port: ${process.env.PORT || '3001'}`);
});
