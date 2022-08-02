import { StatusCode } from "~/constants"
import { Exception } from "~/helpers"

export namespace CallService {
  export const get = async (
    params: any) => {
    try {
      console.log(params)
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


  export const accept = async (
    params: any) => {
    try {
      console.log(params)
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

  export const start = async (
    params: any) => {
    try {
      console.log(params)
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

  export const review = async (
    params: any) => {
    try {
      console.log(params)
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