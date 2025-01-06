import { NavLink } from "react-router-dom";
import Styles from './Navigation.module.css'
const Navigation = () => {
  
  return (
    <div className={Styles.pageLinks}>
        <NavLink to="/home" className={Styles.homeLink}>Home</NavLink>
        <NavLink to="/contacts" className={Styles.contactLink}>Contacts</NavLink>
     </div>
  )
}

export default Navigation
