require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const { fetchData, data, odds } = require("./fetchData");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to list all available pre-match events
app.get("/api/prematch-events", async (req, res) => {
  await fetchData(); // Fetch data before responding
  res.json(data);
});

// Endpoint to get all odds from the selected match
app.get("/api/odds/:matchId", (req, res) => {
  const matchId = parseInt(req.params.matchId, 10);
  if (odds[matchId]) {
    res.json(odds[matchId]);
  } else {
    res.status(404).json({ error: "Match not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
