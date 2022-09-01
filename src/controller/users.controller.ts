import { Request, Response } from "express"
import { StatusCode } from "../constants"
import { UsersService } from "../services/users.service"
import { UsersTypes } from "../types"

export namespace UserController {
  export const get = async (req: Request, res: Response) => {
    const {
      params: { id },
      query,
    } = req
    try {
      const users = await UsersService.get({ id, ...query } as UsersTypes.get)
      return res.status(StatusCode.OK).send(users)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const create = async (req: Request, res: Response) => {
    const { body } = req
    try {
      const users = await UsersService.create(body as UsersTypes.create)
      return res.status(StatusCode.OK).send(users)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const update = async (req: Request, res: Response) => {
    const {
      params: { id },
      body,
    } = req
    try {
      const user = await UsersService.update({ id, ...body } as UsersTypes.update)
      return res.status(StatusCode.OK).send(user)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const confirm = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req
    try {
      const user = await UsersService.confirm({ id } as UsersTypes.idOnly)
      return res.status(StatusCode.OK).send(user)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const activate = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req
    try {
      const user = await UsersService.activate({ id } as UsersTypes.idOnly)
      return res.status(StatusCode.OK).send(user)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const destroy = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req
    try {
      const user = await UsersService.destroy({ id } as UsersTypes.idOnly)
      return res.status(StatusCode.OK).send(user)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const makeAdmin = async (req: Request, res: Response) => {
    const { body } = req
    try {
      const user = await UsersService.adminify(body as UsersTypes.idOnly)
      return res.status(StatusCode.OK).send(user)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}
