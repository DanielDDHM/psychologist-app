import { Router } from 'express';
import { PsyController } from '../controller';

const router = Router();

router
  .get('/:id?', PsyController.getPsy)
  .post('/', PsyController.register)
export default router