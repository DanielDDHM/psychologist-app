import { z } from "zod"
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

export namespace ChatTypes {
  export type get = z.infer<typeof getChatValidation>
  export type post = z.infer<typeof postChatValidation>
  export type init = z.infer<typeof initChatValidation>
  export type finish = z.infer<typeof finishChatValidation>
  export type destroy = z.infer<typeof destroyChatValidation>
  export type review = z.infer<typeof reviewChatValidation>
}

export namespace MessageTypes {
  export type get = z.infer<typeof getMessageValidation>
  export type post = z.infer<typeof postMessageValidation>
  export type destroy = z.infer<typeof destroyMessageValidation>
}
