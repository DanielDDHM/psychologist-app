import { DefaultTypes } from "./default.models";

export namespace CallModelsTypes {
  export interface Call extends DefaultTypes.CallDefault, DefaultTypes.register {
    Room: object,
    PsychologistEntered: boolean,
    PsychologistEnteredDate: Date,
  }

  export interface Chat extends DefaultTypes.CallDefault, DefaultTypes.register {
    PsychologistAccepted: boolean,
    PsychologistAcceptedDate: Date,
    messages: object
  }
}