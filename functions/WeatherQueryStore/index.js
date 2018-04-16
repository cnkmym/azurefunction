module.exports = function (context, req) {
    context.log('Ready to launch Weather Query History Storage Service');

    if (req.body === undefined || req.body.zipData === undefined){
        context.res = {
            status : 400,
            body: "Please include zipData in your post request"
        };
    }

    if (req.body === undefined || req.body.clientId === undefined){
        context.res = {
            status : 400,
            body: "Please include clientId in your post request"
        };
    }

    data = {
      'query': req.body.zipData,
      'clientId': req.body.clientId
    };

    context.bindings.queryStorage = JSON.stringify(data);
    context.res = {
        status: 200,
        body: "Save Operation is finished"
    };
    context.done();
};
