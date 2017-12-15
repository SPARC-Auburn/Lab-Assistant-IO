// @ts-check
const express = require('express');
const bodyParser = require('body-parser');
const apiai = require('apiai');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');

var packageList = [];

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));

/**
 * Loads packages from the packages folder
 */
function loadPackages() {
  var normalizedPath = path.join('./', "packages");

  fs.readdirSync(normalizedPath).forEach(function (folder) {
    var aio_info = fs.readFileSync("./packages/" + folder + "/aio_info.json");
    var jsonContent = JSON.parse(aio_info);
    var package_name = jsonContent.name;
    var package = require("../packages/" + folder);
    packageList.push(package);
  })
}

router.post('/', function (req, res, next) {
  var response = '';
  console.log("Handling Command...");
  // TODO: Figure out way to loop through multiple packages and send first defined response
  //for (const package in packageList) {
    console.log("<",req.body.question);
    //response = 'Default response'
    //response = defaultPackage.processQuery(req.body.question);
    const defaultPackage = require('../packages/default');
    defaultPackage(req.body.question, function(data_received){
      response = data_received;
      res.send({
        'ttsText': response
      }) 
    })
    // if (response != undefined){
    //   res.send({
    //     'ttsText': response
    //   })
    //   return;
    // }  
});

router.post('/reload_packages', function (req, res, next) {
  loadPackages();
});

loadPackages();

module.exports = router;