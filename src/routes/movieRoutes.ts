import { Router } from 'express';
import { getAllMovies } from '../controllers/movieController';

const router = Router();

router.get('/:skip?/:limit?', getAllMovies);

export default router;
