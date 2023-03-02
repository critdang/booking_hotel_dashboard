import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth/auth';

export function PrivateRoute({ element: Component, ...rest }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  return <Component {...rest} />;
}
