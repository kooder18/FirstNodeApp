var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
		// layout: 'auth_base',
    // title: 'User Dashboard!',
    // welcome: 'Welcome to your dashboard!'
  })
})

module.exports = router
