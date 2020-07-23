import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";
function NavLinks(props) {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn ? (
        <React.Fragment>
          <li>
            <NavLink to="/5/places"> My Places</NavLink>
          </li>
          <li>
            <NavLink to="/places/new"> Add Place </NavLink>
          </li>
          <li>
            <NavLink to="/auth" onClick={auth.logout}>
              LogOut
            </NavLink>
          </li>
        </React.Fragment>
      ) : (
        <li>
          <NavLink to="/auth"> Authenticate</NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
