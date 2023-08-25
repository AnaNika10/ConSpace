import axios from '../api/axios';
import { REFRESH_URL } from '../constants/api';
import useAuth from './useAuth';
import { useDecodedToken } from './useTokenDecoder';

export default function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const decodedToken = useDecodedToken(auth.accessToken || localStorage.getItem("accessToken"));
  
  async function refresh() {
    const response = await axios.post(
        REFRESH_URL,
        JSON.stringify({
          refreshToken: auth.refreshToken,
          email: decodedToken?.Email,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
    );

    setAuth(prev => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return { accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }
    });
    return response.data.accessToken;
  }
  
  return refresh;
}
