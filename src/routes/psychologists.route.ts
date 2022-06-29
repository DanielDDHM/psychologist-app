import { Router } from 'express';

const router = Router();

router
  .get('/:id?')
  .get('/consultations')
  .post('/')
  .put('/:id')
  .delete('/:id')

export default router