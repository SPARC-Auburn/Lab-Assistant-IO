// @ts-check
// Set up DialogFlow
var fs = require('fs');
var apiai = require('apiai');
var path = require("path");
var jsonContent = JSON.parse(fs.readFileSync(path.resolve(__dirname)+"/aio_info.json").toString());
var app = apiai(jsonContent.dialogflowid);

module.exports.getResponse = function (query, callback){
  // Sends the query from the user to DialogFlow
  // Sends the response back to the command handler.
  var request = app.textRequest(query, {sessionId: '1'});
  request.on('response', function(response) {
    return(callback(processResponse(response)));
  });
  request.on('error', function(error) {
    console.log(error);
    return(callback(error));
  });
  request.end();
};

module.exports.getName = function (){
  return jsonContent.name;
}

function processResponse(response){
  // Parses through JSON response from Dialogue Flow.
  // Returns a string response or undefined if there is none.
  if (response.result.fulfillment.speech != undefined && response.result.fulfillment.speech != ""){
    return response.result.fulfillment.speech;
  }
  // Check intents and entities here for more advanced responses.
  else {
    // Finally return undefined to signify that there is no response.
    return undefined;
  }
}