const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  userId: String,
  siteId: Number,
  content: String
});

const Content = mongoose.model("Content", ContentSchema);


module.exports = Content;