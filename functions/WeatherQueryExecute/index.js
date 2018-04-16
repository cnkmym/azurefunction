module.exports = function (context, req) {
    context.log('First Line');

    var clientId = req.query.clientId;

    if (req.query.zip === undefined || (req.query.zip === '')) {
        context.res = {
            status: 400, /* Defaults to 200 */
            body: "Please pass valid zip code on the query string first"
        };
        context.done();
    }
    else {
        var zip = req.query.zip;
        context.log('Ready to fetch weather for zip code ' + zip);


        var request = require('request');
        var url = "http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=imperial&zip="+zip;
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

        request.get({//
                url:url,
                json:true//
            }, function(err, resp, body) {
            context.log('Ready to process Backend Result');

            if (err) {
                context.log(err);
                context.res = {
                    status: body.cod,
                    body: 'Failed to Parse Response'
                };
            } else {
                var result = {};
                if (body.cod === 200) {
                    var weather = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' F';
                    result = {
                        'colorStyle': '',
                        'zip': zip,
                        'city': body.name,
                        'weather': weather,
                        'zipTime': getCurrentDatetime(),
                        'clientId' : clientId
                    };

                } else {
                    result = {
                        'colorStyle': 'warningText',
                        'city': 'Invalid Zip',
                        'weather': 'Invalid Zip',
                        'clientId' : clientId
                    };
                }
                context.log(result);
                context.res = {
                    status: 200,
                    body: JSON.stringify(result)
                };
                context.bindings.queryHistoryQueueItem = result;
            }

            context.done();
        });
    }


};
