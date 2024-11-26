const formatData = async (data) => {
  let res = [];
  data.forEach((element) => {
    if (element.bm_ep1 != null) {
      var arr = element.bm_ep1;
      for (var key in arr) {
        if (arr.hasOwnProperty(key)) {
          var idx = JSON.parse(arr[key]);
          const date = new Date(idx.ts * 1000);
          const readableTime = date.toLocaleString();
          res.push({
            id: key,
            home: idx.h,
            away: idx.a,
            league: idx.t[1],
            time: readableTime,
          });
        }
      }
    }
  });

  return res;
};

module.exports = formatData;
