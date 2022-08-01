import { Request, Response } from "express"

export namespace ConsultController {
  export const get = async (
    req: Request, res: Response) => {
    try {
      console.log(req)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
  export const post = async (
    req: Request, res: Response) => {
    try {
      console.log(req)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
  export const cancel = async (
    req: Request, res: Response) => {
    try {
      console.log(req)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
  export const reschedule = async (
    req: Request, res: Response) => {
    try {
      console.log(req)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}