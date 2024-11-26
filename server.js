require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const prematchEventsRoute = require('./routes/prematch');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/prematch', prematchEventsRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
