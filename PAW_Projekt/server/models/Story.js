const mongoose = require('mongoose');
const Task = require('./Task'); 

const StorySchema = new mongoose.Schema(
{
  name: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['niski', 'średni', 'wysoki'], default: 'średni' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  createdAt: { type: Date, default: Date.now },
  state: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

StorySchema.pre('deleteOne', { document: true, query: false }, async function(next) 
{
  await Task.deleteMany({ story: this._id });
  next();
});

StorySchema.pre('findOneAndDelete', async function(next) 
{
  const storyId = this.getQuery()._id;
  if (storyId) {
    await Task.deleteMany({ story: storyId });
  }
  next();
});

StorySchema.pre('deleteMany', async function(next) 
{
  const filter = this.getFilter();
  const stories = await mongoose.model('Story').find(filter);
  const storyIds = stories.map(s => s._id);
  if (storyIds.length > 0) {
    await Task.deleteMany({ story: { $in: storyIds } });
  }
  next();
});

module.exports = mongoose.model('Story', StorySchema);