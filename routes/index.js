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
    var user = data.user
    req.session.userId = data.user.id
    req.session.access_token = data.access_token,
    req.session.user = data.user
    user._id = user.id
    delete user.id
    Users.find(user._id,function(document){
      if(!document){
        Users.insert(user,function(result){
          res.redirect('/dashboard')
        })
      }else{
        res.redirect('/dashboard')
      }
    })
  })
})

router.get('/dashboard', function(req, res){
  var options = {
    url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + req.session.access_token,
	}
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
