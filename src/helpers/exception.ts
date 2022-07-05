import { response } from "express";
export namespace Exception {
  export const AppError = async (statusCode: number, message: string) => {
    return response.status(statusCode).send(message)
  }
  export const Response = async (statusCode: number, resMessage: any) => {
    return response.status(statusCode).send(resMessage)
  }
}
