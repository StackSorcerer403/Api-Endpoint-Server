const express = require('express');
const bodyParser = require('body-parser');
const { getData, getOdds, fetchData } = require('./src/dataService');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/api/prematch-events', (req, res) => {
    const data = getData();
    res.json(data);
});

app.get('/api/odds/:matchId', (req, res) => {
    const matchId = parseInt(req.params.matchId, 10);
    const odds = getOdds();

    if (odds[matchId]) {
        res.json(odds[matchId]);
    } else {
        res.status(404).json({ error: 'Match not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    fetchData();
});