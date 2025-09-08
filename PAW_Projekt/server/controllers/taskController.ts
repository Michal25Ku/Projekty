import { Request, Response } from 'express';
import Task from '../models/Task';

export const getAllTasks = async (req: Request, res: Response) => 
{
    const tasks = await Task.find({ story: req.query.story });
    res.json(tasks);
};

export const getTask = async (req: Request, res: Response) => 
{
    const task = await Task.findById(req.params.id);
    res.json(task);
};

export const createTask = async (req: Request, res: Response) => 
{
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => 
{
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => 
{
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
