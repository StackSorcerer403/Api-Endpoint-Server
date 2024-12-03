require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const prematchEventsRoute = require('./routes/prematch');
const oddsRoute = require('./routes/odds');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Route for prematch events
app.use('/api/prematch', prematchEventsRoute);

// Route for getting odds by event
app.use('/api/getOddsByEvent', oddsRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
