/*
npm run dev 
*/
const express = require('express');
const characterRouter = require('./routes');
const app = express();

app.use(express.json());
app.use('/api/umineko/characters', characterRouter);
app.listen(process.env.PORT || '3000', () => {
    console.log(`Sever is running on port: ${process.env.PORT || '3000'}`);
});
