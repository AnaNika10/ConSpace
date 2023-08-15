import axios from '../api/axios';
import useAuth from './useAuth';
import jwt_decode from 'jwt-decode';

const REFRESH_URL = "/api/v1/Authentication/Refresh";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const decoded: any = auth?.accessToken
    ? jwt_decode(auth.accessToken)
    : undefined;
    
    const refresh = async () => {
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

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
