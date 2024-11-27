const oddsData = async (inputData, dataId) => {
  let formattedResults = [];
  inputData.forEach((dataItem) => {
    let eventArray;
    if (dataItem[dataId] != null) {
      formattedResults.push(dataItem[dataId]);
    }
  });

  return formattedResults;
};

module.exports = oddsData;
