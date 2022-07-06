import { Request, Response } from "express";
import { Messages, StatusCode } from "../constants";
import { Exception } from "../helpers";

export namespace UserController {
  export const getUser = async (req: Request, res: Response) => {
    const { params: { id }, query } = req
    try {
      if (!id) {
        Exception.AppError(StatusCode.BAD_REQUEST, Messages.StatusMessage.MISSING_PARAMS)
      }

      const users = "CONSTRUCT"
      return res.status(StatusCode.OK).send({ users, query })
    } catch (error: any) {
      Exception.Response(StatusCode.INTERNAL_SERVER_ERROR, error)
    }
  }

  export const createUser = async () => {
    console.log('SOON')
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