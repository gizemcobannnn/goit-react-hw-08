/*
    useSelector metodu kullanılıyor.
    useDispatch metodu kullanılıyor.
    Kullanıcının adı, useSelector ile alınan verilerle render ediliyor.
    Bir buton mevcut ve onClick metodunda logOut işlemiyle dispatch çağrılıyor.
*/

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/slice"

export default function UserMenu() {
  const dispatch = useDispatch();
  const {user, token} = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser(token)).unwrap();

    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <p>Welcome {user.name}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}