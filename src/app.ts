import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connect } from 'mongoose';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';
import { Integrations } from '@sentry/tracing';
import routes from './routes';
import { MONGO_URI } from './config/env';

connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('> DB Connect sucessful');
  });

const app = express();

Sentry.init({
  dsn: 'https://2efc118b0a8540d1ada6c1fb0a4d5c0c@o515965.ingest.sentry.io/5621630',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/favico.ico', express.static(resolve(__dirname, 'favico.ico')));
app.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(routes);

app.use((request, response, next) => {
  const error = new Error('Not found (404)');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line max-len
app.use((error: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
  Sentry.Handlers.errorHandler();
  response.status(error.status || 500);
  response.json({ Error: error.message });
});

export default app;
