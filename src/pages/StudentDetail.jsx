import {navArray} from "./NavArray.js";
import {NavLink} from "react-router-dom";

function NavBar() {

    const activeLink =({isActive})=>{
        return isActive ? "nav-link active" : "nav-link";    }
    return (
        <ul>
            {navArray.map((link, index)=>(
                <li key={index}>
                    <NavLink className={activeLink} to={link.path}> {link.name}</NavLink>
                </li>
            ))}
        </ul>
    )
}
export default NavBar;