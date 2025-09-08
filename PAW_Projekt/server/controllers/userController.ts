import { Request, Response } from 'express';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => 
{
    const users = await User.find();
    res.json(users);
};

export const getUser = async (req: Request, res: Response) => 
{
    const user = await User.findById(req.params.id);
    res.json(user);
};

export const createUser = async (req: Request, res: Response) => 
{
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => 
{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => 
{
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
