import { DefaultTypes } from "./default.models"

export namespace UsersModelsTypes {

  export interface Psychologist extends DefaultTypes.users {
    about: string,
  }
  export interface Mood extends DefaultTypes.register {
    mood: string
  }

  export interface Patient extends DefaultTypes.users {
    psychologist: string
  }

  export interface Diagnosis extends DefaultTypes.register {
    patient: string,
    isActive: boolean,
    diagnosis: string
  }
}