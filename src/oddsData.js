const oddsData = async (inputData, dataId) => {
  let formattedResults = [];
  inputData.some((dataItem) => {
    if (dataItem[dataId] != null) {
      formattedResults.push(dataItem[dataId]);
      return true; // Break the loop when condition is met
    }
  });

  return formattedResults;
};

module.exports = oddsData;
