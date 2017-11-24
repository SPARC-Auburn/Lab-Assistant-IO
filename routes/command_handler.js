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

var sessionID = uuidv1();
var apiai = apiai("112abae1919f4232b22ce834d6e99713");
var applicationList = [];

function loadApplications() {

  applicationList = [];
  var normalizedPath = path.join('./', "packages");

  fs.readdirSync(normalizedPath).forEach(function(folder) {
    var aio_info = fs.readFileSync("./packages/" + folder + "/aio_info.json");
    var jsonContent = JSON.parse(aio_info);
    applicationList.push(jsonContent);
    global[jsonContent.queryHandler] = require("../packages/" + folder);
  })
}

router.post('/', function(req, res, next) {
  var request = apiai.textRequest(req.body.question, {
    sessionId: sessionID
  });

  request.on('response', function(response) {
    if (response.result.source == 'domains') {
      res.send({'ttsText': response.result.fulfillment.speech})
    }
    else {
      var applicationFound = false;
      for (var application in applicationList) {
        if (applicationList.hasOwnProperty(application)) {
          for (var applicationName in applicationList[application].names) {
            if (applicationList[application].names.hasOwnProperty(applicationName)) {
              if (applicationList[application].names[applicationName] == response.result.parameters.application) {
                applicationFound = true;
                console.log(global[applicationList[application].queryHandler](response.result.parameters.query));
              }
            }
          }
        }
      }
      if(!applicationFound) {
        res.send({
          'ttsText': 'Could not find an application with name ' + response.result.parameters.application
        })
      }

    }
  });

  request.on('error', function(error) {
    console.log(error);
  });

  request.end();

})

router.post('/reload_applications', function(req, res, next){
  loadApplications();
})

module.exports = router;
