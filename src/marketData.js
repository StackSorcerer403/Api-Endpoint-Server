const marketData = async (inputData) => {
  let formattedResults = {};
  inputData.forEach((element) => {
    for (const eventKey in element) {
      const itemArray = element[eventKey];
      for (let key in itemArray) {
        if (itemArray.hasOwnProperty(key)) {
            const obj = JSON.parse(itemArray[key]);
            formattedResults[key] = obj[1];
        }
      }
    }
  });
  return formattedResults;
};

module.exports = marketData;
