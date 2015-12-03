var express       = require('express')
  , request       = require('request')
  , cfg						= require('../config')
  , session				= require('express-session')
  , querystring		= require('querystring')
  , MongoClient     = require('mongodb').MongoClient
  , db              = require('../db')
  , Users           = require('../models/users')


var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    layout: 'index_base'
  	})
})


router.get('/authorize', function(req, res){
  var qs = {
    client_id: cfg.client_id,
    redirect_uri: cfg.redirect_uri,
    response_type: 'code'
  }

  var query = querystring.stringify(qs)

  var url = 'https://api.instagram.com/oauth/authorize/?' + query
  res.redirect(url)
})

router.get('/auth/finalize', function(req, res, next) {
  if (req.query.error == 'access_denied') {
    return res.redirect('/');
  }
  var post_data = {
    client_id: cfg.client_id,
    client_secret: cfg.client_secret,
    redirect_uri: cfg.redirect_uri,
    grant_type: 'authorization_code',
    code: req.query.code
  }

  var options = {
    url : ' https://api.instagram.com/oauth/access_token',
    form: post_data
  }

  request.post(options, function(error, response, body){
    try {
    var data = JSON.parse(body)

  }

    catch(err) {
      return next(err)
    }
    req.session.access_token = data.access_token,
    req.session.user = data.user
    res.redirect('/dashboard')
  })
})

router.get('/test',function(req,res){
      var user = //req.body
    {
      username: "usernameTEST",
      lname   : "lnameTEST",
      fname   : "fnameTEST",
      id      : 10,
    }
    // console.log(user)
    Users.insert(user, function() {
      console.log('It worked!')
      res.redirect('/dashboard')
    })
})


router.get('/dashboard', function(req, res){
  var options = {
    url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + req.session.access_token,
	}
  //adding the user to the database as soon as they login
  console.log(req.session)
  user = req.body
  Users.insert(user, function() {

  })
  // var currentdate = new Date();
  // if(req.session.cookie._expires > currentdate){
  //   console.log("the cookie is fine")
  // }

  // console.log(currentdate)
	request.get(options, function(error, response, body){
    try {
		var feed = JSON.parse(body)
    if(feed.meta.code > 200) {
      return next(feed.meta.error_message);
    }
  }

  catch(err) {
    return next(err)
  }
		res.render('dashboard', {
			feed: feed.data,
      username: req.session.user.username
		})
	})

})





module.exports = router
