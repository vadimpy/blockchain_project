import React,{useState} from 'react';
import './NavBar.css'
import headphone from "../img/headphones1.svg"
import money from "../img/Mpney.svg"
import stock from "../img/stock.svg"
import personCheck from "../img/Personcheck.svg"
import graph from "../img/Group6.png"
import {Link} from "react-router-dom";
function Footer(){
    return(
        <section className="">
        <footer className="bg-dark text-center text-white" style={{backgroundColor: "#0a4275"}}>
          <div className="container p-4 pb-0">
            <section className="">
              <p className="d-flex justify-content-center align-items-center">
                <Link className="nav-link" to="/waitlist">
                    <button type="button" className="btn btn-outline-success">
                    Join the waitlist!
                    </button>
                </Link>
              </p>
            </section>
          </div>
          <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
            © 2021 Copyright:
            <a className="text-white" href="https://www.linkedin.com/in/andrew-nguyen-02/">Andrew Nguyen's product</a>
          </div>
        </footer>
      </section>
    );
}

export default Footer;
