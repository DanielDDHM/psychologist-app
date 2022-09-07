import { Router } from "express"
import { DiagnosticController } from "../controller"
import { AuthMiddleware } from "../middleware"
import { DefaultTypes } from "../types"

const router = Router()
const { checkAuth, checkRole, checkToken } = AuthMiddleware
const { USER } = DefaultTypes.UserTypes

router
  .get("/", checkToken, checkRole, checkAuth(USER), DiagnosticController.get)
  .post("/:id", checkToken, checkRole, checkAuth(USER), DiagnosticController.post)
  .put("/:id", checkToken, checkRole, checkAuth(USER), DiagnosticController.edit)
  .delete("/", checkToken, checkRole, checkAuth(USER), DiagnosticController.destroy)

export default router
