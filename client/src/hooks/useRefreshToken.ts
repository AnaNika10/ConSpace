import { IdentityDataProvider } from '../dataProviders/IdentityDataProvider';
import InvitationConnector from '../hubs/InvitationConnector';
import useAuth from './useAuth';
import { useDecodedToken } from './useTokenDecoder';

export default function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const decodedToken = useDecodedToken(auth.accessToken || localStorage.getItem("accessToken"));
  
  async function refresh() {
    const response = await IdentityDataProvider.refreshToken({
      refreshToken: auth.refreshToken,
      email: decodedToken?.Email,
    });

    setAuth(prev => {
        console.log(JSON.stringify(prev));
        console.log(response?.data.accessToken);
        return { accessToken: response?.data.accessToken, refreshToken: response?.data.refreshToken }
    });
    return response?.data.accessToken;
  }
  
  return refresh;
}
