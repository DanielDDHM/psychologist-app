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

  export const updateUser = async () => {
    console.log('SOON')
  }

  export const deleteUser = async () => {
    console.log('SOON')
  }

  export const activateUser = () => {
    console.log('SOON')
  }

  export const confirmUser = () => {
    console.log('SOON')
  }

  export const makeAdmin = () => {
    console.log('SOON')
  }

}