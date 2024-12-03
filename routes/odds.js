require("dotenv").config();

const express = require("express");
const fetchData = require("../src/fetchData");
const processOddsData = require("../src/oddsData");
const formatMatchData = require("../src/formatData");
const getMarketData = require("../src/marketData");
const createOddsPayload = require("../src/oddsPayload");
const { payload3, globalConfig } = require("../src/constant");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const matchId = req.params.id;
  const apiUrl = process.env.URL;
  let selectedSidId;

  try {    
    const matches = globalConfig.formattedResultGlobal;
    const markets = globalConfig.MatchResultGlobal;
    if (matches == null) {
      res.json("Please call prematch firstly");
    } else {      
      matches.forEach(match => {
        if (match.id === matchId) {
          selectedSidId = match.map;
        }
      });

      // Get market data
      const marketArray = await getMarketData(markets);
            
      // Create payload for odds data and fetch
      const oddsPayload = await createOddsPayload(selectedSidId);
      const oddsResponse = await fetchData(apiUrl, oddsPayload);
  
      // // Process odds data
      const oddsResult = await processOddsData(oddsResponse, marketArray);
  
      // Respond with processed odds data
      res.json(oddsResult);
    }
  } catch (error) {
    console.error("Error in fetching or processing data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
