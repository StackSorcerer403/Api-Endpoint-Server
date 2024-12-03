const axios = require("axios");
const { HttpsProxyAgent } = require("https-proxy-agent");

const fetchData = async (url, payload) => {
  let data = [];
  const proxyList = [
    "agorcal80:AR2Jg4TbRq@154.193.72.143:50100",
    "agorcal80:AR2Jg4TbRq@154.193.71.101:50100",
    "agorcal80:AR2Jg4TbRq@154.193.70.27:50100",
    "agorcal80:AR2Jg4TbRq@154.193.73.231:50100",
    "agorcal80:AR2Jg4TbRq@45.142.153.106:50101",
    "agorcal80:AR2Jg4TbRq@45.142.153.229:50101",
    "agorcal80:AR2Jg4TbRq@154.193.71.36:50100",
    "agorcal80:AR2Jg4TbRq@154.193.73.13:50100",
    "agorcal80:AR2Jg4TbRq@154.193.70.110:50100",
    "agorcal80:AR2Jg4TbRq@154.193.72.193:50100",
  ];

  // Function to randomly select a proxy
  const selectProxy = () => {
    const proxy = proxyList[Math.floor(Math.random() * proxyList.length)];
    const [auth, hostPort] = proxy.split("@");
    const [username, password] = auth.split(":");
    const [host, port] = hostPort.split(":");
    return { host, port, username, password };
  };

  try {
    const proxy = selectProxy(); // Select a proxy
    const proxyUrl = `http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`;
    const agent = new HttpsProxyAgent(proxyUrl); // Create an HTTP proxy agent for HTTPS tunneling

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      data: payload,
      httpsAgent: agent, // Use the proxy agent for HTTPS requests
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

  return data; // Return the fetched data
};

module.exports = fetchData;
