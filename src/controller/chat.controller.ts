import { Request, Response } from "express"
import { StatusCode } from "../constants"
import { ChatService, MessageService } from "../services"
import { ChatTypes, MessageTypes } from "../types/chat.types"

export namespace ChatController {
  export const get = async (req: Request, res: Response) => {
    try {
      const {
        query
      } = req
      const chat = await ChatService.get(query as ChatTypes.get)
      return res.status(StatusCode.OK).send(chat)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const post = async (req: Request, res: Response) => {
    try {
      const { body } = req
      const chat = await ChatService.post(body as ChatTypes.post)
      return res.status(StatusCode.OK).send(chat)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const init = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
      } = req
      const chat = await ChatService.init({ id } as ChatTypes.init)
      return res.status(StatusCode.OK).send(chat)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const finish = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
      } = req
      const chat = await ChatService.finish({ id } as ChatTypes.finish)
      return res.status(StatusCode.OK).send(chat)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const destroy = async (req: Request, res: Response) => {
    try {
      const {
        query: { id },
      } = req
      const chat = await ChatService.destroy({ id } as ChatTypes.destroy)
      return res.status(StatusCode.OK).send(chat)
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
      const chat = await ChatService.review({ id, ...body } as ChatTypes.review)
      return res.status(StatusCode.OK).send(chat)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}

export namespace MessageController {

  export const get = async (req: Request, res: Response) => {
    try {
      const { params: { id } } = req
      const message = await MessageService.get({ id } as MessageTypes.get)
      return res.status(StatusCode.OK).send(message)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const post = async (req: Request, res: Response) => {
    try {
      const { params: { id }, body: { message, sentBy } } = req
      const messageSend = await MessageService.post({ id, message, sentBy } as MessageTypes.post)
      return res.status(StatusCode.OK).send(messageSend)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const destroy = async (req: Request, res: Response) => {
    try {
      const { query: { id } } = req
      const messageDeleted = await MessageService.destroy({ id } as MessageTypes.destroy)
      return res.status(StatusCode.OK).send(messageDeleted)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}