const oddsData = async (oddsData, marketData) => {
  let formattedResults = [];
  oddsData.forEach((dataItem) => {
    for (const eventKey in dataItem) {
      const item = dataItem[eventKey];
      for (const key in item) {
        if (key !== "time" && key !== "state") {
          const keyString = marketData[key];
          // console.log(item[key]);
          let item1 = item[key];
          if (typeof(item1) != "object") {
            item1 = JSON.parse(item[key]);
          }
          let oddArray = [];
          let valArray = [];
          for (const key1 in item1) {            
            const item2 = item1[key1];
            valArray = [];
            for (const key2 in item2) {              
              const item3 = item2[key2];
              if (item3 != null) {
                if (item3[0] !== undefined) {
                  const val = item3[0] / 100;
                  if (val != null) {
                    valArray.push(val);                    
                  }
                }
              }
            }
            if (valArray.length) {
              let keystr = key1;
              if (keystr !== 's') {
                keystr = keystr.replace("s", "");
              }
              oddArray.push({
                [keystr] : valArray
              });                                         
            }
          }

          if (keyString != null) {
            formattedResults.push({
              name: keyString,
              runners: oddArray,
              marketId: key,
            });            
          }
        }
      }
    }
  });

  return formattedResults;
};

module.exports = oddsData;
