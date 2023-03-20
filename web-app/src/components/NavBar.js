import React,{useState} from 'react';
import './NavBar.css'
import headphone from "../img/headphones1.svg"
import money from "../img/Mpney.svg"
import stock from "../img/stock.svg"
import personCheck from "../img/Personcheck.svg"
import graph from "../img/Group6.png"
import {Link} from "react-router-dom";
function NavBar(){
    const [isArtist,setIsArtist] = useState(true)
    return(
         <div class="nav-customized navbar transparent navbar-expand-lg   justify-content-between" >
            <div class="text-white" id="navbarText">
                {/* <Link className="nav-link" to="/">Car Helper</Link> */}
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link className="nav-link" to="/">Explore</Link>
                    </li>
                    <li class="nav-item active">
                        <Link className="nav-link" to="/rental">Activity</Link>
                    </li>
                    <li class="nav-item active">
                        <Link className="nav-link" to="/maintenance">How it works</Link>
                    </li>
                </ul>
            </div>
            <Link className="nav-link" to="/waitlist">
                <button class="btn register" type="button" >Register</button>
            </Link>
        </div>
    );
}

export default NavBar;
