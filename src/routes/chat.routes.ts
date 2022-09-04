import { Router } from "express"
import { ChatController } from "../controller"

const router = Router()

router
  .get("/:id?", ChatController.get)
  .post("/", ChatController.post)
  .patch("/start", ChatController.init)
  .patch("/finish", ChatController.finish)
  .put("/review", ChatController.review)
  .delete("/", ChatController.destroy)


export default router
