import { Router } from 'express';

const router = Router();

router
	.get('/consultation/:id')
	.post('/room-status')
	.patch('/accept/:id')
	.patch('/start')
	.patch('/review/:id')

export default router
