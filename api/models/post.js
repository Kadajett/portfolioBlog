var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  headerImg: String,
  comments: [Schema.Types.Mixed],
  createdAt: Date,
  updatedAt: Date
})

module.exports = mongoose.model('Post', postSchema, 'Post');
