import app from './app';
import { PORT } from './config/env';

app.listen(PORT, () => {
  console.log(`> Server Running in ${PORT}`);
});
