import { z } from "zod";

export const getUserValidation = z.object({
  id: z.string()
    .optional(),
  page: z.number()
    .nonnegative()
    .optional(),
  perPage: z.number()
    .nonnegative()
    .optional()
})

export const createUserValidation = z.object({
  id: z.string()
    .optional(),
  email: z.string()
    .min(2, { message: 'NON_EMPTY' })
    .optional(),
  password: z.string()
    .min(2, { message: 'NON_EMPTY' })
    .max(10, { message: 'MAX_LENGTH_8' }),
  photo: z.string()
    .min(2, { message: 'MIN_LENGHT_3' })
    .optional(),
  phone: z.string()
    .min(2, { message: 'NON_EMPTY' })
    .max(13, { message: 'MAX_LENGTH_13' }),
  address: z.object({
    zipCode: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .max(10, { message: 'MAX_LENGTH_10' }),
    streetNumber: z.number()
      .nonnegative({ message: 'NON_NEGATIVE' })
      .min(2, { message: 'NON_EMPTY' }),
    street: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
    neighboorhood: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
    city: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .max(10, { message: 'MAX_LENGTH_8' })
      .optional(),
    state: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .max(3, { message: 'MAX_LENGTH_3' })
      .optional(),
    country: z.string()
      .optional(),
  }),
})