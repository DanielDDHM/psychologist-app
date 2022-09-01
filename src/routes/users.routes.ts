import { Router } from "express"
import { UserController } from "../controller"

const router = Router()

router
  .get("/:id?", UserController.get)
  .post("/", UserController.create)
  .put("/:id", UserController.update)
  .patch("/confirm/:id", UserController.confirm)
  .patch("/active/:id", UserController.activate)
  .patch("/adminify", UserController.makeAdmin)
  .delete("/:id", UserController.destroy)

export default router
