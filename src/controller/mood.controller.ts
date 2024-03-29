import { Request, Response } from "express"
import { StatusCode } from "../constants"
import { MoodService } from "../services"
import { MoodTypes } from "../types"

export namespace MoodController {
  export const get = async (req: Request, res: Response) => {
    const {
      query: { id, page, perPage },
    } = req
    try {
      const mood = await MoodService.get({ id, page, perPage } as MoodTypes.get)
      return res.status(StatusCode.OK).send(mood)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const post = async (req: Request, res: Response) => {
    const {
      params: { id },
      body: { mood },
    } = req
    try {
      const mod = await MoodService.post({ id, mood } as MoodTypes.post)
      return res.status(StatusCode.OK).send(mod)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const edit = async (req: Request, res: Response) => {
    const {
      params: { id },
      body: { mood },
    } = req
    try {
      const mod = await MoodService.edit({ id, mood } as MoodTypes.edit)
      return res.status(StatusCode.OK).send(mod)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const destroy = async (req: Request, res: Response) => {
    const {
      query: { id },
    } = req
    try {
      const mood = await MoodService.destroy({ id } as MoodTypes.destroy)
      return res.status(StatusCode.OK).send(mood)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}
