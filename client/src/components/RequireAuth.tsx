import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

interface Props {
  allowedRoles: string[];
}

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded: any = auth?.accessToken
    ? jwt_decode(auth.accessToken)
    : undefined;

  const role = decoded?.Role || "";

  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default RequireAuth;
