const formatData = async (inputData) => {
  let formattedResults = [];
  inputData.forEach((dataItem) => {
    let eventArray;
    if (dataItem.bm_ep1 != null || dataItem.bm_el1 != null) {
      if (dataItem.bm_ep1 != null) eventArray = dataItem.bm_ep1;
      else eventArray = dataItem.bm_el1;
      for (const eventKey in eventArray) {
        if (eventArray.hasOwnProperty(eventKey)) {
          const eventData = JSON.parse(eventArray[eventKey]);
          const readableTime = new Date(eventData.ts * 1000).toLocaleString();
          formattedResults.push({
            startTime: readableTime,
            id: eventKey,
            league: eventData.t[1],
            home: eventData.h,
            away: eventData.a,
          });
        }
      }
    }
  });

  return formattedResults;
};

module.exports = formatData;
