const marketData = async (inputData) => {
  let formattedResults = {};

  inputData.forEach((dataEntry) => {
    for (const eventKey in dataEntry) {
      const itemsArray = dataEntry[eventKey];
      for (let index in itemsArray) {
        if (itemsArray.hasOwnProperty(index)) {
          const items = JSON.parse(itemsArray[index]);
          formattedResults[index] = items[1];
        }
      }
    }
  });
  return formattedResults;
};

module.exports = marketData;
