import { useEffect } from 'react';
import RegistrationForm from '../components/AuthNav/RegistrationForm/RegistrationForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'; 

const Registration = () => {

  const {isLoggedIn, token} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(isLoggedIn && token){
      navigate('/usermenu',  { replace: true });
    }
  },[isLoggedIn, navigate]);

  return (
    <div>
        <RegistrationForm/>
    </div>
  )
}

export default Registration