const request = require('request-promise-native');


const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json')
    .then((body) => { return JSON.parse(body).ip; });
};

const fetchCoordsByIP = function(ip) {
  return request(`http://ipwho.is/${ip}`)
    .then((body) => { return { latitude: JSON.parse(body).latitude, longitude: JSON.parse(body).latitude }; });
};

const fetchISSFlyOverTimes = function(coords) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  return request(url)
    .then((obj) => { return JSON.parse(obj).response; });
};



const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes);

};




module.exports = { nextISSTimesForMyLocation };
