import { Routes, Route } from 'react-router-dom'
import ContactForm from '../components/ContactForm';
import UserMenu from '../components/UserMenu';

const RestrictedRoute = () => {
  return (
    <Routes>
    <Route path="/" element={<ContactForm/>}></Route>
    <Route path="/login" element={<UserMenu/>}></Route>
  </Routes>
  );
}

export default RestrictedRoute