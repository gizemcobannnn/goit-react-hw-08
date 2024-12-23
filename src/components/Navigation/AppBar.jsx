import Navigation from "./Navigation";
import { useSelector } from "react-redux";
import AuthNav from "./AuthNav";
import UserMenu from "./UserMenu";

export default function AppBar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
}