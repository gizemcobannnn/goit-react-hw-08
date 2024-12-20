import ContactForm from "./ContactForm";
import ContactList from "./ContactList"
import SearchBox from "./SearchBox"
import { logoutUser } from "../redux/auth/slice";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

 
    if(!isLoggedIn){
      navigate("/login");
      return null
    }

    const handleLogout = () => {
      dispatch(logoutUser())
        .unwrap() // Hata ve başarıyı yakalamak için
        .then(() => {
          navigate("/login"); // Başarıyla logout sonrası login sayfasına git
        })
        .catch((error) => {
          console.error("Logout failed:", error); // Hata durumunda log bas
        });
    };

  return (

    <div>
            <div>
              <h1>Welcome!</h1>
              <button
                style={{
                  position:"absolute",
                  top:"10px",
                  right:"10px",
                  display:"flex",
                  justifyContent: "flex-end",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={handleLogout}
              >Logout</button >
            </div>
      <ContactForm/>
      <SearchBox/>
      <ContactList/>
    </div>
  )
}

export default UserMenu;