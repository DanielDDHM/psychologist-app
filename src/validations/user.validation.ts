import { z } from "zod"

export const createUserValidation = z.object({
  name: z.string().min(2, { message: "NON_EMPTY" }),
  email: z.string().min(2, { message: "NON_EMPTY" }),
  password: z.string().min(2, { message: "NON_EMPTY" }).max(10, { message: "MAX_LENGTH_8" }),
  photo: z.string().min(2, { message: "MIN_LENGHT_3" }).optional(),
  phone: z
    .string()
    .min(2, { message: "NON_EMPTY" })
    .max(13, { message: "MAX_LENGTH_13" })
    .optional(),
  birthdate: z.string().min(2, { message: "MIN_LENGHT_3" }).optional(),
  address: z.object({
    zipCode: z.string().min(2, { message: "NON_EMPTY" }).max(10, { message: "MAX_LENGTH_10" }),
    streetNumber: z
      .number()
      .nonnegative({ message: "NON_NEGATIVE" })
      .min(2, { message: "NON_EMPTY" }),
  }),
})

export const updateUserValidation = z.object({
  id: z.string().min(2, { message: "NON_EMPTY" }).optional(),
  name: z.string().min(2, { message: "NON_EMPTY" }).optional(),
  email: z.string().min(2, { message: "NON_EMPTY" }).optional(),
  password: z.string().min(2, { message: "NON_EMPTY" }).max(10, { message: "MAX_LENGTH_8" }),
  photo: z.string().min(2, { message: "MIN_LENGHT_3" }).optional(),
  phone: z.string().min(2, { message: "NON_EMPTY" }).max(13, { message: "MAX_LENGTH_13" }),
  role: z.string().min(2, { message: "MIN_LENGHT_3" }).optional(),
  birthdate: z.string().min(2, { message: "MIN_LENGHT_3" }).optional(),
  address: z.object({
    zipCode: z.string().min(2, { message: "NON_EMPTY" }).max(10, { message: "MAX_LENGTH_10" }),
    streetNumber: z
      .number()
      .nonnegative({ message: "NON_NEGATIVE" })
      .min(2, { message: "NON_EMPTY" }),
  }),
})
