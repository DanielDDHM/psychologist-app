import { Request, Response } from "express"
import { StatusCode } from "../constants"
import { PatientService } from "../services"
import { PatientTypes } from "../types"

export namespace PatientController {

  export const getPat = async (req: Request, res: Response) => {
    const { params: { id }, query } = req
    try {
      const users = await PatientService.get({ id, ...query } as PatientTypes.get)
      return res.status(StatusCode.OK).send(users)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const register = async (req: Request, res: Response) => {
    const { body } = req
    try {
      const users = await PatientService.register(body as PatientTypes.register)
      return res.status(StatusCode.OK).send(users)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}