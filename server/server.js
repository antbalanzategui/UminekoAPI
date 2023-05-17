/*
npm run dev 
*/
const express = require('express');
const characterRouter = require('./routes/characterRoutes');
const soundtrackRouter = require('./routes/soundtrackRoutes');
const app = express();

// Establishes MiddleWare
app.use(express.json());

app.use('/api/umineko/characters', characterRouter);
app.use('/api/umineko/soundtrack', soundtrackRouter);

app.listen(process.env.PORT || '3000', () => {
    console.log(`Sever is running on port: ${process.env.PORT || '3000'}`);
});
