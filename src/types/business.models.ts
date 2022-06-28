import { DefaultTypes } from "./default.models";

export namespace BusinessModelsTypes {
  export interface Schedule extends DefaultTypes.register {
    psychologist: string,
    patient: string,
    date: Date,
    createdAt: Date,
    updatedAt: Date
  }
}