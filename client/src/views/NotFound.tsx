import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

function NotFound() {

  const navigate = useNavigate();
  const [isAuth,setIsAuth] = useAuth()

  useEffect(() => {
    if (isAuth) navigate(-1);
    else navigate("/auth/login");
  }, []);

  return null
}
export default NotFound