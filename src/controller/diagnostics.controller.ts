import { Request, Response } from "express"
import { StatusCode } from "../constants"
import { DiagnosticService } from "../services"
import { DiagnosisTypes } from "../types/diagnosis.types"

export namespace DiagnosticController {
  export const get = async (req: Request, res: Response) => {
    try {
      const {
        query: { id, page, perPage },
      } = req
      const consult = await DiagnosticService.get({ id, page, perPage } as DiagnosisTypes.get)
      return res.status(StatusCode.OK).send(consult)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const post = async (req: Request, res: Response) => {
    try {
      const { params: { id }, body } = req
      const consult = await DiagnosticService.post({ id, ...body } as DiagnosisTypes.post)
      return res.status(StatusCode.OK).send(consult)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const edit = async (req: Request, res: Response) => {
    try {
      const {
        params: { id },
        body,
      } = req
      const consult = await DiagnosticService.edit({ id, ...body } as DiagnosisTypes.edit)
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
      const consult = await DiagnosticService.destroy({ id } as DiagnosisTypes.destroy)
      return res.status(StatusCode.OK).send(consult)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}
