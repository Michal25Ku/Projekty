const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => 
{
  const tasks = await Task.find({ story: req.query.story });
  res.json(tasks);
};

exports.getTasksByStory = async (req, res) => 
{
  try 
  {
    const { storyId } = req.params;
    const tasks = await Task.find({ story: storyId });
    res.json(tasks);
  }
  catch (err) 
  {
    res.status(500).json({ message: "Błąd przy pobieraniu Tasków", error: err.message });
  }
};

exports.getTask = async (req, res) => 
{
  const task = await Task.findById(req.params.id);
  res.json(task);
};

exports.createTask = async (req, res) => 
{
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => 
{
  const update = { ...req.body };

  if (update.assignedUser === undefined || update.assignedUser === "")
    update.$unset = { assignedUser: 1 };

  const task = await Task.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => 
{
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
