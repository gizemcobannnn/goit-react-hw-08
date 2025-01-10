/*
    useSelector metodu kullanılıyor.
    useDispatch metodu kullanılıyor.
    Kullanıcının adı, useSelector ile alınan verilerle render ediliyor.
    Bir buton mevcut ve onClick metodunda logOut işlemiyle dispatch çağrılıyor.
*/

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/slice"
import Navigation from "./Navigation";
import Styles from './UserMenu.module.css'

export default function UserMenu() {
  const dispatch = useDispatch();
  const {user, token} = useSelector((state) => state.auth);

  const handleLogout = async () => {
    if(token){
      try {
        await dispatch(logoutUser(token)).unwrap();
  
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    
  };

  return (
    <div>
       <Navigation/>
      <button onClick={handleLogout} className={Styles.logoutButton}>Logout</button>
      <p className={Styles.username}>Welcome {user.name}!</p>
     
      </div>
  );
}