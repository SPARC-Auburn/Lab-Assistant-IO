var express = require('express');
var router = express.Router();
var cmd = require('node-cmd');
const Git = require('nodegit');

// List all packages with ways to modify/install new ones
router.get('/', function(req, res, next) {
    res.render('packages')
});

router.post('/install', function(req, res, next){
    var repo = req.body.gitRepo;
    repo = repo.split("/");
    var repoName = repo[repo.length - 1].split(".")[0];
    Git.Clone(req.body.gitRepo, "packages/"+repoName)
    .then(function(repo){
        cmd.get('cd packages/' + repoName + " && npm install",function(err, data, stderr){
            if(err) {
                res.send(err);
            }
            else {
                res.send("success");
            }
        });
    
    });
});

module.exports = router;