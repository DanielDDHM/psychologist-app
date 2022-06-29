import { Router } from 'express';

const router = Router();

router
  .get('/')
  .get('/:id?')
  .get('/:id/report')
  .post('/')
  .post('/:id/report')
  .patch('/:id/cancel')
  .patch('/:id/reschedule')

export default router