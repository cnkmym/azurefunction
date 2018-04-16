module.exports = function (context, queryItem) {
    context.log('Ready to store query entry into history table', queryItem);

    context.bindings.newDocument = JSON.stringify(queryItem);

    context.done();
};
