require("dotenv").config();

const express = require("express");
const fetchData = require("../src/fetchData");
const oddsData = require("../src/oddsData");
const formatData = require("../src/formatData");
const marketData = require("../src/marketData");
const oddsPayload = require("../src/oddsPayload");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const matchId = req.params.id;
  const apiUrl = process.env.URL;
  let matchPayload = process.env.PAYLOAD_MATCH;
  let selectedSidId;

  const matchResponse = await fetchData(apiUrl, matchPayload);
  const formattedMatchData = await formatData(matchResponse);
  formattedMatchData.forEach((match) => {
    if (match.id == matchId) {
      selectedSidId = match.map;
    }
  });

  const marketResponse = await fetchData(apiUrl, [["ga",["bm_ctm1_en"]]]);
  const marketArray = await marketData(marketResponse);

  const payload = await oddsPayload(selectedSidId);
  const oddsResponse = await fetchData(apiUrl, payload); // Fetch data and store it in the variable
  const oddsResult = await oddsData(oddsResponse, marketArray);
  res.json(oddsResult);
});

module.exports = router;
