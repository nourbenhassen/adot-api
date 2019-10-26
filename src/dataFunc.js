const csv = require("csv-parser");
const fs = require("fs");

//function calculates distance between two points given latitudes and longitudes
function distanceFunc(lat1, lon1, lat2, lon2) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
}

const dataFunc = data =>
  new Promise((resolve, reject) => {
    console.log(data);
    if (data && data.length <= 0) {
      return reject(new Error("No data sent"));
    }
    const newData = data.map(element => ({
      ...element,
      impressions: 0,
      clicks: 0,
    }));
    fs.createReadStream("events.csv")
      .pipe(csv())
      .on("data", row => {
        let nearPoint = {
          distance: distanceFunc(
            row.lat,
            row.lon,
            newData[0].lat,
            newData[0].lon,
          ),
          index: 0,
        };
        for (let i = 1; i < newData.length; i++) {
          let distance = distanceFunc(
            row.lat,
            row.lon,
            newData[i].lat,
            newData[i].lon,
          );
          if (distance < nearPoint.distance) {
            nearPoint = { distance, index: i };
          }
        }
        if (row.event_type === "imp") {
          newData[nearPoint.index].impressions++;
        } else if (row.event_type === "click") {
          newData[nearPoint.index].clicks++;
        }
      })
      .on("end", () => {
        const parsedData = {};
        newData.forEach(ele => {
          parsedData[ele.name] = {
            ...ele,
          };
        });
        return resolve(parsedData);
      });
  });

module.exports = dataFunc;
