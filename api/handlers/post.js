var mongoose = require('mongoose');
var postModel = require('../models/post');
var config = require('../config');
mongoose.connect(config.mongoURL)

module.exports.create = {
  // auth: 'jwt',

  handler: function(request, reply) {

    var postData = request.payload;
    // move this into a validation function asap.
    if (typeof postData === 'string') {
      postData = JSON.parse(postData);
    }

    if (postData.authKey !== config.apiKey) {
      return reply({
        message: 'please provide authentication key'
      }).code(401)
    }

    if (dupe(postData)) {
      return reply({
        message: 'Duplicate post data!'
      }).code(409);
    }

    if (typeof postData.title == 'string' &&
      typeof postData.body == 'string' &&
      Array.isArray(postData.tags) &&
      typeof postData.headerImg == 'string') {
      var post = new postModel(postData);

      post.comments = [];
      post.createdAt = new Date();
      post.updatedAt = new Date();

      post.save(function(error) {
        if (error) {
          reply({
            statusCode: 503,
            message: error
          })
        } else {
          reply({
            statusCode: 201,
            message: 'User Saved Successfully!'
          })
        }
      })

    } else {
      return reply({
        statusCode: 422
      });
    }

  }
};

function dupe(postData) {
  var postRead = mongoose.model('Post');
  var posts = postRead.find({
    title: postData.title,
    body: postData.body
  }, function(err, data) {
    if (err || data.length == 0) {
      return false;
    }

    return true;
  })
}

module.exports.read = {
  handler: function(request, reply) {
    var postRead = mongoose.model('Post');
    var posts = postRead.find({}, function(err, data) {
      if (err) {
        return reply({
          message: err
        }).code(500);
      }

      return reply(data);
    })

  }
}

module.exports.delete = {
  handler: function(request, reply) {
    return reply({
      result: 'Delete Post'
    });
  }
};
