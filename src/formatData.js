// const globals = require('./globals');

const formatData = async (inputData) => {
  let formattedResults = [];
  inputData.forEach((dataItem) => {
    let eventArray;
    let mapArray = [];
    if (dataItem.bm_ep1 != null || dataItem.bm_el1 != null) {
      if (dataItem.bm_ep1 != null) eventArray = dataItem.bm_ep1;
      else eventArray = dataItem.bm_el1;
      for (const eventKey in eventArray) {
        if (eventArray.hasOwnProperty(eventKey)) {          
          const eventData = JSON.parse(eventArray[eventKey]);
          const leagueName = eventData.t[1];
          if (leagueName.includes("Tournament Winner")) {
            continue;
          }
          const readableTime = new Date(eventData.ts * 1000).toLocaleString();
          const eventMap = eventData.map;

          for (const mapKey in eventMap) {
            mapArray.push(mapKey);
          }
          formattedResults.push({
            startTime: readableTime,
            id: eventKey,
            league: eventData.t[1],
            home: eventData.h,
            away: eventData.a,
            map: mapArray
          });

          mapArray = [];
        }
      }

      // Sort the formattedResults array by readableTime 
      formattedResults.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    }
  });

  return formattedResults;
};

module.exports = formatData;
