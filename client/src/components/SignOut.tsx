import jwt_decode from "jwt-decode";
import axios from "../api/axios";
import { NavigateFunction } from "react-router";
import { Dispatch, SetStateAction } from "react";
import { Auth } from "../context/AuthProvider";

const LOGOUT_URL = "/api/v1/Authentication/Logout";

export default function SignOut(
  auth: { accessToken: any; refreshToken: any },
  setAuth: Dispatch<SetStateAction<Auth>>,
  navigate: NavigateFunction
) {
  const decoded: any = auth?.accessToken
    ? jwt_decode(auth.accessToken)
    : undefined;

  try {
    axios.post(
      LOGOUT_URL,
      JSON.stringify({
        email: decoded?.Email,
        refreshToken: auth.refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );

    setAuth({
      accessToken: "",
      refreshToken: "",
    });

    navigate("/", { replace: true });
  } catch (err) {
    console.log(err);
  }

  return null;
}
