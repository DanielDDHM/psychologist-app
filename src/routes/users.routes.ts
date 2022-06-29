import { Router } from 'express';

const router = Router();

router
	.get('/:id')
	.post('/confirm/:id')
	.post('/active/:id')
	.delete('/:id')

export default router