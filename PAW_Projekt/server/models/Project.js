const mongoose = require('mongoose');
const Story = require('./Story'); 

const ProjectSchema = new mongoose.Schema(
{
  name: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

ProjectSchema.pre('deleteOne', { document: true, query: false }, async function(next) 
{
  const projectId = this._id;
  await Story.deleteMany({ project: projectId });
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
