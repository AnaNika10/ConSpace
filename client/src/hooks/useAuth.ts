import { useContext } from "react";
import { AuthContextInterface, AuthContext } from "../context/AuthProvider";

const useAuth = (): AuthContextInterface  => {
    return useContext(AuthContext);
}

export default useAuth;