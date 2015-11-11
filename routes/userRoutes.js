var express       = require('express')
  , request       = require('request')
  , cfg						= require('../config')
  , session				= require('express-session')
  , querystring		= require('querystring')

var router = express.Router();


//put your access token from instagram here
//var ACCESS_TOKEN = '1468594452.1677ed0.879f17b6fe9247cbb4891898571f606/6';
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
