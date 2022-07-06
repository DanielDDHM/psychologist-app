import { DefaultModelsTypes } from "./default.models";

export namespace CallModelsTypes {
  export interface Call extends DefaultModelsTypes.CallDefault {
    Room: object,
    PsychologistEntered: boolean,
    PsychologistEnteredDate: Date,
  }

  export interface Chat extends DefaultModelsTypes.CallDefault {
    PsychologistAccepted: boolean,
    PsychologistAcceptedDate: Date,
    messages: object
  }
}