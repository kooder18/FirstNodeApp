var express       = require('express')
  , request       = require('request')
  , cfg						= require('../config')
  , session				= require('express-session')
  , querystring		= require('querystring')
  , MongoClient     = require('mongodb').MongoClient
  , db              = require('../db')
  , Users           = require('../models/users')


var router = express.Router();



router.get('/dashboard', function(req, res) {
  var options = {
    url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + req.session.access_token,
  }
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

router.get('/profile', function(req, res) {
  if(req.session.userId){
    //find user
    Users.find(req.session.userId,function(document){
      //if the user doesn't exist, put them back to the homepage
      if(!document) return res.redirect('/')
      console.log(document)
      res.render('profile',{
            //Render the update view
        user:document
      })
    })
    //the user doesn't exist
  }else{
    res.redirect('/')
  }







  // res.render('profile', {
  //   layout:'base'
		// // layout: 'auth_base',
  //   // title: 'User Dashboard!',
  //   // welcome: 'Welcome to your dashboard!'
  // })
  // console.log('went to profile')
})

//something odd is happening when trying to add text to the profile page.
//there are bugs in the profile page, its only sending the bio form as the user.
//this should be an update rather than insert, but i'll leave it like it is until we get the data from instagram
router.post('/profile', function(req, res) {
    var user = req.body
    //how do we update only one field?
    console.log(user)
    // console.log(user)
    //this fails because of the odd stuff going on in the frontend.
    Users.create(user, function() {
      // res.redirect('/user/profile')
      res.render('profile',{
        user:user,
        success : "successful creation.  BUT THIS NEEDS TO BE AN UPDATE!"
      })
    })
})


module.exports = router
