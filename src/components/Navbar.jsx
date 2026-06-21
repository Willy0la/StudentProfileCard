import { NavLink } from "react-router-dom";
import { navArray } from "../utils/NavArray.js";

function Navbar() {
  const getLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav>
      <ul className="navbar">
        {navArray.map((link) => (
          <li key={link.path}>
            <NavLink className={getLinkClass} to={link.path}>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
