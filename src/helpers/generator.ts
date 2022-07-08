import axios from "axios";
import { Messages, StatusCode } from "../constants"
import { Exception } from "./exception"

export namespace Generator {
  export const address = async (zipCode: string) => {
    try {
      const address = await (await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)).data

      if (!address) {
        throw new Exception.AppError(
          StatusCode.SERVICE_UNAVAILABLE,
          [Messages.others.CPF_API_NOT_WORKING])
      }

      return {
        zipCode: address.cep,
        street: address.logradouro,
        neighboorhood: address.bairro,
        city: address.localidade,
        state: address.uf
      }

    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(
          e?.statusCode,
          e?.messages)
      }

      throw new Exception.AppError(
        StatusCode.INTERNAL_SERVER_ERROR,
        [e?.message])
    }
  }
}