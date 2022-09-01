import { Router } from "express"
import { PsyController } from "../controller"

const router = Router()

router.get("/:id?", PsyController.get).post("/", PsyController.register)
export default router
