import { z } from "zod";
import {
  createAddressValidation,
  getAddressValidation
} from "../validations/address.validation";

export namespace AddressTypes {
  export type get = z.infer<typeof getAddressValidation>
  export type create = z.infer<typeof createAddressValidation>
}