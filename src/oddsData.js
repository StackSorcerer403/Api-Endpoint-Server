const processOddsData = async (oddsDataArray, marketDataMap) => {
  let formattedResults = [];
  
  oddsDataArray.forEach((oddsEntry) => {
    for (const eventKey in oddsEntry) {
      const eventItem = oddsEntry[eventKey];
      
      for (const marketKey in eventItem) {
        if (marketKey !== "time" && marketKey !== "state") {
          const marketName = marketDataMap[marketKey];
          
          let marketItem = eventItem[marketKey];
          if (typeof(marketItem) !== "object") {
            marketItem = JSON.parse(eventItem[marketKey]);
          }
          
          let runnersArray = [];
          let valuesArray = [];
          
          for (const runnerKey in marketItem) {            
            const runnerData = marketItem[runnerKey];
            valuesArray = [];
            
            let index = 1;
            for (const valueKey in runnerData) {              
              const valueData = runnerData[valueKey];
              if (valueData != null) {
                if (valueData[0] !== undefined) {
                  const normalizedValue = valueData[0] / 100;
                  if (normalizedValue != null) {
                    valuesArray.push(normalizedValue + '_' + index);
                  }
                  index++;
                }
              }
            }
            
            if (valuesArray.length) {
              let runnerKeyString = runnerKey;
              if (runnerKeyString !== 's') {
                runnerKeyString = runnerKeyString.replace("s", "");

                runnersArray.push({
                  [runnerKeyString] : valuesArray
                });                                         
              } else {
                runnersArray = valuesArray;
              }
            }
          }

          if (marketName != null) {
            formattedResults.push({
              name: marketName,
              runners: runnersArray,
              marketId: marketKey,
            });            
          }
        }
      }
    }
  });

  return formattedResults;
};

module.exports = processOddsData;
