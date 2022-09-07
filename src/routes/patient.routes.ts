import { Router } from "express"
import { PatientController } from "../controller"
import { AuthMiddleware } from "../middleware"
import { DefaultTypes } from "../types"

const router = Router()

const { checkAuth, checkRole, checkToken } = AuthMiddleware
const { USER } = DefaultTypes.UserTypes

router
  .get("/:id?", checkToken, checkRole, checkAuth(USER), PatientController.get)
  .post("/", PatientController.register)
export default router
