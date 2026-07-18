import { Router } from 'express';
import { getFaqs } from '../controllers/faqsController';

const router = Router();

router.get('/', getFaqs);

export default router;
