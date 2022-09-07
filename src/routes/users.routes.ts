import { Router } from "express"
import { UserController } from "../controller"
import { AuthMiddleware } from "../middleware"
import { DefaultTypes } from "../types"

const router = Router()

const { checkAuth, checkRole, checkToken } = AuthMiddleware
const { ADMIN, USER } = DefaultTypes.UserTypes

router
  .get("/:id?", checkToken, checkRole, checkAuth(USER), UserController.get)
  .post("/", UserController.create)
  .put("/:id", checkToken, checkRole, checkAuth(USER), UserController.update)
  .patch("/confirm/:id", checkToken, checkRole, checkAuth(USER), UserController.confirm)
  .patch("/active/:id", checkToken, checkRole, checkAuth(USER), UserController.activate)
  .patch("/adminify", checkToken, checkRole, checkAuth(ADMIN), UserController.makeAdmin)
  .delete("/:id", checkToken, checkRole, checkAuth(ADMIN), UserController.destroy)

export default router
