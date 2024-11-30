const global = require('./constant');

const oddsPayload = async(selectedSidId) => {
  let oddsPayload = [];
  if (selectedSidId != null) {
    selectedSidId.forEach((sid, index) => {
      if (index == 0) {
        oddsPayload.push([
          "ga", [sid]
        ]);
      } else if (index == 1) {
        oddsPayload.push([
          "gf", [sid], global.payload1
        ]);
      } else if (index == 2) {
        oddsPayload.push([
          "gf", [sid], global.payload2
        ]);
      }
    }); 
  }  

  return oddsPayload;
}

module.exports = oddsPayload;