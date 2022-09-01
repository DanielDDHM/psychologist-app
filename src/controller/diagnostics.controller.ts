import { Request, Response } from "express"
import { StatusCode } from "../constants"
import { DiagnosticService } from "../services"

export namespace DiagnosticController {
  export const get = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
      } = req
      const consult = await DiagnosticService.get(id)
      return res.status(StatusCode.OK).send(consult)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const post = async (req: Request, res: Response) => {
    try {
      const { body } = req
      const consult = await DiagnosticService.post(body)
      return res.status(StatusCode.OK).send(consult)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const edit = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
        body,
      } = req
      const consult = await DiagnosticService.edit({ id, body })
      return res.status(StatusCode.OK).send(consult)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const destroy = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
      } = req
      const consult = await DiagnosticService.destroy(id)
      return res.status(StatusCode.OK).send(consult)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}
