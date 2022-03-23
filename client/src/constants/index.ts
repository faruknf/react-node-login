import { IGetFetchInfoWithCookie } from "../types";

interface IConstants {
    fetch:{
        BASE:string,
        LOGIN_URL:string,
        DASHBOARD_URL:string,
        LOGOUT_URL:string
        actions:{
            getFetchInfoWithCookie:IGetFetchInfoWithCookie
        }
    },
   
}



const constants :IConstants = {
  fetch: {
    BASE: "http://localhost:3001/",
    LOGIN_URL: "/api/auth/login/",
    DASHBOARD_URL: "/api/dashboard/",
    LOGOUT_URL: "/api/auth/logout/",
    actions: {
        getFetchInfoWithCookie: {
        method:'GET',
        credentials:'include',
      },
    },
  },
};
export default constants;
