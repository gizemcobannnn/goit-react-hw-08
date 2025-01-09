import LoginForm from "../components/AuthNav/LoginForm/LoginForm"
import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const {isLoggedIn, token} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(isLoggedIn && token){
      navigate('/usermenu',  { replace: true });
    }
  },[isLoggedIn, navigate]);

  return (
    <div>
        <LoginForm/>
    </div>
  )
}

export default Login