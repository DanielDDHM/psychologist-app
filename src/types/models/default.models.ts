export namespace DefaultModelsTypes {
  export interface register {
    createdAt: Date
    updatedAt: Date
  }
  export interface users extends register {
    name: string
    email: string
    password: string
    photo: string
    role: string
    birthdate: string
    phone: string
    address: Address
    isActive: boolean
    isConfirmed: boolean
  }
  export interface Call extends register {
    patient: string
    psychologist: string
    startDate: Date
    endDate: Date
    Status: object
    rating: number
    finished: boolean
  }

  export interface Library extends register {
    category: string
    type: string
    image: string
    video: string
    audio: string
    name: string
    description: string
    published: boolean
    publishSchedule: boolean
    publishScheduleDate: Date
  }

  export interface Address {
    zipCode: string
    streetNumber: number
    street: string
    neighborhood: string
    city: string
    state: string
    country: string
  }
}
