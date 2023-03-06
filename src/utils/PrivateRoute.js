import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/auth";

// HOC component to protect routes
function PrivateRoute({Component}) {
  const { signed } = useAuth();
  console.log("🚀 ~ file: PrivateRoute.js:7 ~ PrivateRoute ~ signed:", signed)

  return signed ? (
    Component
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
