const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  readTime: { type: String },
  author: { type: String, default: 'Tim Dapur Mama' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
