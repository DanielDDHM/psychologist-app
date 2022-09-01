import { StatusCode } from '../constants'
import { Exception } from '../helpers'

export namespace ConsultService {
  export const get = async (params: any) => {
    try {
      console.log(params)
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }
  export const post = async (params: any) => {
    try {
      console.log(params)
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }
  export const cancel = async (params: any) => {
    try {
      console.log(params)
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }
  export const reschedule = async (params: any) => {
    try {
      console.log(params)
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e?.message])
    }
  }
}
