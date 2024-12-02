require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent'); // Import corrected

const prematchEventsRoute = require('./routes/prematch');
const oddsRoute = require('./routes/odds');

const app = express();
const port = process.env.PORT || 3000;

// Proxy configuration
const proxyList = [
    "agorcal80:AR2Jg4TbRq@154.193.72.143:50100",
    "agorcal80:AR2Jg4TbRq@154.193.71.101:50100",
    "agorcal80:AR2Jg4TbRq@154.193.70.27:50100",
    "agorcal80:AR2Jg4TbRq@154.193.73.231:50100",
    "agorcal80:AR2Jg4TbRq@45.142.153.106:50101",
    "agorcal80:AR2Jg4TbRq@45.142.153.229:50101",
    "agorcal80:AR2Jg4TbRq@154.193.71.36:50100",
    "agorcal80:AR2Jg4TbRq@154.193.73.13:50100",
    "agorcal80:AR2Jg4TbRq@154.193.70.110:50100",
    "agorcal80:AR2Jg4TbRq@154.193.72.193:50100",
];

// Utility to pick a random proxy
function getRandomProxy() {
    const randomIndex = Math.floor(Math.random() * proxyList.length);
    return proxyList[randomIndex];
}

// Middleware to inject proxy agent into requests
app.use((req, res, next) => {
    const proxy = getRandomProxy(); // Randomly pick a proxy
    console.log(`Using Proxy: ${proxy}`);

    const agent = new HttpsProxyAgent(`http://${proxy}`);
    req.proxyAgent = agent; // Attach the proxy agent to the request

    next();
});

// Example: A route using axios with proxy
app.get('/api/proxy-test', async (req, res) => {
    try {
        const response = await axios.get('https://api.example.com/data', {
            httpsAgent: req.proxyAgent, // Use the proxy agent
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error with proxied request:', error.message);
        res.status(500).send('Proxy request failed.');
    }
});

app.use(bodyParser.json());

app.use('/api/prematch', prematchEventsRoute);
app.use('/api/getOddsByEvent', oddsRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
