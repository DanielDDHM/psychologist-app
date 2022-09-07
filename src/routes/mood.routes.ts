import { Router } from "express"
import { MoodController } from "../controller"
import { AuthMiddleware } from "../middleware"
import { DefaultTypes } from "../types"

const router = Router()

const { checkAuth, checkRole, checkToken } = AuthMiddleware
const { USER } = DefaultTypes.UserTypes

router
  .get("/", checkToken, checkRole, checkAuth(USER), MoodController.get)
  .post("/:id", checkToken, checkRole, checkAuth(USER), MoodController.post)
  .put("/:id", checkToken, checkRole, checkAuth(USER), MoodController.edit)
  .delete("/", checkToken, checkRole, checkAuth(USER), MoodController.destroy)

export default router
