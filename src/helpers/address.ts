import axios from "axios"
import { DefaultMessages, StatusCode } from "../constants"
import { Exception } from "./exception"

export namespace AddressGenerator {
  export interface addressT {
    zipCode: string
    street: string
    neighboorhood: string
    city: string
    state: string
    streetNumber: number
  }

  export const address = async (zipCode: string, streetNumber: number): Promise<addressT> => {
    try {
      const address = await (await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)).data

      if (!address) {
        throw new Exception.AppError(StatusCode.SERVICE_UNAVAILABLE, [
          DefaultMessages.others.CPF_API_NOT_WORKING,
        ])
      }

      return {
        zipCode: address.cep,
        street: address.logradouro,
        neighboorhood: address.bairro,
        city: address.localidade,
        state: address.uf,
        streetNumber: streetNumber,
      }
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }

      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }
}
