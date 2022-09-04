import { Router } from "express"
import { DiagnosticController } from "../controller"

const router = Router()

router
  .get("/", DiagnosticController.get)
  .post("/:id", DiagnosticController.post)
  .put("/:id", DiagnosticController.edit)
  .delete("/", DiagnosticController.destroy)

export default router
