import { Request, Response } from "express"
import { StatusCode } from "~/constants"
import { ChatService } from "~/services"

export namespace ChatController {
  export const get = async (
    req: Request, res: Response) => {
    try {

      const { query: { id } } = req
      const chat = await ChatService.get(id)
      return res.status(StatusCode.OK).send(chat)

    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const post = async (
    req: Request, res: Response) => {
    try {

      const { body } = req
      const chat = await ChatService.post(body)
      return res.status(StatusCode.OK).send(chat)

    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const init = async (
    req: Request, res: Response) => {
    try {

      const { query: { id } } = req
      const chat = await ChatService.init(id)
      return res.status(StatusCode.OK).send(chat)

    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const accept = async (
    req: Request, res: Response) => {
    try {

      const { query: { id } } = req
      const chat = await ChatService.accept(id)
      return res.status(StatusCode.OK).send(chat)

    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const finish = async (
    req: Request, res: Response) => {
    try {

      const { query: { id } } = req
      const chat = await ChatService.finish(id)
      return res.status(StatusCode.OK).send(chat)

    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const destroy = async (
    req: Request, res: Response) => {
    try {

      const { query: { id } } = req
      const chat = await ChatService.destroy(id)
      return res.status(StatusCode.OK).send(chat)

    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const review = async (
    req: Request, res: Response) => {
    try {
      const { query: { id }, body } = req
      const chat = await ChatService.accept({ id, body })
      return res.status(StatusCode.OK).send(chat)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}