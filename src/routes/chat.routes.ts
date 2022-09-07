import { Router } from "express"
import { ChatController } from "../controller"
import { AuthMiddleware } from "../middleware"
import { DefaultTypes } from "../types"

const router = Router()
const { checkAuth, checkRole, checkToken } = AuthMiddleware
const { USER, ADMIN } = DefaultTypes.UserTypes

router
  .get("/:id?", checkToken, checkRole, checkAuth(USER), ChatController.get)
  .post("/", ChatController.post)
  .patch("/start", checkToken, checkRole, checkAuth(USER), ChatController.init)
  .patch("/finish", checkToken, checkRole, checkAuth(USER), ChatController.finish)
  .put("/review", checkToken, checkRole, checkAuth(USER), ChatController.review)
  .delete("/", checkToken, checkRole, checkAuth(ADMIN), ChatController.destroy)

export default router
