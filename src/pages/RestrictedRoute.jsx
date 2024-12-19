import { Routes, Route } from 'react-router-dom'
import UserMenu from '../components/UserMenu';

const RestrictedRoute = () => {
  return (
    <Routes>
    <Route path="/login" element={<UserMenu/>}></Route>
  </Routes>
  );
}

export default RestrictedRoute