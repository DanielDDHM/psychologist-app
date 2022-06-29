import { DefaultTypes } from "./default.models"

export namespace UsersModelsTypes {

  export interface Psychologist extends DefaultTypes.users, DefaultTypes.register {
    userName: string,
    about: string,
    phone: string
  }

  export interface Staff extends DefaultTypes.users, DefaultTypes.register {
    role: string
  }

  export interface Mood extends DefaultTypes.register {
    user: string,
    mood: string
  }

  export interface Patient extends DefaultTypes.users, DefaultTypes.register {
    psychologist: string,
    birthdate: string
  }

  export interface Diagnosis extends DefaultTypes.register {
    patient: string,
    isActive: boolean,
    diagnosis: string
  }
}