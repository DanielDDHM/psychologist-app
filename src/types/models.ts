export namespace ModelsTypes {
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

  export interface Psychologist extends users, register {
    userName: string,
    about: string,
    phone: string
  }

  export interface Staff extends users, register {
    role: string
  }

  export interface Mood extends register {
    user: string,
    mood: string
  }

  export interface Patient extends users, register {
    psychologist: string,
    birthdate: string
  }

  export interface Diagnosis extends register {
    patient: string,
    isActive: boolean,
    diagnosis: string
  }
}