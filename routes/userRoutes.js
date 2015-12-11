var express       = require('express')
  , request       = require('request')
  , cfg						= require('../config')
  , session				= require('express-session')
  , querystring		= require('querystring')
  , MongoClient     = require('mongodb').MongoClient
  , db              = require('../db')
  , Users           = require('../models/users')


var router = express.Router();



router.get('/dashboard', function(req, res, next) {
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

router.get('/profile', function(req, res) {
  if(req.session.userId){
    //find user
    Users.find(req.session.userId,function(document){
      //if the user doesn't exist, put them back to the homepage
      if(!document) return res.redirect('/')
      console.log(document)
      res.render('profile',{
            //Render the update view
        user:document,
        username: req.session.user.username
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
  console.log("POSTING FROM THE PROFILE PAGE")
  console.log(req.body)
  req.session.user.bio = req.body.bio
  req.session.user.website = req.body.website
  req.session.user.full_name = req.body.full_name
  req.session.user.username = req.body.username
  if(req.session.userId){
  Users.update(req.session.user, function(){
    Users.find(req.session.userId,function(document){
      //if the user doesn't exist, put them back to the homepage
      if(!document) return res.redirect('/')
      console.log(document)
      res.render('profile',{
            //Render the update view
        user:document,
        username: req.session.user.username
      })
    })
  })
}else{
    res.redirect('/')
}
  // if(req.body.bio){
  //   console.log("BIO CHANGED")
  //   console.log(req.session.user)
  //   req.session.user.bio = req.body.bio
  // }
  // console.log(req.body)
    // if(req.body.bio){
    //   console.log('bio edited')
    // }else if(req.body.username){
    //     Users.updateUsername(req.session.userId,req.body, function() {
    //       // res.redirect('/user/profile')
    //       res.render('profile',{
    //         user:document,
    //         success : "Successfully updated the username"
    //       })
    //     })
    // }

})


module.exports = router
