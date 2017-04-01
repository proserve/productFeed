import express from 'express';
import * as path from 'path';
import middlewaresConfig from './app/config/middlewares';
import apiRoutes from './app/api';
const app = express();

/**
 * middlewares
 */
middlewaresConfig(app);
app.use('/api/v1', apiRoutes);
app.use(express.static('public'));
app.use(express.static('node_modules'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App listening to port ${PORT}`);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = app;