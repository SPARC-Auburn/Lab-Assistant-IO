const express = require('express');
const bodyParser = require('body-parser');
const apiai = require('apiai');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));

var sessionID = 1;
var apiaiMainIntent = apiai("d8cd9faa2fe14731b1187d05b7d6f409");
var applicationList = [];

/**
 * Loads packages from the packages folder
 */
function loadPackages() {

  applicationList = [];
  var normalizedPath = path.join('./', "packages");

  fs.readdirSync(normalizedPath).forEach(function (folder) {
    var aio_info = fs.readFileSync("./packages/" + folder + "/aio_info.json");
    var jsonContent = JSON.parse(aio_info);
    var names = jsonContent.names;
    names.forEach(function (name) {
      applicationList.push({
        [name]: jsonContent.queryHandler
      });
    })
    global[jsonContent.queryHandler] = require("../packages/" + folder);
  })
}

router.post('/', function (req, res, next) {
  var request = apiaiMainIntent.textRequest(req.body.question, {
    sessionId: sessionID
  });
  //console.log('< ' + request.query);

  request.on('response', function (response) {
    res.send({
      'ttsText': response.result.fulfillment.speech
    })
    // console.log('> ' + response.result.fulfillment.speech);
    // TODO: Is the code below needed?
    // if (response.result.source == 'domains') {
    //   res.send({
    //     'ttsText': response.result.fulfillment.speech
    //   })
    //   console.log(response.result.fulfillment.speech);
    // } else {
    //   var applicationFound = false;
    //   var applicationName = response.result.parameters.application;
    //   applicationList.forEach(function (applicationData) {
    //     if (applicationName in applicationData) {
    //       applicationFound = true;
    //       console.log(global[applicationData[applicationName]](response.result.parameters.query));
    //     }
    //   })
    //   if (!applicationFound) {
    //     res.send({
    //       'ttsText': 'Could not find an application with name ' + response.result.parameters.application
    //     })
    //     console.log('Could not find an application with name ' + response.result.parameters.application);
    //   }

    // }
  });

  request.on('error', function (error) {
    console.log(error);
  });

  request.end();

})

router.post('/reload_packages', function (req, res, next) {
  loadPackages();
})

loadPackages();

module.exports = router;