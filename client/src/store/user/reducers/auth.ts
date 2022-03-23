import { IUserAction, IUserPayload } from "../../../types";

let user: IUserPayload = {};

const authReducer = (user: IUserPayload, action: IUserAction) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...user, ...action.payload };
    case "LOGOUT_USER":
      user = {};
      return user
    default:
      return {...user};
  }
};

export default authReducer;
