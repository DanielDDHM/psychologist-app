import { Router } from 'express'
import { PatientController } from '../controller'

const router = Router()

router.get('/:id?', PatientController.get).post('/', PatientController.register)
export default router
