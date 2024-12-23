import {Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, redirectTo = '/' }) =>{
  
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isRefreshing = useSelector(state => state.auth.isLoggedIn);

  
  if (!isLoggedIn && !isRefreshing) {
    return <Navigate to={redirectTo} />;
  }

  return <Component />;  
}

export default PrivateRoute