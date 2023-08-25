import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDecodedToken } from "../../hooks/useTokenDecoder";

interface Props {
  allowedRoles: string[];
}

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decodedToken = useDecodedToken(auth.accessToken);

  const role = decodedToken?.Role || "";

  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default RequireAuth;
