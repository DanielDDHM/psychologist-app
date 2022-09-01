import { Router } from "express"
import { ChatController } from "../controller"

const router = Router()

router
  .get("/:id", ChatController.get)
  .post("/:id", ChatController.post)
  .patch("/start", ChatController.init)
  .patch("/accept/:id", ChatController.accept)
  .patch("/finish/:id", ChatController.finish)
  .patch("/delete/:id", ChatController.destroy)
  .patch("/review/:id", ChatController.review)

export default router
