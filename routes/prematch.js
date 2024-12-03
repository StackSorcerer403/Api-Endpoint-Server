require('dotenv').config();

const express = require("express");
const fetchData = require("../src/fetchData");
const formatData = require("../src/formatData");
const { payload3 } = require("../src/constant");

const router = express.Router();

router.get("/", async (req, res) => {
  const apiUrl = process.env.URL;
  const payload = payload3;  
  try {
    const fetchedData = await fetchData(apiUrl, payload); // Fetch data and store it in the variable
    const formattedResult = await formatData(fetchedData);
    res.json(formattedResult);
  } catch (error) {
    console.error("Error fetching or processing data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
