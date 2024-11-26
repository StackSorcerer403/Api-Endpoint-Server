require('dotenv').config();

const express = require("express");
const fetchData = require("../src/fetchData");
const formatData = require("../src/formatData");

const router = express.Router();

router.get("/", async (req, res) => {
  const url = process.env.URL;
  const payload = process.env.PAYLOAD_MATCH;  
  const data = await fetchData(url, payload); // Fetch data and store it in the variable
  const result = await formatData(data);
  res.json(result);
});

module.exports = router;
