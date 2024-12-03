const global = require('./constant');

const generateOddsPayload = async (selectedSidId) => {
  const oddsPayloadArray = [];

  if (selectedSidId !== null) {
    selectedSidId.forEach((sid, index) => {
      if (index === 0) {
        oddsPayloadArray.push(["ga", [sid]]);
      } else if (index === 1) {
        oddsPayloadArray.push(["gf", [sid], global.payload1]);
      } else if (index === 2) {
        oddsPayloadArray.push(["gf", [sid], global.payload2]);
      }
    });
  }

  return oddsPayloadArray;
};

module.exports = generateOddsPayload;
