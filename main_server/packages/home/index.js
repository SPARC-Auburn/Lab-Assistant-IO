// @ts-check
// Set up DialogFlow
var apiai = require('apiai');
var app = apiai("d8cd9faa2fe14731b1187d05b7d6f409");

module.exports = function(query, callback){
  // Send the query from the user to DialogFlow
  // Send the response back to the command handler.
  var request = app.textRequest(query, {sessionId: '1'});
  request.on('response', function(response) {
    console.log('> '+ response.result.fulfillment.speech);
    return(callback(processResponse(response)));
  });
  request.on('error', function(error) {
    console.log(error);
    return(callback(error));
  });
  request.end();
};

function processResponse(response){
  // Parses through JSON response from Dialogue Flow.
  // Returns a string response or undefined if there is none.
  if (response.result.fulfillment.speech != undefined){
    return response.result.fulfillment.speech;
  }
  // Check intents and entities here for more advanced responses.
  else {
    // Finally return undefined to signify that there is no response.
    return undefined;
  }
}