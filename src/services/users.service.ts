import { Messages, StatusCode } from "../constants";
import { Exception } from "../helpers";
import { User } from "../models";
import { UsersTypes } from "../types";
import { createUserValidation, getUserValidation } from "../validations/user.validation";

export namespace UsersService {
  export const get = async (params: UsersTypes.get) => {
    try {
      const {
        id,
        page,
        perPage
      } = getUserValidation.parse(params)

      const users = User.find(
        { id: id ? id : {} },
        null,
        {
          skip: page ? page : 0,
          limit: perPage ? perPage : 10
        }
      )

      if (!users) {
        new Exception.AppError(
          StatusCode.NOT_FOUND,
          [Messages.StatusMessage.NOT_FOUND])
      }

      return users
    } catch (e: any) {
      new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [Messages.StatusMessage.INTERNAL_SERVER_ERROR])
    }
  }

  export const create = async (params: UsersTypes.create) => {
    try {
      const {
        name,
        email,
        password,
        photo,
        phone,
        birthdate,
        role,
        address
      } = createUserValidation.parse(params)

      const emailExist = await User.find({ email })

      if (emailExist && emailExist !== []) {
        new Exception.AppError(StatusCode.BAD_REQUEST, [Messages.User.USER_EXIST])
      }
      const userCreated = await User.create({
        name,
        email,
        password,
        photo,
        role,
        birthdate,
        phone,
        address
      })
      if (!userCreated) {
        new Exception.AppError(StatusCode.BAD_REQUEST, userCreated)
      }
      return userCreated
    } catch (error: any) {
      new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, error)
    }
  }
}