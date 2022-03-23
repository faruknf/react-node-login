import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import constants from "../constants";
import { logOutUser } from "../store/user/actions/auth";

function useAuth(): [boolean | null, Function] {

  const [isAuth, setIsAuth] = useState<boolean | null>(
    Boolean(localStorage.getItem("isAuth"))
  );

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {LOGOUT_URL} = constants.fetch
  const {getFetchInfoWithCookie} = constants.fetch.actions

  useEffect(() => {
    
    //If user remove isAuth from localStorage
    //Remove access and refresh token from cookies

    window.addEventListener("storage", async (e) => {
      if (!localStorage.getItem("isAuth")) {
        const response = await fetch(LOGOUT_URL, getFetchInfoWithCookie);
        setIsAuth(false)
        dispatch(logOutUser());
        navigate("/auth/login");
      }
    });
  }, []);

  useEffect(() => {
    if (!isAuth) localStorage.removeItem("isAuth");
    else localStorage.setItem("isAuth", String(isAuth));
  }, [isAuth]);

  return [isAuth, setIsAuth];
}

export default useAuth;
