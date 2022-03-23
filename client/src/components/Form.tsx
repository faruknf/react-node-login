import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logInUser } from "../store/user/actions/auth";
import constants from "../constants/index"
import { ILoginFetchInfo } from "../types";
import useAuth from "../hooks/useAuth";

interface IProps {
  name:string
}

interface IForm {
  email:string |undefined,
  password:string |undefined
}



const Form:React.FC<IProps> = (props) => {

  const [form, setForm] = useState<IForm>({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuth,setIsAuth] = useAuth()

  const click = async (e:React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();

    const {LOGIN_URL}  =constants.fetch

    const loginOptions : ILoginFetchInfo = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    }

    const login = async () => {
      const response = await fetch(LOGIN_URL,loginOptions);
      const result = await response.json();

      if (result.payload.error) 
        setError(() => result.payload.error);
      else {
        dispatch(logInUser(result.payload.user));
        setIsAuth(true)
        navigate("/dashboard");
      }
    };

    login();
  };
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div>
      <form>
        <input
          type="email"
          value={form.email}
          name="email"
          placeholder="Email.."
          onChange={onChange}
        />
        <input
          type="password"
          value={form.password}
          name="password"
          placeholder="Password.."
          onChange={onChange}
        />
        {error !== "" ? (
          <p className="form__error">{error}</p>
        ) : null}
        <button onClick={click}>{props.name}</button>
      </form>
    </div>
  );
};

export default Form;
