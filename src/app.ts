import express from 'express';
import cors from 'cors';
import routes from './routes';
import morgan from 'morgan';
import { connect } from 'mongoose';
import { MONGO_URI } from './config/env';

connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('Dev'));
app.use(routes);

export default app;