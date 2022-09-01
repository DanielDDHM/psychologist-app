import { Request, Response } from 'express'
import { StatusCode } from '../constants'
import { CallService } from '../services'

export namespace CallController {
  export const get = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
      } = req
      const call = await CallService.get(id)
      return res.status(StatusCode.OK).send(call)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const accept = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
      } = req
      const call = await CallService.accept(id)
      return res.status(StatusCode.OK).send(call)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const start = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
      } = req
      const call = await CallService.start(id)
      return res.status(StatusCode.OK).send(call)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const review = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
        body,
      } = req
      const call = await CallService.accept({ id, ...body })
      return res.status(StatusCode.OK).send(call)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}
