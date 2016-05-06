var express = require('express');
var port = process.env.PORT || 3000;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

//数据库URL
var dbUrl = 'mongodb://127.0.0.1/imooc';
mongoose.connect(dbUrl);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, './app/views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));   // 改为 true
app.use(cookieParser());
app.use(express.multipart());
app.use(session({
  secret : 'test',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));

if('development' === app.get('env')){
  app.set('showStackError', true);
  app.locals.pretty = true;
  mongoose.set('debug', true);
}

app.locals.moment = require('moment');

//routes!
require('./config/routes')(app);

app.listen(port);

console.log('server started on port ' + port);