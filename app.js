var express = require('express');
var port = process.env.PORT || 3000;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var User = require('./models/user');
var _= require('underscore');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

//数据库URL
var dbUrl = 'mongodb://127.0.0.1/imooc';
// var routes = require('./routes/index');
// var users = require('./routes/users');
mongoose.connect(dbUrl);

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
app.use(session({
  secret : 'test',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('server started on port ' + port);

// 定义路由
// pre handle user
app.use(function(req, res, next){
  var _user = req.session.user;
  if(_user){
    app.locals.user = _user;
  }
    return next();
});

// index page
app.get('/', function(req, res){
  console.log('user:');
  console.log(req.session.user);
  
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

// signup
app.post('/user/signup', function(req,res){
  var _user = req.body.user;
  var user = new User(_user);
  // req.param('user');    // not params     url>body>query
  // console.log(_user);
  //用户名校验
  User.find({name: _user.name}, function(err, user){
    if(err){
      console.log(err);
    }
    if(user){
      return res.redirect('/');
    }else{
      
      //密码校验代码
      
      //
      user.save(function(err, user){
        if(err){
          console.log(err);
        }
        
        res.redirect('/admin/userlist');
      });
    }
  })
});

// userlist page
app.get('/admin/userlist', function(req, res){
  User.fetch(function(err, users){
    if(err){
      console.log(err);
    }
    
    res.render('userlist', {
      title: '用户列表页',
      users: users
    });  
  });  
});

//signin page
app.post('/user/signin', function(req, res){
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;
  
  User.findOne({name: name}, function(err, user){
    if(err){
      console.log(err);
    }
    if(!user){
      return res.redirect('/');
    }
    
    user.comparePassword(password, function(err, isMatch){
      if(err){
        console.log(err);
      }
      
      if(isMatch){
        req.session.user = user;        
        return res.redirect('/');
      }else{
        // return res.redirect
        console.log('Password is not matched');
      }
    });
  });
});


//logout 
app.get('/logout', function(req, res){
  delete req.session.user;
  delete app.locals.user;
  
  res.redirect('/');
})
