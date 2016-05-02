var Index = require('../app/controllers//index');
var User = require('../app/controllers//user');
var Movie = require('../app/controllers/movie');
var _ = require('underscore');

module.exports = function (app) {
    // 定义路由
    // pre handle user
    app.use(function (req, res, next) {
        var _user = req.session.user;

        app.locals.user = _user;

         next();
    });
    // Index
    app.get('/', Index.index);

    // Movie
    app.get('/movie/:id', Movie.detail);
    app.get('/admin/update/:id', Movie.update);
    app.post('/admin/movie/new', Movie.save);
    app.get('/admin/list', Movie.list);
    app.delete('/admin/list', Movie.del);

    // User
    app.post('/user/signup', User.signup);
    app.get('/admin/userlist', User.list);
    app.post('/user/signin', User.signin);
    app.get('/logout', User.logout);
} 