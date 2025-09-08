import { Request, Response } from 'express';
import Project from '../models/Project';

export const getAllProjects = async (req: Request, res: Response) => 
    {
    const projects = await Project.find();
    res.json(projects);
};

export const getProject = async (req: Request, res: Response) => 
{
    const project = await Project.findById(req.params.id);
    res.json(project);
};

export const createProject = async (req: Request, res: Response) => 
{
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
};

export const updateProject = async (req: Request, res: Response) => 
{
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
};

export const deleteProject = async (req: Request, res: Response) => 
{
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
