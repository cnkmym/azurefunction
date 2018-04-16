var request = require('request').defaults({
  strictSSL: false
});

var OPEN_WEATHER_API = "https://weather-wrapper.azurewebsites.net/api/WeatherQueryExecute?code=rvMDvyaPP/khfSH7rB5DGmhBiCtjVDK8uqaxVDaEBlQWeuJNWEOwAw==";
var getCurrentDatetime = function() {
  var currentdate = new Date();
  var datetime = currentdate.getFullYear() + "/" +
    (currentdate.getMonth() + 1) + "/" +
    currentdate.getDate() + " @ " +
    currentdate.getHours() + ":" +
    currentdate.getMinutes() + ":" +
    currentdate.getSeconds();
  return datetime;
};

var computeProxyStr = function() {
  var str = process.env.http_proxy;
  console.log("Proxy Str is " + str);
  return str;
};

exports.getWeather = function(req, res) {
  var zip = req.query.zip;
  var clientId = req.query.clientId;
  if ((zip === null) || (typeof(zip) === 'undefined')) {
    return res.status(400).send('Please pass valid zip code on query string first');
  }
  request.get({
    url: OPEN_WEATHER_API + "&zip=" + zip + "&clientId=" + clientId,
    json: true,
    http_proxy: computeProxyStr()
  }, function(err, resp, body) {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    } else {
      console.log(body);
      return res.status(200).send(body);
    }
  });
};
