import { Request, Response } from "express";
import { StatusCode } from "../constants";
import { UsersService } from "../services/users.service";
import { UsersTypes } from "../types";

export namespace UserController {
  export const getUser = async (req: Request, res: Response) => {
    const { params: { id }, query } = req
    try {
      const users = await UsersService.get({ id, ...query } as UsersTypes.get)
      return res.status(StatusCode.OK).send(users)
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send(error)
    }
  }

  export const createUser = async (req: Request, res: Response) => {
    const { body } = req
    try {
      const users = await UsersService.create(body as UsersTypes.create)
      return res.status(StatusCode.OK).send(users)
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send(error)
    }
  }

  export const updateUser = async (req: Request, res: Response) => {
    const { params: { id }, body } = req
    try {
      const user = await UsersService.update({ id, ...body } as UsersTypes.update)
      return res.status(StatusCode.OK).send(user)
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send(error)
    }
  }

  export const confirmUser = async (req: Request, res: Response) => {
    const { params: { id } } = req
    try {
      const user = await UsersService.confirm({ id } as UsersTypes.confirm)
      return res.status(StatusCode.OK).send(user)
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send(error)
    }
  }

  export const activateUser = async (req: Request, res: Response) => {
    const { params: { id } } = req
    try {
      const user = await UsersService.activate({ id } as UsersTypes.confirm)
      return res.status(StatusCode.OK).send(user)
    } catch (error: any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send(error)
    }
  }

  export const deleteUser = async () => {
    console.log('SOON')
  }

  export const makeAdmin = () => {
    console.log('SOON')
  }

}