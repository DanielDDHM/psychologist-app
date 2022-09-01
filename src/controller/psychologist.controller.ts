import { Request, Response } from "express"
import { PsyService } from "../services"
import { StatusCode } from "../constants"
import { PsyTypes } from "../types"

export namespace PsyController {
  export const get = async (req: Request, res: Response) => {
    const {
      params: { id },
      query,
    } = req
    try {
      const users = await PsyService.get({ id, ...query } as PsyTypes.get)
      return res.status(StatusCode.OK).send(users)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const register = async (req: Request, res: Response) => {
    const { body } = req
    try {
      const users = await PsyService.register(body as PsyTypes.register)
      return res.status(StatusCode.OK).send(users)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}
