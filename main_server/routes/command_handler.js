// @ts-check
// Set up Express.JS and pull in other modules
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');
const apiai = require('apiai');

var packageList = [];
var responseArray = [];

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

function loadPackages() {
  // Load the packages from the packages folder and add them to packageList
  var normalizedPath = path.join('./', "packages");
  fs.readdirSync(normalizedPath).forEach(function (folder) {
    var jsonContent = JSON.parse(fs.readFileSync("./packages/" + folder + "/aio_info.json").toString());
    // Add package only if it is enabled
    if (jsonContent.enabled == true){
      var package = require("../packages/" + folder);
      // Add package to end(last) if considered to be a default package else to the beginning(first)
      if (jsonContent.default == true){
        packageList.push(package); 
      }
      else{
        packageList.unshift(package);
      }      
    }    
  })
}

function printPackageNames(){
  var output = "packages installed = [";
  var i = 0;
  for (i = 0; i < packageList.length; i++) {
    output += " " + packageList[i].getName() + " ";
  }
  output += "]";
  console.log(output);
}

router.post('/', function (req, res, next) {
  var response = "";
  console.log("<",req.body.question);
  // This function repeatedly calls itself until the packages are all read.
  var readPackages = function (i) {
    if (i == packageList.length) {
      // we are done.
      console.log("Completed reading all packages.");
    } 
    else {
      packageList[i].getResponse(req.body.question, function(response){
        if (response != undefined && response != ""){
          console.log(packageList[i].getName() + "> " + response);
          res.send({'ttsText': response});
        }
        else{
          readPackages(i+1);
        }  
      });
    }
  };
  readPackages(0);
});

router.post('/reload_packages', function (req, res, next) {
  loadPackages();
  printPackageNames();
  
});

loadPackages();
printPackageNames();

module.exports = router;