const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['admin', 'devops', 'developer'], default: 'developer' }
});

module.exports = mongoose.model('User', UserSchema);
