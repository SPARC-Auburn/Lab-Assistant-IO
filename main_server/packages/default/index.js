// @ts-check
// Set up DialogFlow
var apiai = require('apiai');
var app = apiai("d8cd9faa2fe14731b1187d05b7d6f409");


module.exports = function(value, callback){
  console.log("Default received command: ",value);
  var dialogFlowResponse = "";
  var request = app.textRequest(value, {
    sessionId: '1'
  });
  request.on('response', function(response) {
    console.log(response.result.fulfillment.speech);
    return(callback(response.result.fulfillment.speech));
  });
  request.on('error', function(error) {
    console.log(error);
    return(callback(error));
  });
  request.end();
};

