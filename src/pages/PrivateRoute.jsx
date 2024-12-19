import { Routes, Route } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegistrationForm from '../components/RegistrationForm'
  import UserMenu from '../components/UserMenu'

const PrivateRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm/>}></Route>
      <Route path="/login" element={<LoginForm/>}></Route>
      <Route path="/usermenu" element={<UserMenu/>}></Route>
      <Route path="/register" element={<RegistrationForm/>}></Route>
    </Routes>
  )
}

export default PrivateRoute