import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export type Auth = {
  accessToken: string;
  refreshToken: string;
};

export interface AuthContextInterface {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  auth: { accessToken: "", refreshToken: "" },
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
} as AuthContextInterface;

export const AuthContext = createContext(defaultState);

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<Auth>({ accessToken: "", refreshToken: "" });

  const persistFromLocalStorage = localStorage.getItem("persist");
  const [persist, setPersist] = useState(
    persistFromLocalStorage !== null
      ? JSON.parse(persistFromLocalStorage)
      : false
  );

  useEffect(() => {
    if (auth.accessToken && persist) {
      localStorage.setItem("accessToken", auth.accessToken);
    }
  }, [auth.accessToken, persist]);

  useEffect(() => {
    if (persist) {
      const storedAccessToken = localStorage.getItem("accessToken");
      if (storedAccessToken) {
        setAuth((prevAuth) => ({
          ...prevAuth,
          accessToken: storedAccessToken,
        }));
      }
    }
  }, [persist]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
}
