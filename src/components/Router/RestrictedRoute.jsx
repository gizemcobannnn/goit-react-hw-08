import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const RestrictedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Eğer kullanıcı giriş yapmışsa, yönlendirme yapılır
    if ( token) {
      navigate('/usermenu', { replace: true });
    }
  }, [isLoggedIn, token, navigate]); // Burada gerekli bağımlılıkları ekliyoruz.


  return children;
};

export default RestrictedRoute;
