import { Router } from 'express';
import userRouter from '@/modules/user/router';

const router = Router();
userRouter(router);

export default router;