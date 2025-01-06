import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import Styles from './Navigation.module.css'
const Navigation = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    
  return (
    <div className={Styles.pageLinks}>
        <NavLink to="/home" className={Styles.homeLink}>Home</NavLink>
        {isLoggedIn && (<NavLink to="/contacts" className={Styles.contactLink}>Contacts</NavLink>)  }
        </div>
  )
}

export default Navigation
