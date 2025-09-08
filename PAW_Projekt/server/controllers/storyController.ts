import { Request, Response } from 'express';
import Story from '../models/Story';

export const getAllStories = async (req: Request, res: Response) => 
{
    const stories = await Story.find({ project: req.query.project });
    res.json(stories);
};

export const getStory = async (req: Request, res: Response) => 
{
    const story = await Story.findById(req.params.id);
    res.json(story);
};

export const createStory = async (req: Request, res: Response) => 
{
    const story = new Story(req.body);
    await story.save();
    res.status(201).json(story);
};

export const updateStory = async (req: Request, res: Response) => 
{
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(story);
};

export const deleteStory = async (req: Request, res: Response) => 
{
    await Story.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
