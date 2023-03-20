import './NavBar.css'
import {Link} from "react-router-dom";
function NavBar(){
    return(
         <div className="nav-customized navbar transparent navbar-expand-lg   justify-content-between" >
            <div className="text-white" id="navbarText">
                {/* <Link className="nav-link" to="/">Car Helper</Link> */}
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Infinity Cube</Link>
                    </li>
                </ul>
            </div>
            <Link className="nav-link" to="/login">
                <button className="btn register" type="button" >Login</button>
            </Link>
        </div>
    );
}

export default NavBar;
