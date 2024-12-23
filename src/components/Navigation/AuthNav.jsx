import { NavLink } from 'react-router-dom'; // react-router-dom olmalı
import styles from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <div className={styles.navContainer}>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
        }
      >
        Register
      </NavLink>
    </div>
  );
}
