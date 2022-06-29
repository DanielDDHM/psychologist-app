import { Router } from 'express';

const router = Router();

router
  .get('/:id?')
  .post('/')
  .put('/:id')
  .patch('/:id')
  .delete('/:id')

export default router