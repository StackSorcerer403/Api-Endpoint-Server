require("dotenv").config();

const express = require("express");
const fetchData = require("../src/fetchData");
const oddsData = require("../src/oddsData");
const formatData = require("../src/formatData");
const globals = require("../src/globals");

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
      selectedSidId = match.sid;
    }
  });

  const sidArray = globals.sidArray;
  globals.sidArray = [];

  const oddsPayload = [];
  oddsPayload.push(["gf", [...sidArray], [1001]]);
  const oddsResponse = await fetchData(apiUrl, oddsPayload); // Fetch data and store it in the variable
  const oddsResult = await oddsData(oddsResponse, selectedSidId);
  res.json(oddsResult);
});

module.exports = router;
