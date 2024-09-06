import { Request, Response } from 'express';
import { getMOvies } from '../services/movieService';

export const getAllMovies = async (req: Request, res: Response) => {
   
    const skip = parseInt(req.params.skip) - 1
    const limit = parseInt(req.params.limit)
    const movies = await getMOvies(skip,limit);
    res.json(movies);
};


