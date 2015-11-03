var express = require('express');
var request = require('request');
var router = express.Router();
//put your access token from instagram here
var ACCESS_TOKEN = '';
>>>>>>> f152790026db87dc412a953539da56aa40746396


router.get('/dashboard', function(req, res) {
  var options = {
		url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + ACCESS_TOKEN,
	}
	request.get(options, function(error, response, body){
		console.log(body)
	var feed = JSON.parse(body)
	res.render('dashboard', {
		feed: feed.data
	})
>>>>>>> f152790026db87dc412a953539da56aa40746396
})
  })


router.get('/profile', function(req, res) {
  res.render('profile', {
    layout:'base'
		// layout: 'auth_base',
    // title: 'User Dashboard!',
    // welcome: 'Welcome to your dashboard!'
  })
})

module.exports = router
