import { Router } from "express"
import { MessageController } from "../controller"
import { AuthMiddleware } from "../middleware"
import { DefaultTypes } from "../types"

const router = Router()
const { checkAuth, checkRole, checkToken } = AuthMiddleware
const { USER, ADMIN } = DefaultTypes.UserTypes

router
  .get("/:id", checkToken, checkRole, checkAuth(USER), MessageController.get)
  .post("/:id", checkToken, checkRole, checkAuth(USER), MessageController.post)
  .delete("/", checkToken, checkRole, checkAuth(ADMIN), MessageController.destroy)

export default router
