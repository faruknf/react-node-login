import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import constants from "../constants";
import useAuth from "../hooks/useAuth";
import { logOutUser } from "../store/user/actions/auth";
import { IGetFetchInfoWithCookie } from "../types";

export default function Dashboard() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useAuth();

  const { DASHBOARD_URL, LOGOUT_URL } = constants.fetch;

  const getFetchWithCookie: IGetFetchInfoWithCookie =
    constants.fetch.actions.getFetchInfoWithCookie;

  useEffect(() => {
    const getDashboard = async () => {
      const response = await fetch(DASHBOARD_URL, getFetchWithCookie);
      const result = await response.json();

      if (result.payload.error) {
        setMessage(() => result.payload.error);
        setIsAuth(false);
      } else setMessage(() => result.payload.message);
    };

    if (isAuth) getDashboard();
    else navigate("/auth/login");
  }, []);

  const click = async () => {
    const response = await fetch(LOGOUT_URL, getFetchWithCookie);
    setIsAuth(false);
    dispatch(logOutUser());
    navigate("/auth/login");
  };

  return (
    isAuth ?
    <div className="dashboard">
      <p>{message}</p>
      <button onClick={click} className="dashboard__logout">
        Logout
      </button>
    </div>:null
  );
}
