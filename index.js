const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes,nextISSTimesForMyLocation } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned IP:', ip);

  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log('fetchCoordsByIP Error:', error);
    } else {
      console.log('Coordinates:', data);
      fetchISSFlyOverTimes(data, (error, flyover) => {
        if (error) {
          console.log('fetchISSFlyOverTimes Error:', error);
        } else {
          console.log('flyover:', flyover);
        }});
    }
  });


  const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  
  nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    // success, print out the deets!
    printPassTimes(passTimes);
  });

});
