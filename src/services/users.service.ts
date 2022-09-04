import { DefaultMessages, StatusCode } from "../constants"
import { AddressGenerator, Exception } from "../helpers"
import { User } from "../models"
import { DefaultTypes, UsersTypes } from "../types"
import {
  getValidation,
  idValidation,
  createUserValidation,
  updateUserValidation,
} from "../validations"

export namespace UsersService {
  export const get = async (params: UsersTypes.get) => {
    try {
      const { id, page, perPage } = getValidation.parse(params)

      const [users, total] = await Promise.all([
        User.find(id ? { _id: id } : {}, null, {
          skip: Number((page! - 1) * perPage!) || 0,
          limit: Number(perPage) || 10,
        }),
        User.count(id ? { _id: id } : {}),
      ])

      if (!users || users.length === 0) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [DefaultMessages.StatusMessage.NOT_FOUND])
      }

      return { users, total }
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const create = async (params: UsersTypes.create) => {
    try {
      const { name, email, password, photo, phone, birthdate, address } =
        createUserValidation.parse(params)

      const emailExist = await User.findOne({ email })
      if (emailExist) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [DefaultMessages.User.USER_EXIST])
      }

      const newAddress = await AddressGenerator.address(address.zipCode, address.streetNumber)

      const userCreated = await User.create({
        name,
        email,
        password,
        photo,
        birthdate,
        phone,
        address: newAddress,
      })

      if (!userCreated) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, userCreated)
      }

      return userCreated
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const update = async (params: UsersTypes.update) => {
    try {
      const { id, name, email, password, photo, phone, birthdate, role, address } =
        updateUserValidation.parse(params)

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
          address,
        },
        { returnOriginal: false },
      )

      if (!userUpdated) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [DefaultMessages.User.NOT_FOUND])
      }

      return userUpdated
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const confirm = async (params: UsersTypes.idOnly) => {
    try {
      const { id } = idValidation.parse(params)

      const userConfirm = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { isConfirmed: true } },
        { returnOriginal: false },
      )

      if (!userConfirm) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [DefaultMessages.User.NOT_FOUND])
      }

      return userConfirm
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const activate = async (params: UsersTypes.idOnly) => {
    try {
      const { id } = idValidation.parse(params)
      const user = await User.findById({ _id: id })

      const userActivate = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { isActive: !user?.isActive } },
        { returnOriginal: false },
      )

      if (!userActivate) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [DefaultMessages.User.NOT_FOUND])
      }

      return userActivate
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }

  export const destroy = async (params: UsersTypes.idOnly) => {
    try {
      const { id } = idValidation.parse(params)
      const userDeleted = await User.findByIdAndDelete({ _id: id })

      if (!userDeleted) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [DefaultMessages.User.NOT_FOUND])
      }

      return userDeleted._id
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }
  export const adminify = async (params: UsersTypes.idOnly) => {
    try {
      const { id } = idValidation.parse(params)
      const user = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { role: DefaultTypes.UserTypes.ADMIN } },
        { returnOriginal: false },
      )

      if (!user) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [DefaultMessages.User.NOT_FOUND])
      }

      return user
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }
}
