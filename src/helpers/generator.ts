import axios from "axios"
import { Messages, StatusCode } from "../constants"
import { Exception } from "./exception"

export namespace Generator {
  export const address = async (zipCode: string) => {
    try {
      const address = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      if (!address) {
        Exception.AppError(StatusCode.SERVICE_UNAVAILABLE, Messages.others.CPF_API_NOT_WORKING)
      }
      return address
    } catch (error: any) {
      Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, error)
    }
  }

}