export namespace DefaultTypes {
  export interface users {
    name: string,
    email: string,
    password: string,
    photo: string,
    isActive: boolean,
    isConfirmed: boolean
  }

  export interface register {
    createdAt: Date,
    updatedAt: Date
  }

  export interface CallDefault {
    patient: string,
    psychologist: string,
    startDate: Date,
    endDate: Date,
    Status: object,
    rating: number,
    finished: boolean,
  }
}