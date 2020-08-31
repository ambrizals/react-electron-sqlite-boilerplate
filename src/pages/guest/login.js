import React from "react";
import { useDispatch } from "react-redux";
import actions from "../../store/actions";

const LoginPages = () => {
  const dispatch = useDispatch();
  return (
    <div id="loginPages">
      <div>Ini halaman login</div>
      <button onClick={() => dispatch(actions.users.processSignIn())}>
        Login
      </button>
    </div>
  );
};

export default LoginPages;
