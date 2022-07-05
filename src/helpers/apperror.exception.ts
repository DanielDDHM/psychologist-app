import { response } from "express";
export namespace Exception {
  export const AppError = async (statusCode: number, message: string) => {
    return response.status(statusCode).send(message)
  }
}
