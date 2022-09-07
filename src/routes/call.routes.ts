import { Router } from "express"
import { CallController } from "../controller"
import { AuthMiddleware } from "../middleware"
import { DefaultTypes } from "../types"

const router = Router()

const { checkAuth, checkRole, checkToken } = AuthMiddleware
const { USER } = DefaultTypes.UserTypes

router
  .get("/:id", checkToken, checkRole, checkAuth(USER), CallController.get)
  .patch("/accept/:id", checkToken, checkRole, checkAuth(USER), CallController.accept)
  .patch("/start", checkToken, checkRole, checkAuth(USER), CallController.start)
  .patch("/review/:id", checkToken, checkRole, checkAuth(USER), CallController.review)

export default router
