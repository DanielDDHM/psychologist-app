import { Router } from "express"
import { PsyController } from "../controller"
import { AuthMiddleware } from "../middleware"
import { DefaultTypes } from "../types"

const router = Router()

const { checkAuth, checkRole, checkToken } = AuthMiddleware
const { USER } = DefaultTypes.UserTypes

router
  .get("/:id?", checkToken, checkRole, checkAuth(USER), PsyController.get)
  .post("/", PsyController.register)
export default router
