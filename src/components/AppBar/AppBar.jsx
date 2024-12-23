import { useSelector } from "react-redux"
import Navigation from "../Navigation/Navigation"
import AuthNav from "../Navigation/AuthNav"
import UserMenu from "../Navigation/UserMenu";

const AppBar = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <div>
        <Navigation></Navigation>
        {isLoggedIn && <UserMenu />}
        {!isLoggedIn && <AuthNav />}
    </div>
  )
}

export default AppBar