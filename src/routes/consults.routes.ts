import { Router } from 'express'
import { ConsultController } from '../controller'

const router = Router()

router
  .get('/:id?', ConsultController.get)
  .post('/', ConsultController.post)
  .patch('/:id/cancel', ConsultController.cancel)
  .patch('/:id/reschedule', ConsultController.reschedule)

export default router
