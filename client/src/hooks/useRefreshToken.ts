import axios from '../api/axios';
import { REFRESH_URL } from '../constants/api';
import useAuth from './useAuth';
import jwt_decode from 'jwt-decode';

export default function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const decoded: any = auth?.accessToken
  ? jwt_decode(auth.accessToken)
  : undefined;
  
  async function refresh() {
    const response = await axios.post(
        REFRESH_URL,
        JSON.stringify({
          refreshToken: auth.refreshToken,
          email: decoded?.Email,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
    );

    console.log("refresh")
    setAuth(prev => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return { accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }
    });
    return response.data.accessToken;
  }
  
  return refresh;
}
