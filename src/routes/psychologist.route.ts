import { Router } from 'express';
import { PsyController } from '../controller';

const router = Router();

router
  .post('/', PsyController.register)
export default router