import { Router } from 'express';
import healthRouter from './health';
import servicesRouter from './services';
import packagesRouter from './packages';
import testimonialsRouter from './testimonials';
import faqsRouter from './faqs';
import contactRouter from './contact';

const router = Router();

router.use('/', healthRouter);
router.use('/services', servicesRouter);
router.use('/packages', packagesRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/faqs', faqsRouter);
router.use('/contact', contactRouter);

export default router;
