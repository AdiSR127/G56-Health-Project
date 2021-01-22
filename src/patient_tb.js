const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name: String,
  pid: String,
  pass: String
});
module.exports=mongoose.model('patients',Schema);