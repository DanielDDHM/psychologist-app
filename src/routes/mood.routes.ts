import { Router } from "express"
import { MoodController } from "../controller"

const router = Router()

router
  .get("/", MoodController.get)
  .post("/:id", MoodController.post)
  .put("/:id", MoodController.edit)
  .delete("/", MoodController.destroy)

export default router
