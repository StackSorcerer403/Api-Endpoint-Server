const marketData = async (inputData) => {
  let formattedResults = {};

  inputData.forEach((dataEntry) => {
    for (const eventKey in dataEntry) {
      const itemsArray = dataEntry[eventKey];
      for (let index in itemsArray) {
        if (itemsArray.hasOwnProperty(index)) {
            const obj = JSON.parse(itemsArray[index]);
            formattedResults[index] = obj[1];
        }
      }
    }
  });
  return formattedResults;
};

module.exports = marketData;
