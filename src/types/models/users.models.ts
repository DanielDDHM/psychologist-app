import { Types } from "mongoose"
import { DefaultModelsTypes } from "./default.models"

export namespace UsersModelsTypes {
  export interface Psychologist extends DefaultModelsTypes.register {
    user: Types.ObjectId
    about: string
    patients: Array<Patient>
  }
  export interface Mood extends DefaultModelsTypes.register {
    user: Types.ObjectId
    mood: string
  }

  export interface Patient extends DefaultModelsTypes.register {
    user: Types.ObjectId
    psychologist: Types.ObjectId
    diagnosis: Array<Diagnosis>
    mood: Array<any>
  }

  export interface Diagnosis extends DefaultModelsTypes.register {
    patient: Types.ObjectId
    diagnosis: string
  }
}
