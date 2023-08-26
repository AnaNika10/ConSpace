import jwt_decode from 'jwt-decode';

export function useDecodedToken(accessToken: string | null): any | null {
  if (accessToken) {
    return jwt_decode(accessToken);
  }
  return null;
}
