import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const RestrictedRoute = ({component: Component, redirectTo="/"}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Kullanıcı oturum açmışsa yönlendirme yapılır, değilse bileşen render edilir
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
}

export default RestrictedRoute