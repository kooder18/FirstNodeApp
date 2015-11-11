var express = require('express');
var bodyParser = require('body-parser')
var request = require('request')
var session = require('express-session')
var router = express.Router();
var ACCESS_TOKEN = '';

router.get('/', function(req, res) {
  res.render('search', {
    layout: 'base'
		// layout: 'auth_base',
    // title: 'User Dashboard!',
    // welcome: 'Welcome to your dashboard!'
  })
})

router.post('/',function(req,res){
  var form = req.body
  console.log(form.search)
    var options = {
      url:'https://api.instagram.com/v1/tags/'+ form.search + '/media/recent?access_token=' + req.session.access_token,
    // url: 'https://api.instagram.com/v1/tags/search?q=' + form.search + '&access_token=' + ACCESS_TOKEN,
  }
  request.get(options,function(error,response,body){
    var feed = JSON.parse(body)
    console.log(feed.data)
    res.render('searchResult',{
      //instagram stores all the users data in a data object.
      feed: feed.data
    })
  })
})


router.post('/searchResult',function(req,res){
  var form = req.body
  console.log(form.search)
    var options = {
      url:'https://api.instagram.com/v1/tags/'+ form.search + '/media/recent?access_token=' + req.session.access_token,
    // url: 'https://api.instagram.com/v1/tags/search?q=' + form.search + '&access_token=' + ACCESS_TOKEN,
  }
  request.get(options,function(error,response,body){
    var feed = JSON.parse(body)
    console.log(feed.data)
    res.render('searchResult',{
      //instagram stores all the users data in a data object.
      feed: feed.data
    })
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
