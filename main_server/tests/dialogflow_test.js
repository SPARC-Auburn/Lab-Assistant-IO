var apiai = require('apiai');

var app = apiai("d8cd9faa2fe14731b1187d05b7d6f409");

var request = app.textRequest('How are you?', {
    sessionId: '1'
});
request.on('response', function(response) {
    console.log(response.result.fulfillment.speech);
});
request.on('error', function(error) {
    console.log(error);
});
request.end();