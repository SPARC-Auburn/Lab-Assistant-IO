var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var command_handler = require('./routes/command_handler');
var index = require('./routes/index');
var settings = require('./routes/settings');
var packages = require('./routes/packages');
var devices = require('./routes/devices');
var documentation = require('./routes/documentation');


var app = express();
var opn = require('opn');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/command_handler', command_handler);
app.use('/', index);
app.use('/settings', settings);
app.use('/packages', packages);
app.use('/devices', devices);
app.use('/documentation', documentation);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
console.log('Assistant started on port 8433 (https://localhost:8443/).');
opn('https://localhost:8443/', {app: 'chrome'});

module.exports = app;
