import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to='/' >
        Signup
      </NavLink>
      <NavLink to='/login' >
        Login
      </NavLink>
    </nav>
  )
}

export default Navbar