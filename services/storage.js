var request = require('request').defaults({
  strictSSL: false
});

var HISTORY_LOAD_API = "https://weather-wrapper.azurewebsites.net/api/WeatherQueryLoad?code=oYu/xVJ8vUHK6AVx402ToIONRlnJivBx0gK8jH0wzSWeNnhQLCsDTw==&clientId=";

var computeProxyStr = function() {
  var str = process.env.http_proxy;
  console.log("Proxy Str is " + str);
  return str;
};

exports.getInputHistory = function(req,res) {
  var clientId = req.query.clientId;
  if ((clientId === null) || (typeof(clientId) === 'undefined')) {
    return res.status(400).send('Please pass valid clientId on query string first');
  }
  request.get({
    url:HISTORY_LOAD_API+clientId,
    json:true,
    http_proxy: computeProxyStr()
  },function(err,resp,body){
    if (err){
      console.log(err);
      return res.status(400).send(err);
    }else{
      console.log(body);
      return res.status(200).send(JSON.parse(body));
    }
  });
};
