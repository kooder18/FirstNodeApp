var express = require('express');
var router = express.Router();

router.get('/search', function(req, res) {
  res.render('search', {

		// layout: 'auth_base',
    // title: 'User Dashboard!',
    // welcome: 'Welcome to your dashboard!'
  })
})

module.exports = router
