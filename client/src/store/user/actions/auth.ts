import { IUserAction, IUserPayload } from "../../../types";

export function logInUser(payload: IUserPayload): IUserAction {
  return {
    type: "LOGIN_USER",
    payload,
  };
}
export function logOutUser(): IUserAction {
  return {
    type: "LOGOUT_USER",
  };
}
