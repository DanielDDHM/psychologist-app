import { Router } from 'express';
import { PatientController } from '../controller';

const router = Router();

router
  .post('/', PatientController.register)
export default router