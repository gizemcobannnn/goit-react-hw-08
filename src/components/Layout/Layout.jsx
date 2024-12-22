import AppBar from "../AppBar/AppBar"

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {
  return (
    <div>
    <AppBar />

    {/* children prop'u render edilir */}
    <main>
      {children}
    </main>
    </div>
  )
}

export default Layout