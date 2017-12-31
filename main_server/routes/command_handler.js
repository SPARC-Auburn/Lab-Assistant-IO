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

router.post('/', function (req, res, next) {
  console.log("<",req.body.question);
  var response = undefined
  var i = 0;
  for (i = 0; i < packageList.length; i++) {
    var keepgoing = packageList[i](req.body.question, function(data_received){
      response = data_received;
      if (response != undefined && response != ""){
        res.send({'ttsText': response});
        return false;
      }
      else{
        return true;
      }  
    })
    if(!keepgoing) break;
  }
});



// router.post('/', function (req, res, next) {
//   console.log("<",req.body.question);
//   var response = undefined
//   var i = 0;
//   while(i < packageList.length && response == undefined) {
//     packageList[i](req.body.question, function(data_received){
//       response = data_received;
//       if (response != undefined){
//         i = packageList.length;
//         res.send({'ttsText': response});
//       }
//       else{
//         i++;
//       }  
//     })    
//   }
// });


// router.post('/', function (req, res, next) {
//   console.log("<",req.body.question);
//   var response = undefined
//   var i = 0;
//   for (i = 0; i < packageList.length; i++) {
//     packageList[i](req.body.question, function(data_received){
//       response = data_received;
//       if (response != undefined){
//         i = packageList.length;
//         res.send({'ttsText': response});
//       }
//       else{
//         i++;
//       }  
//     })
//   }
// });

router.post('/reload_packages', function (req, res, next) {
  loadPackages();
});

loadPackages();

module.exports = router;