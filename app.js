var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var path = require('path')
var logger = require('morgan');
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var session = require('express-session');
var mongoStore = require('connect-mongo')(session)

var dbUrl = 'mongodb://localhost/mymovies';
mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'ddp',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}))

require('./config/routes')(app)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'bower_components')))

app.listen(port)

var env = process.env.NODE_ENV || 'development';
if('development' === env) {
  app.set('showStackError', true)
  app.locals.pretty = true
  mongoose.set('debug', true)
}

console.log('my mvie  started on port ' + port)






// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
