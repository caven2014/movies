var User = require('../models/user')

exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '注册页面'
  })
}
exports.showSignin = function(req, res) {
  res.render('signin', {
    title: '登录页面'
  })
}

exports.signup = function(req, res) {
  var _user =  req.body.user
  User.findOne({name: _user.name}, function(err, user) {
    if(err) {
      console.log(err)
    }
    if(user) {
      return res.redirect('/signin')
    } else {
      var user = new User(_user)
      user.save(function(err, user) {
        if(err) {
          console.log(err)
        }
        res.redirect('/')
      })
    }
  })
}



exports.signin = function(req, res) {
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  User.findOne({name: name}, function(err, user) {
    if(err) {
      console.log(err)
    }

    if(!user) {
      return res.redirect('/')
    }

    user.comparePassword(password, function(err, isMatch) {
      if(err) {
        console.log(err)
      }
      if(isMatch) {
        console.log('password is matched')
        req.session.user = user
        return res.redirect('/')
      } else {
        return res.redirect('/signin')
        console.log('password is invalid')
      }

    })

  })

}



exports.logout = function(req, res) {
  delete req.session.user
  // delete app.locals.user
  res.redirect('/')
}


exports.list = function(req, res, next) {

  User.fetch(function(err, users) {
    if(err) {
      console.error(err)
    }
    res.render('userlist', {
      title: 'user list',
      users: users
    })
  })
}



exports.signinRequired = function(req, res, next) {
  var user = req.session.user
  if(!user) {
    return res.redirect('/signin')
  }
  next()
}

exports.adminRequired = function(req, res, next) {
  var user = req.session.user
  if(user.role <= 10) {
    return res.redirect('/signin')
  }
  next()
}
