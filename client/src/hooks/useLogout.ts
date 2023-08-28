import { IdentityDataProvider } from "../dataProviders/IdentityDataProvider";
import InvitationConnector from "../hubs/InvitationConnector";
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
          InvitationConnector(auth.accessToken).disconnect();
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