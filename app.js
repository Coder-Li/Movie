var express = require('express');
var port = process.env.PORT || 3000;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var _= require('underscore');

// var routes = require('./routes/index');
// var users = require('./routes/users');
mongoose.connect('mongodb://127.0.0.1/imooc');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// 改为 true
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
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
  Movie.fetch(function(err, movies){
    if(err){
      console.log(err);
    }
    res.render('index', {
      title: '首页',
      movies: movies
    }); 
  });  
});
// detail page
app.get('/movie/:id', function(req, res){
  var id = req.params.id;
  
  Movie.findById(id, function(err, movie){
    res.render('detail', {
      title: '详情' + movie.title,
      movie: movie
    });
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
// admin update movie
app.get('/admin/update/:id', function(req, res){
  var id = req.params.id;
  
  if(id){
    Movie.findById(id, function(err, movie){
      res.render('admin',{
        title: '后台更新页',
        movie: movie
      });
    });
  }
});

// admin post movie
app.post('/admin/movie/new', function(req, res){
  // console.log(req.body);
  // console.log(typeof req.body.movie);
  // console.log('title:' + req.body.movie.title);
  var id;
  var flag = typeof req.body.movie._id;
  if(flag === 'undefined'){
    console.log('新增数据。')
  }else{
    id = req.body.movie._id;
  }
  var movieObj = req.body.movie;
  var _movie;
  
  if(id !== 'undefined'){
    Movie.findById(id, function(err, movie){
      if(err){
        console.log(err);
      }
      
      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie){
        if(err){
          console.log(err);
        }
        
        res.redirect('/movie/' + movie._id);
      });
    });
  }
  else{
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    });
    
    _movie.save(function(err, movie){
      if(err){
          console.log(err);
        }
        
        res.redirect('/movie/' + movie._id);
    });
  }
});

// list page
app.get('/admin/list', function(req, res){
  Movie.fetch(function(err, movies){
    if(err){
      console.log(err);
    }
    
    res.render('list', {
      title: '列表页',
      movies: movies
    }); 
  });  
});

// list delete movie
app.delete('/admin/list', function(req, res){
  // console.log('run');
  var id = req.query.id;
  // console.log('id:' + id);
  if(id){
    Movie.remove({_id: id}, function(err, movie){
      if(err){
        // console.log('remove :' + typeof Movie.remove);
        console.log(err);
      }else{
        // console.log('success!');
        res.json({success: 1});
      }
    });
  }
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
