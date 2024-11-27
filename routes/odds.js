require("dotenv").config();

const express = require("express");
const fetchData = require("../src/fetchData");
const oddsData = require("../src/oddsData");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const url = process.env.URL;
  const payload = process.env.PAYLOAD_ODDS;
  const data = await fetchData(url, payload); // Fetch data and store it in the variable
  const result = await oddsData(data, id);
  res.json(result);
});

module.exports = router;
