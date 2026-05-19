import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const role = localStorage.getItem("role");
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
