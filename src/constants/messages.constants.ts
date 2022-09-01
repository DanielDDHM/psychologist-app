export namespace Messages {
  export enum Auth {
    CRYPT_PASS_FAIL = "ERROR ON CRYPT PASSWORD",
    NOT_STAFF = "YOURE NOT A STAFF",
    NOT_PERMITED = "YOU DONT HAVE PERMISSION",
    MISSING_TOKEN = "TOKEN IS MISSING",
  }
  export enum User {
    NOT_FOUND = "USER_NOT_FOUND",
    USER_EXIST = "USER_EXIST",
  }
  export enum StatusMessage {
    MISSING_PARAMS = "MISSING_PARAMS",
    NOT_FOUND = "NOT_FOUND",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  }
  export enum others {
    CPF_API_NOT_WORKING = "CPF_API_NOT_WORKING",
  }
}
