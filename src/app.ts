import cors from 'cors';
import express, { Request, Response } from 'express';
import "express-async-errors";
import 'dotenv/config';
import mongoose from 'mongoose';
const { PORT, DATABASE_URL } = process.env

//APP
const app = express();

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// one call for test
app.get('/', (req: Request, res: Response) => {
  return res.send({ status: 'UP' });
});

mongoose.connect(String(DATABASE_URL))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`APP DB: ${DATABASE_URL}`)
      console.log(`APP STARTED ON http://localhost:${PORT || 3000}`);
    });
  })
  .catch(e => console.error('COULD NOT CONNECT ON DB', e))