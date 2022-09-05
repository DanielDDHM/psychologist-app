import { DefaultMessages, StatusCode } from "../constants"
import { Exception } from "../helpers"
import { Chat, Messages } from "../models"
import { ChatTypes, MessageTypes } from "../types"
import {
  destroyChatValidation,
  destroyMessageValidation,
  finishChatValidation,
  getChatValidation,
  getMessageValidation,
  initChatValidation,
  postChatValidation,
  postMessageValidation,
  reviewChatValidation,
} from "../validations"

export namespace ChatService {
  export const get = async (params: ChatTypes.get) => {
    try {
      const { id, user, page, perPage } = getChatValidation.parse(params)

      const data = id ? { _id: id } : user ? { user } : {}

      const [chats, total] = await Promise.all([
        await Chat.find(data, null, {
          skip: Number((page! - 1) * perPage!) || 0,
          limit: Number(perPage) || 10,
        }).populate("messages"),
        await Chat.count(data),
      ])

      if (!chats) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [
          DefaultMessages.StatusMessage.NOT_FOUND,
        ])
      }

      return { chats, total }
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const post = async (params: ChatTypes.post) => {
    try {
      const { name, patient, psychologist } = postChatValidation.parse(params)

      const chat = await Chat.create({
        name,
        patient,
        psychologist,
      })

      return chat
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const init = async (params: ChatTypes.init) => {
    try {
      const { id } = initChatValidation.parse(params)

      const chat = await Chat.findById(id)

      if (chat?.finished === true) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ["CHAT HAS FINISHED"])
      }

      const chatInited = await Chat.findByIdAndUpdate(
        id,
        {
          $set: {
            started: true,
            startDate: new Date(),
          },
        },
        { returnOriginal: false },
      )

      return chatInited
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const finish = async (params: ChatTypes.finish) => {
    try {
      const { id } = finishChatValidation.parse(params)

      const chat = await Chat.findById(id)

      if (!chat) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [
          DefaultMessages.StatusMessage.NOT_FOUND,
        ])
      }

      if (chat.started === false) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ["CHAT NOT STARTED"])
      }

      const chatFinished = await Chat.findByIdAndUpdate(
        id,
        {
          $set: {
            finished: true,
            endDate: new Date(),
          },
        },
        { returnOriginal: false },
      )

      return chatFinished
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const destroy = async (params: ChatTypes.destroy) => {
    try {
      const { id } = destroyChatValidation.parse(params)

      await Chat.findByIdAndDelete(id)

      return `CHAT ${id} Deleted`
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const review = async (params: ChatTypes.review) => {
    try {
      const { id, avaliation, rating } = reviewChatValidation.parse(params)

      const chat = await Chat.findById(id)

      if (!chat) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, [
          DefaultMessages.StatusMessage.NOT_FOUND,
        ])
      }

      if (chat.started === false || chat.finished === false) {
        throw new Exception.AppError(StatusCode.BAD_REQUEST, ["YOU CANT REVIEW"])
      }

      const chatReview = await Chat.findByIdAndUpdate(id, {
        $set: {
          rating: rating,
          avaliation: avaliation,
        },
      })

      return chatReview
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }
}

export namespace MessageService {
  export const get = async (params: MessageTypes.get) => {
    try {
      const { id } = getMessageValidation.parse(params)

      const { chats } = await ChatService.get({ id })

      return chats[0].messages
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const post = async (params: MessageTypes.post) => {
    try {
      const { id, message, sentBy } = postMessageValidation.parse(params)

      const messagePosted = await Messages.create({
        chat: id,
        message: message,
        sentBy: sentBy,
      })

      messagePosted
        ? await Chat.findByIdAndUpdate({ _id: id }, { $push: { messages: messagePosted._id } })
        : null

      return messagePosted
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }

  export const destroy = async (params: MessageTypes.destroy) => {
    try {
      const { id } = destroyMessageValidation.parse(params)

      await Messages.findByIdAndDelete(id)

      return "OK"
    } catch (e: any) {
      if (e instanceof Exception.AppError) {
        throw new Exception.AppError(e?.statusCode, e?.messages)
      }
      throw new Exception.AppError(StatusCode.INTERNAL_SERVER_ERROR, [e])
    }
  }
}
