import { DefaultModelsTypes } from "./default.models"

export namespace CallModelsTypes {
  export interface Call extends DefaultModelsTypes.Call {
    Room: object
    PsychologistEntered: boolean
    PsychologistEnteredDate: Date
  }

  export interface Chat extends DefaultModelsTypes.Call {
    messages: object
    avaliation: string
  }

}
