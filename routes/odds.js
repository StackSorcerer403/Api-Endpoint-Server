require("dotenv").config();

const express = require("express");
const fetchData = require("../src/fetchData");
const oddsData = require("../src/oddsData");
const formatData = require("../src/formatData");
const globals = require("../src/globals");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const url = process.env.URL;
  let payload = process.env.PAYLOAD_MATCH;
  let sidId;

  // Add sidArray in Globals.js
  const matchData = await fetchData(url, payload);
  const formattedData = await formatData(matchData);
  formattedData.forEach(element => {
    if (element.id == id) {
      sidId = element.sid;
    }
  });
  const sidArray = globals.sidArray;

  payload = [];
  payload.push(["gf", [...sidArray], [1001]]);
  const data = await fetchData(url, payload); // Fetch data and store it in the variable
  const result = await oddsData(data, sidId);
  res.json(result);
});

module.exports = router;
