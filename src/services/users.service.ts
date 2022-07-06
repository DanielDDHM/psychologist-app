import getCurrentLine from "get-current-line/compiled-types";
import { Messages, StatusCode } from "../constants";
import { Exception } from "../helpers";
import { User } from "../models";
import { UsersTypes } from "../types";
import { getUserValidation } from "../validations/user.validation";

export namespace UsersService {
  export const get = async (params: UsersTypes.get) => {
    try {
      const {
        id,
        page,
        perPage
      } = getUserValidation.parse(params)

      const users = User.find({

      })

    } catch (e: any) {
      Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        Messages.StatusMessage.INTERNAL_SERVER_ERROR)
    }
  }
}