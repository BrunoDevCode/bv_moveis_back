import app from './app';
import { PORT } from './config/env';

app.listen(PORT || 3333, () => {
  console.log('Server Running');
});
