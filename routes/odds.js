require("dotenv").config();

const express = require("express");
const fetchData = require("../src/fetchData");
const processOddsData = require("../src/oddsData");
const formatMatchData = require("../src/formatData");
const getMarketData = require("../src/marketData");
const createOddsPayload = require("../src/oddsPayload");
const { payload3 } = require("../src/constant");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const matchId = req.params.id;
  const apiUrl = process.env.URL;
  let matchPayload = payload3;
  let selectedSidId;

  try {
    // Fetch match data
    const matchResponse = await fetchData(apiUrl, matchPayload);

    // Format and find selected match ID
    const matches = await formatMatchData(matchResponse);
    matches.forEach(match => {
      if (match.id === matchId) {
        selectedSidId = match.map;
      }
    });

    // Get market data
    const marketArray = await getMarketData(matchResponse);

    // Create payload for odds data and fetch
    const oddsPayload = await createOddsPayload(selectedSidId);
    const oddsResponse = await fetchData(apiUrl, oddsPayload);

    // Process odds data
    const oddsResult = await processOddsData(oddsResponse, marketArray);

    // Respond with processed odds data
    res.json(oddsResult);
  } catch (error) {
    console.error("Error in fetching or processing data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
