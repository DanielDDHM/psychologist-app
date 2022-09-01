import { DefaultModelsTypes } from './default.models'

export namespace BusinessModelsTypes {
  export interface Schedule extends DefaultModelsTypes.register {
    psychologist: string
    patient: string
    start: number
    end: number
    createdAt: Date
    updatedAt: Date
  }

  export interface Clinic extends DefaultModelsTypes.register {
    isActive: boolean
    image: string
    logo: string
    name: string
    address: string
    address2: string
    postalCode: string
    city: string
    country: string
    state: string
    email: string
    phone: string
    consultationsPerUser: number
  }
}
