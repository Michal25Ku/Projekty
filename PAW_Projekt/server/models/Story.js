const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['niski', 'średni', 'wysoki'], default: 'średni' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  createdAt: { type: Date, default: Date.now },
  state: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Story', StorySchema);
