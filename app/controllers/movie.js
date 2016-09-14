var Movie = require('../models/movie')
var Comment = require('../models/comment')
var _ = require('lodash')


exports.detail = function(req, res, next) {
    var id = req.params.id

    Movie.findById(id, function(err, movie) {
      if (err) {
          console.error(err)
      }
      Comment.find({movie: id})
        .populate('from', 'name')
        .populate('reply.from reply.to', 'name')
        .exec(function(err, comments) {
        console.log(comments)
        res.render('detail', {
            title: '我的movies ' + movie.title,
            movie: movie,
            comments: comments
        })
      })
    })
}


exports.new = function(req, res, next) {
  res.render('admin', {
    title: '我的movies admin',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      language: '',
      summary: '',
      flash: ''
    }
  })
}

exports.update = function(req, res) {
  var id = req.params.id
  if(id) {
    Movie.findById(id, function(err, movie) {
      if(err) {
        console.error(err)
      }
      res.render('admin', {
        title: '我的movies admin',
        movie: movie
      })
    })
  }
}


exports.save = function(req, res) {
  var id = req.body._id
  var movieObj = req.body.movie
  var _movie
  if(id !== 'undefined') {
    Movie.findById(id, function(err, movie) {
      if(err){
        console.error(err)
      }
      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie) {
        if(err) {
          console.error(err)
        }
        // res.redirect('/movie/' + movie._id)
        res.redirect('/admin/movie/list')

      })
    })
  } else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash,
    })
    _movie.save(function(err, movie) {
      if(err) {
        console.error(err)
      }
      // res.redirect('/movie/' + movie._id)
      res.redirect('/admin/movie/list')
    })
  }
}

exports.list = function(req, res, next) {

  Movie.fetch(function(err, movies) {
    if(err) {
      console.error(err)
    }
    res.render('list', {
      title: '我的movies list',
      movies: movies
    })
  })
}


exports.del = function(req, res, next) {
  var id = req.query.id
  if(id) {
    Movie.remove({_id: id}, function(err, movie) {
      if(err) {
        console.error(err)
      } else {
        res.json({success: 1})
      }
    })
  }
}
