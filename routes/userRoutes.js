var express       = require('express')
  , request       = require('request')
  , cfg						= require('../config')
  , session				= require('express-session')
  , querystring		= require('querystring')

var router = express.Router();



router.get('/dashboard', function(req, res) {
  var options = {
		url: 'https://api.instagram.com/v1/users/self/feed?access_token=' +  req.session.access_token,
	}
	request.get(options, function(error, response, body){
	var feed = JSON.parse(body)
	res.render('dashboard', {
		feed: feed.data
	})
})
  })

router.get('/profile', function(req, res) {
  res.render('profile', {
    layout:'base'
		// layout: 'auth_base',
    // title: 'User Dashboard!',
    // welcome: 'Welcome to your dashboard!'
  })
  console.log('went to profile')
})

module.exports = router
