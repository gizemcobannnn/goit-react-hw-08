import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const RestrictedRoute = ({children}) => {
  const isLoggedIn = useSelector(state => state.auth);

  return isLoggedIn ? children : <Navigate to="usermenu"/>
}

export default RestrictedRoute