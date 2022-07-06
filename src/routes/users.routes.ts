import { Router } from 'express';
import { UserController } from '../controller/users.controller';

const router = Router();

router
	.get('/:id?', UserController.getUser)
	.post('/', UserController.createUser)
	.post('/confirm/:id')
	.post('/active/:id')
	.delete('/:id')

export default router