var Movie = require('../models/movie')

exports.index = function(req, res, next) {
  Movie.fetch(function(err, movies) {
    if(err) {
      console.error(err)
    }
    res.render('index', {
      title: '我的movies',
      movies: movies
    })
  })
}
