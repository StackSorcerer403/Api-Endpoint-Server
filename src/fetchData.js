const axios = require('axios');

const fetchData = async (url, payload) => {
  let data = [];  // Initialize data array within the function scope
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      data: payload,
    };

    const response = await axios(url, options);

    if (response.status === 200) {
      data = response.data;
      console.log("Data fetched successfully.");
    } else {
      console.error(`Failed to fetch data: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    console.error("Error details:", error.response ? error.response.data : error);
  }
  return data;  // Return the fetched data
};

module.exports = fetchData;
