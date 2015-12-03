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
		// layout: 'auth_base',
    // title: 'User Dashboard!',
    // welcome: 'Welcome to your dashboard!'
  })
})


//in both posts we also need to find the user based on id and add a saved search to their object based on whether they selected the "save search" button or not
router.post('/',function(req,res){
  var form = req.body
  console.log(form.search)
    var options = {
      url:'https://api.instagram.com/v1/tags/'+ form.search + '/media/recent?access_token=' + req.session.access_token,
  }
  //WE SHOULD ONLY DO ALL OF THIS IF THE USER SELECTS "SAVE SEARCH"
  if(req.session.userId){
    //find user
    Users.find(req.session.userId,function(document){
      if(!document) return res.redirect('/')
        console.log(document.username)
      //saving a search into the saved_searches array
      document.saved_searches.push(form.search) 
        // console.log(document.saved_searches[0])
      // document.saved_searches.push(form.search)
      // console.log(document)
  //update the user object in the db.
      Users.update(document,function(){
          request.get(options,function(error,response,body){
            var feed = JSON.parse(body)
            res.render('searchResult',{
              feed: feed.data
            })
          })
      })
    })
    //the user doesn't exist
  }else{
    res.redirect('/')
  }




})


router.post('/searchResult',function(req,res){
  var form = req.body
  console.log(form.search)
    var options = {
      url:'https://api.instagram.com/v1/tags/'+ form.search + '/media/recent?access_token=' + req.session.access_token,
  }
  request.get(options,function(error,response,body){
    var feed = JSON.parse(body)
    console.log(feed.data)
    res.render('searchResult',{
      feed: feed.data
    })
  })
})


router.get('/searchResult', function(req, res) {
  res.render('searchResult', {
    layout: 'base'

  })
})


router.get('/searchHistory', function(req, res) {
  res.render('searchHistory', {
    layout: 'base'
		
  })
})


module.exports = router
