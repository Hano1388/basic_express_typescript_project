import express, { Request, Response } from 'express';
import { router as loginRoutes } from './routes/loginRoutes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/login', loginRoutes);

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
