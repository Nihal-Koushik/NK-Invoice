import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import sequelize from '../db';

export const app = express();
const port = 3000;

app.use(bodyParser.json());

// middleware to log incoming requests 
app.use((req, res, next) => {
    console.log(`\n${req.method} ${req.url}`);
    next();
});



sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});