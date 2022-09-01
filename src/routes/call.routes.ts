import { Router } from 'express'
import { CallController } from '../controller'

const router = Router()

router
  .get('/:id', CallController.get)
  .patch('/accept/:id', CallController.accept)
  .patch('/start', CallController.start)
  .patch('/review/:id', CallController.review)

export default router
