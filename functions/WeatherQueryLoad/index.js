module.exports = function (context, req) {
    if (req.query === undefined) {
        context.res = {
            status: 400,
            body: "Please pass valid ClientId on the query string"
        };
    } else {
        context.log('Ready to load Zip Code Query history for Client '+req.query.clientId);
        var documents = context.bindings.queryStorage;
        context.log('Successfully loaded '+documents.length + ' records');
        context.res = {
            status:200,
            body: JSON.stringify(documents)
        };
    }

    context.done();
};
