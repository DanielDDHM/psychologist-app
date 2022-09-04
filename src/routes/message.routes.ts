import { Router } from "express"
import { MessageController } from "../controller"

const router = Router()

router
  .get("/:id", MessageController.get)
  .post("/:id", MessageController.post)
  .delete("/", MessageController.destroy)

export default router
