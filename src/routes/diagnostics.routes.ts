import { Router } from "express"
import { DiagnosticController } from "../controller"

const router = Router()

router
  .get("/:id?", DiagnosticController.get)
  .post("/", DiagnosticController.post)
  .put("/:id", DiagnosticController.edit)
  .delete("/:id", DiagnosticController.destroy)

export default router
