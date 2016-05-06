var Movie = require('../models/movie');
var Category = require('../models/category');
// index page
exports.index = function (req, res) {
    Category
        .find({})
        .populate({ path: 'movies', options: { limit: 5 } })
        .exec(function (err, categories) {

            if (err) {
                console.log(err);
            }

            res.render('index', {
                title: '首页',
                categories: categories
            });
        });

}
// search 
exports.search = function (req, res) {
    var catId = req.query.cat;
    var page = parseInt(req.query.p, 10) || 0;
    //每页条目数
    var count = 2;
    var index = page * count;
    var q= req.query.q;
    
    if (catId) {
        Category
            .find({ _id: catId })
            .populate({
                path: 'movies',
                select: 'title poster',
                //  options: { limit: 2, skip: index } 
            })
            .exec(function (err, categories) {

                if (err) {
                    console.log(err);
                }

                var category = categories[0] || {};
                var movies = category.movies || [];
                var results = movies.slice(index, index + count);

                res.render('results', {
                    title: '结果列表',
                    keyword: category.name,
                    currentPage: (page + 1),
                    movies: results,
                    totalPage: Math.ceil(movies.length / count),
                    query: 'cat=' + catId
                });
            });
    }
    else{
        Movie
            .find({title: new RegExp(q + '.*', 'i')})
            .exec(function(err, movies){
                if (err) {
                    console.log(err);
                }

                var results = movies.slice(index, index + count);

                res.render('results', {
                    title: q,
                    keyword: q,
                    currentPage: (page + 1),
                    movies: results,
                    totalPage: Math.ceil(movies.length / count),
                    query: 'q=' + q
                });
            })
    }

}