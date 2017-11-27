/**
 * @author Steffen Sullivan
 * Route for handling packages (uninstall, install, updaintg, etc)
 */

var express = require('express');
var router = express.Router();
var cmd = require('node-cmd');
const Git = require('nodegit');
const fs = require('fs');
const rimraf = require('rimraf');

// List all packages with ways to modify/install new ones
router.get('/', function (req, res, next) {
    res.render('packages')
});

router.get('/list_packages', function (req, res) {
    dirs = fs.readdirSync('packages/');
    dirList = [];
    dirs.forEach(function (dir) {
        if (fs.statSync('packages/' + dir).isDirectory()) {
            var packageInfo = {};
            var aio_info = fs.readFileSync("./packages/" + dir + "/aio_info.json");
            var jsonContent = JSON.parse(aio_info);
            var names = jsonContent.names;
            packageInfo.packageName = dir;
            packageInfo.names = names;
            dirList.push(packageInfo);
        }
    })
    res.send(dirList);
});

router.post('/install', function (req, res, next) {
    var repo = req.body.gitRepo;
    repo = repo.split("/");
    var repoName = repo[repo.length - 1].split(".")[0];
    Git.Clone(req.body.gitRepo, "packages/" + repoName)
        .then(function (repo) {
            cmd.get('cd packages/' + repoName + " && npm install", function (err, data, stderr) {
                if (err) {
                    res.send(err);
                } else {
                    fs.stat('packages/' + repoName + "/aio_info.json", function (err, stat) {
                        if (err) {
                            res.send("Error installing package, could not find the required aio_info.json file. Package was removed.");
                            // cmd.get('rm -rf packages/' + repoName);
                            rimraf('packages/' + repoName, ["rmdir"] , function () {});
                        } else {
                            res.send("success");
                        }
                    });
                }
            });

        });
});

router.post('/uninstall', function (req, res, next) {
    rimraf('packages/' + req.body.packageName, ["rmdir"], function () {
        res.send("done");
    });
})

module.exports = router;