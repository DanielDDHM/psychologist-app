import { Router } from 'express';

const router = Router();

router
  .get('/')
  .get('/:id')
  .post('/:id')
  .patch('/start')
  .patch('/accept/:id')
  .patch('/finish/:id')
  .patch('/delete/:id')
  .patch('/review/:id')

export default router