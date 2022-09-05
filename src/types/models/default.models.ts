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
    profession: Array<any>
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
    started: boolean
    finished: boolean
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

  export interface Message extends register {
    chat: string
    sentBy: string
    user: string
    psychologist: string
    message: string
    read: boolean
    deleted: boolean
  }
}
