import { z } from "zod";

export const getChatValidation = z.object({
    id: z.string().optional(),
    user: z.string().optional(),
    page: z.number().nonnegative().optional(),
    perPage: z.number().nonnegative().optional(),
})

export const postChatValidation = z.object({
    name: z.string().optional(),
    patient: z.string().optional(),
    psychologist: z.string().optional(),
})

export const initChatValidation = z.object({
    id: z.string(),
})

export const finishChatValidation = z.object({
    id: z.string(),
})

export const destroyChatValidation = z.object({
    id: z.string(),
})

export const reviewChatValidation = z.object({
    id: z.string(),
    rating: z.number().nonnegative(),
    avaliation: z.string().optional(),
})


export const getMessageValidation = z.object({
    id: z.string(),
    page: z.number().nonnegative().optional(),
    perPage: z.number().nonnegative().optional(),
})

export const postMessageValidation = z.object({
    id: z.string(),
    sentBy: z.string(),
    message: z.string()
})

export const destroyMessageValidation = z.object({
    id: z.string(),
})
