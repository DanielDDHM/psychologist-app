export namespace DefaultModelsTypes {
  export interface users extends register {
    name: string,
    email: string,
    password: string,
    photo: string,
    role: string,
    birthdate: string,
    isActive: boolean,
    isConfirmed: boolean
  }

  export interface register {
    createdAt: Date,
    updatedAt: Date
  }

  export interface CallDefault extends register {
    patient: string,
    psychologist: string,
    startDate: Date,
    endDate: Date,
    Status: object,
    rating: number,
    finished: boolean,
  }

  export interface LibraryDefault extends register {
    category: string,
    type: string,
    image: string
    video: string
    audio: string
    name: string
    description: string
    published: boolean
    publishSchedule: boolean
    publishScheduleDate: Date
  }

}