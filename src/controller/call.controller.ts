import { Request, Response } from "express"

export namespace CallController {
  export const get = async (
    req: Request, res: Response) => {
    try {
      console.log(req)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const accept = async (
    req: Request, res: Response) => {
    try {
      console.log(req)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const start = async (
    req: Request, res: Response) => {
    try {
      console.log(req)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const review = async (
    req: Request, res: Response) => {
    try {
      console.log(req)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }
}