import axios from "../api/axios";
import { LOGOUT_URL } from "../constants/api";
import useAuth from "./useAuth";
import { useDecodedToken } from "./useTokenDecoder";

export default function useLogout() {
    const { auth, setAuth } = useAuth();

    const decodedToken = useDecodedToken(auth.accessToken);

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
                  email: decodedToken?.Email,
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