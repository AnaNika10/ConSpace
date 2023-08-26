import { IdentityDataProvider } from "../dataProviders/IdentityDataProvider";
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
          IdentityDataProvider.logout(auth.accessToken, {
            email: decodedToken?.Email,
            refreshToken: auth.refreshToken,
          });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}