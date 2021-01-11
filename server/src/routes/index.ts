import { Router } from 'express';
import admin from './admin';

const router = Router();

router.use('/auth', admin);

export default router;
