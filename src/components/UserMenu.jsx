import ContactForm from "./ContactForm";
import ContactList from "./ContactList"
import SearchBox from "./SearchBox"
import { logoutUser, setToken } from "../redux/auth/slice";
import { useDispatch,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, token} = useSelector((state) => state.auth);
  console.log(token)

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/login"); // Başarılı çıkış durumunda yönlendirme
      })
      .catch((error) => {
        console.error("Logout failed:", error); // Hata konsola yazılır
        alert("Logout failed: " + (error.message || "An unknown error occurred")); // Kullanıcıya hata mesajı gösterilir
      });
    dispatch(setToken(null))
  };


  return (
    <div>
      <div>
        <h1>Welcome {user.name}!</h1>
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
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
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  )
}

export default UserMenu;