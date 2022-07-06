import { DefaultModelsTypes } from "./default.models"

export namespace UsersModelsTypes {

  export interface Psychologist extends DefaultModelsTypes.users {
    about: string,
  }
  export interface Mood extends DefaultModelsTypes.register {
    mood: string
  }

  export interface Patient extends DefaultModelsTypes.users {
    psychologist: string
  }

  export interface Diagnosis extends DefaultModelsTypes.register {
    patient: string,
    isActive: boolean,
    diagnosis: string
  }
}