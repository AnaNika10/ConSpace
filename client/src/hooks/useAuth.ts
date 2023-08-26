import { useContext } from "react";
import { AuthContextInterface, AuthContext } from "../context/AuthProvider";

export default function useAuth (): AuthContextInterface {
    return useContext(AuthContext);
}