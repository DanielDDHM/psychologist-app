import { Request, Response } from 'express'
import { StatusCode } from '../constants'
import { ConsultService } from '../services'

export namespace ConsultController {
  export const get = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
      } = req
      const consult = await ConsultService.get(id)
      return res.status(StatusCode.OK).send(consult)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
  export const post = async (req: Request, res: Response) => {
    try {
      const { body } = req
      const consult = await ConsultService.post(body)
      return res.status(StatusCode.OK).send(consult)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
  export const cancel = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
      } = req
      const consult = await ConsultService.cancel(id)
      return res.status(StatusCode.OK).send(consult)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
  export const reschedule = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
        body,
      } = req
      const consult = await ConsultService.reschedule({ id, ...body })
      return res.status(StatusCode.OK).send(consult)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}
