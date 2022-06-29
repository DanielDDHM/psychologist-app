import { Router } from 'express';

const router = Router();

router
  .get('/:id?')
  .post('/')
  .patch('/:id')
  .delete('/:id')

export default router