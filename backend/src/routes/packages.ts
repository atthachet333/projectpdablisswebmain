import { Router } from 'express';
import { getPackages } from '../controllers/packagesController';

const router = Router();

router.get('/', getPackages);

export default router;
