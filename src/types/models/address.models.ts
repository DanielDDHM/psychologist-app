import { z } from "zod";
import {
  createAddressValidation,
  getAddressValidation
} from "../../validations/address.validation";

export namespace AddressModels {
  export type get = z.infer<typeof getAddressValidation>
  export type create = z.infer<typeof createAddressValidation>
}