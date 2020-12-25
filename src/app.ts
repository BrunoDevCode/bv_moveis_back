import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connect } from 'mongoose';
import { resolve } from 'path';
import routes from './routes';
import { MONGO_URI } from './config/env';

connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('> DB Connect sucessful');
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', (request, response) => return response.status(200).json({ Message: 'Hello, make login to use the application' }));
app.use('/favico.ico', express.static(resolve(__dirname, 'favico.ico')));
app.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(routes);

app.use((request, response, next) => {
  const error = new Error('Not found (404)');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  response.status(error.status || 500);
  response.json({ Error: error.message });
});

export default app;
