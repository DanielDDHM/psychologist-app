import { Request, Response } from "express";
import { Messages, StatusCode } from "../constants";
import { Exception } from "../helpers";
import { User } from "../models";

export namespace UserController {
  export const getUser = async (req: Request, res: Response) => {
    const { params: { id } } = req
    try {
      if (!id) {
        Exception.AppError(StatusCode.BAD_REQUEST, Messages.Default.WRONG_DATA)
      }

      const user = await User.findOne({ id })

      if (!user) {
        Exception.AppError(StatusCode.NOT_FOUND, Messages.Auth.MISSING_TOKEN)
      }

      return res.status(StatusCode.OK).send(user)
    } catch (error: any) {
      Exception.Response(StatusCode.INTERNAL_SERVER_ERROR, error)
    }
  }

  export const createUser = async (req: Request, res: Response) => {
    console.log('SOON')
  }

  export const updateUser = async (req: Request, res: Response) => {
    console.log('SOON')
  }

  export const deleteUser = async (req: Request, res: Response) => {
    console.log('SOON')
  }

}