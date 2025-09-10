const Story = require('../models/Story');

exports.getAllStories = async (req, res) => 
{
  const stories = await Story.find({ project: req.query.project });
  res.json(stories);
};

exports.getStoriesByProject = async (req, res) => 
{
  try 
  {
    const { projectId } = req.params;
    const stories = await Story.find({ project: projectId });
    res.json(stories);
  }
  catch (err) 
  {
    res.status(500).json({ message: "Błąd przy pobieraniu stories", error: err.message });
  }
};

exports.getStory = async (req, res) => 
{
  const story = await Story.findById(req.params.id);
  res.json(story);
};

exports.createStory = async (req, res) =>
{
  const story = new Story(req.body);
  await story.save();
  res.status(201).json(story);
};

exports.updateStory = async (req, res) => 
{
  const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(story);
};

exports.deleteStory = async (req, res) => 
{
  await Story.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
