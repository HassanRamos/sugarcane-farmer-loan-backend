const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  age: { type: Number, required: true },
  farmAddress: { type: String, required: true },
  landSize: { type: Number, required: true },
});

module.exports = mongoose.model('User', UserSchema);

