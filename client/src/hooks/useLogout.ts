import axios from "../api/axios";
import { LOGOUT_URL } from "../constants/api";
import useAuth from "./useAuth";
import jwt_decode from "jwt-decode";

export default function useLogout() {
    const { auth, setAuth } = useAuth();

    const decoded: any = auth?.accessToken
    ? jwt_decode(auth.accessToken)
    : undefined;

    const logout = async () => {
        setAuth({
            accessToken: "",
            refreshToken: "",
        });
        
        localStorage.removeItem("accessToken");
        
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
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}