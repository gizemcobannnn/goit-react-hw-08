import ContactForm from "./ContactForm";
import ContactList from "./ContactList"
import SearchBox from "./SearchBox"
import { logoutUser } from "../redux/auth/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    // Logout işlemi

    const handleLogout = () => {
      dispatch(logoutUser());
      navigate("/login");
      console.log("logout")
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
              >
                Logout
              </button>
            </div>
      <ContactForm/>
      <SearchBox/>
      <ContactList/>
    </div>
  )
}

export default UserMenu;