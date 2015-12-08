var ObjectId = require('mongodb').ObjectId
var assert = require('assert')
var db = require('../db')

exports.insert = function(user, callback) {

  // Get the users collection
  var collection = db.get().collection('users')
  // Insert a user
  collection.insert(user, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    assert.equal(1, result.ops.length)
    console.log(user)
    console.log('Inserted 1 document into the users collection')
    callback(result)
  })
}



exports.find = function(id,callback){
  //get the users collection
  var collection = db.get().collection('users')
  // Find a user
  //findOne is a variant of find, we only want 1 instead of ALL users of same id.
  //the ObjectId(id) ensures that we send them an object rather than a string. mongoDB won't accept a string.
  collection.findOne({'_id':id}, function(err, document) {
    assert.equal(err, null)
    // assert.equal(1, result.result.n)
    // assert.equal(1, result.ops.length)
    console.log('Found 1 user document')
    callback(document)
  })
}

exports.update = function(user,callback){
  //get the users collection
  var collection = db.get().collection('users')
  // console.log(user._id)
  collection.update({'_id': user._id},user, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    // assert.equal(1, result.ops.length)
    console.log('updated 1 user document')
    callback()
  })
}




exports.addTag = function(userId,tag,callback){
  //get the users collection
  var collection = db.get().collection('users') 
  // Add the tag
  collection.update(
    {'_id': userId},
    { $addToSet: {tags: tag}}, 
    function(err, result) {
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      // assert.equal(1, result.ops.length)
      console.log('pushed 1 tag to the user')
      callback()
  })
}


exports.removeTag = function(userId,tag,callback){
  //get the users collection
  var collection = db.get().collection('users') 
  // Add the tag
  collection.update(
    {'_id': userId},
    { $pull: {tags: tag}}, 
    function(err, result) {
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      // assert.equal(1, result.ops.length)
      console.log('pushed 1 tag to the user')
      callback()
  })
}