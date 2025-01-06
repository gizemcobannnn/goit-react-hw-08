import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) =>{
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
      // Eğer kullanıcı giriş yapmışsa, yönlendirme yapılır
      if (!token) {
        navigate('/login', { replace: true });
      }
    }, [token]);


  return (token) ? children : <Navigate to='/login' replace />

  
}

export default PrivateRoute