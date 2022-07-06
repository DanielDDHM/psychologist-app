import { DefaultModelsTypes } from "./default.models";

export namespace BusinessModelsTypes {
  export interface Schedule extends DefaultModelsTypes.register {
    psychologist: string,
    patient: string,
    start: number,
    end: number,
    createdAt: Date,
    updatedAt: Date
  }
}