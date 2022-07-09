import { Router } from 'express';
import { PatientController } from '../controller';

const router = Router();

router
  .get('/:id?', PatientController.getPat)
  .post('/', PatientController.register)
export default router