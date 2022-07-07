import { Messages, StatusCode } from "../constants";
import { Exception } from "../helpers";
import { User } from "../models";
import { UsersTypes } from "../types";
import {
  createUserValidation,
  getUserValidation,
  updateUserValidation,
  userConfirmValidation
} from "../validations/user.validation";

export namespace UsersService {
  export const get = async (params: UsersTypes.get) => {
    try {
      const {
        id,
        page,
        perPage
      } = getUserValidation.parse(params)

      const [users, total] = await Promise.all([
        User.find(
          id ? { _id: id } : {},
          null,
          {
            skip: Number((page! - 1) * perPage!) || 0,
            limit: Number(perPage) || 10
          }
        ),
        User.count()
      ])

      if (!users) {
        throw new Exception.AppError(
          StatusCode.NOT_FOUND,
          [Messages.StatusMessage.NOT_FOUND])
      }

      return { users, total }
    } catch (e: any) {
      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [e])
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

      const emailExist = await User.findOne({ email })
      if (emailExist) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [Messages.User.USER_EXIST])
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
        throw new Exception.AppError(StatusCode.BAD_REQUEST, userCreated)
      }
      return userCreated
    } catch (e: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const update = async (params: UsersTypes.update) => {
    try {
      const {
        id,
        name,
        email,
        password,
        photo,
        phone,
        birthdate,
        role,
        address
      } = updateUserValidation.parse(params)

      const userUpdated = await User.findOneAndUpdate(
        { _id: id },
        {
          name,
          email,
          password,
          photo,
          phone,
          birthdate,
          role,
          address
        },
        { returnOriginal: false })

      if (!userUpdated) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [Messages.User.NOT_FOUND])
      }

      return userUpdated
    } catch (e: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const confirm = async (params: UsersTypes.confirm) => {
    try {
      const {
        id,
      } = userConfirmValidation.parse(params)

      const userConfirm = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { isConfirmed: true } },
        { returnOriginal: false })

      if (!userConfirm) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [Messages.User.NOT_FOUND])
      }

      return userConfirm
    } catch (e: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const activate = async (params: UsersTypes.confirm) => {
    try {
      const {
        id,
      } = userConfirmValidation.parse(params)
      const user = await User.findById({ _id: id })

      const userActivate = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { isActive: !user?.isActive } },
        { returnOriginal: false })

      if (!userActivate) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [Messages.User.NOT_FOUND])
      }

      return userActivate
    } catch (e: any) {
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }
}