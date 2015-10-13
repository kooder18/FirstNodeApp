var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('search', {
    layout: 'base'
		// layout: 'auth_base',
    // title: 'User Dashboard!',
    // welcome: 'Welcome to your dashboard!'
  })
})


router.get('/searchResult', function(req, res) {
  res.render('searchResult', {
    layout: 'base'
		// layout: 'auth_base',
    // title: 'User Dashboard!',
    // welcome: 'Welcome to your dashboard!'
  })
})


router.get('/searchHistory', function(req, res) {
  res.render('searchHistory', {
    layout: 'base'
		// layout: 'auth_base',
    // title: 'User Dashboard!',
    // welcome: 'Welcome to your dashboard!'
  })
})

module.exports = router
