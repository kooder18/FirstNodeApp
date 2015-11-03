var express = require('express');
var router = express.Router();
var request = require('request')
var ACCESS_TOKEN = 'ACCESSTOKENGOESHERE';


router.get('/dashboard', function(req, res) {
  var options = {
    url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + ACCESS_TOKEN,
  }
  request.get(options,function(error,response,body){
    var feed = JSON.parse(body)
    res.render('dashboard',{
      //instagram stores all the users data in a data object.
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
})

module.exports = router
