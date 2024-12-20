import {Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) =>{
  
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="login"/>
}

export default PrivateRoute