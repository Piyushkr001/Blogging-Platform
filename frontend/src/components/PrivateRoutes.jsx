// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
