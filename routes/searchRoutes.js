var express = require('express');
var bodyParser = require('body-parser')
var request = require('request')
var session = require('express-session')
var router = express.Router();
var MongoClient     = require('mongodb').MongoClient
var db              = require('../db')
var Users           = require('../models/users')

var ACCESS_TOKEN = '';

router.get('/', function(req, res) {
  res.render('search', {
    layout: 'base',
    username: req.session.user.username,
		// layout: 'auth_base',
    // title: 'User Dashboard!',
    // welcome: 'Welcome to your dashboard!'
  })
})

router.post('/',function(req,res){
  var userId = req.session.userId
  var tags = req.session.tags
  var form = req.body
  console.log(req.body)
  var options = {
      url:'https://api.instagram.com/v1/tags/'+ form.tag + '/media/recent?access_token=' + req.session.access_token,
  }
  if(form.search || form.submit){
    console.log("there is a value here")
      request.get(options,function(error,response,body){
        var feed = JSON.parse(body)
        console.log(feed)
        res.render('searchResult',{
          feed:feed.data,
          search:form.tag,
          username: req.session.user.username
        })
    })
  }
  else if(form.save){
      console.log("SAVE BUTTON PRESSED")
      //Add the tag to the user
      Users.addTag(userId, form.tag, function(){
        //here we need to pass the tag history to the frontend.
          Users.find(userId,function(document){
              res.render('searchHistory',{
                tags:document.tags,
                username: req.session.user.username
              })
          })
      })

  }else if(form.remove){
    console.log("TRYING TO REMOVE FROM THE DATABASE")
    Users.removeTag(userId,form.tag,function(){
          Users.find(userId,function(document){
              res.render('searchHistory',{
                tags:document.tags,
                username: req.session.user.username
              })
          })
    })
  }



})


router.post('/searchResult',function(req,res){
  console.log("WE'RE POSTING TO SEACH RESULT")
  console.log(req.body)
 var userId = req.session.userId
  var tags = req.session.tags
  var form = req.body
  console.log(tags)
  var options = {
      url:'https://api.instagram.com/v1/tags/'+ form.tag + '/media/recent?access_token=' + req.session.access_token,
  }
  if(form.search){
    console.log("there is a value here")
      request.get(options,function(error,response,body){
        var feed = JSON.parse(body)
        res.render('searchResult',{
        feed:feed.data,
        search:form.tag
        })
    })
  }else if(form.save){
      console.log("SAVE BUTTON PRESSED")
            //Add the tag to the user
      Users.addTag(userId, form.tag, function(){
        //here we need to pass the tag history to the frontend.
          Users.find(userId,function(document){
              res.render('searchHistory',{
                tags:document.tags
              })
          })
      })

  }else{
      request.get(options,function(error,response,body){
        var feed = JSON.parse(body)
        res.render('searchResult',{
        feed:feed.data,
        search:form.tag
        })
    })    
  }
})



router.post('/searchHistory',function(req,res){
  console.log(req.body)
 // var userId = req.session.userId
 //  var tags = req.session.tags
 //  var form = req.body
 //  console.log(tags)
 //  var options = {
 //      url:'https://api.instagram.com/v1/tags/'+ form.tag + '/media/recent?access_token=' + req.session.access_token,
 //  }
 //  if(form.search){
 //    console.log("there is a value here")
 //      request.get(options,function(error,response,body){
 //        var feed = JSON.parse(body)
 //        res.render('searchResult',{
 //        feed:feed.data,
 //        search:form.tag
 //        })
 //    })
 //  }
})


router.get('/searchResult', function(req, res) {
  res.render('searchResult', {
    layout: 'base'

  })
})


router.get('/searchHistory', function(req, res) {
  res.render('searchHistory', {
    layout: 'base'
//pass user saved tag data here		
  })
})


module.exports = router
