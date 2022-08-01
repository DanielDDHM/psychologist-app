import { Request, Response } from "express"

export namespace ChatController {
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

  export const init = async (
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

  export const finish = async (
    req: Request, res: Response) => {
    try {
      console.log(req)
    } catch (error: any) {
      res.status(error?.statusCode).send(error?.messages)
    }
  }

  export const destroy = async (
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