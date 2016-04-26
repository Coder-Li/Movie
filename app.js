var express = require('express');
var port = process.env.PORT || 3000;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// var routes = require('./routes/index');
// var users = require('./routes/users');
mongoose.connect('mongodb://localhost/imooc');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

console.log('server started on port ' + port);
// 定义路由
// index page
// app.get('/', function(req, res){
//   res.render('index', {
//     title: '首页'
//   });
// });
// // detail page
// app.get('/movie/:id', function(req, res){
//   res.render('detail', {
//     title: '详情'
//   });
// });
// // admin page
// app.get('/admin/movie', function(req, res){
//   res.render('admin', {
//     title: '录入'
//   });
// });
// // list page
// app.get('/admin/list', function(req, res){
//   res.render('list', {
//     title: '列表'
//   });
// });

app.get('/', function(req, res){
  res.render('index', {
    title: '首页',
    movies: [{
      title: '机械战警',
      _id: 1,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 2,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 3,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 4,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 5,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: '机械战警',
      _id: 6,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    }]
  });
});
// detail page
app.get('/movie/:id', function(req, res){
  res.render('detail', {
    title: '详情',
    movie: {
      doctor: '何塞·帕蒂利亚',
      country: '美国',
      title: '机械战警',
      year: 2014,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
      language: '英语',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: '简介就随便写点吧'
    }
  });
});
// admin page
app.get('/admin/movie', function(req, res){
  res.render('admin', {
    title: '录入',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  });
});
// list page
app.get('/admin/list', function(req, res){
  res.render('list', {
    title: '列表',
    movies: [{
      title: '机械战警',
      _id: 1,
      doctor: 'ABCDEFG',
      country: '美国',
      year: 2014,
      language: '英语',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: '简介就随便写点吧'
    }]
  });
});

// // app.use('/', routes);
// // app.use('/users', users);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// module.exports = app;
