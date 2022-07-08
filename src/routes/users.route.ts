import { Router } from 'express';
import { UserController } from '../controller';

const router = Router();

router
	.get('/:id?', UserController.getUser)
	.post('/', UserController.createUser)
	.put('/:id', UserController.updateUser)
	.patch('/confirm/:id', UserController.confirmUser)
	.patch('/active/:id', UserController.activateUser)
	.patch('/adminify', UserController.makeAdmin)
	.delete('/:id', UserController.deleteUser)

export default router