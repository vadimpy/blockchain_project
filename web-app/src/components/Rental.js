import React,{useState} from 'react';
import './Waitlist.css'
import './Rental.css'
import backarrow from "../img/backarrow.svg"
import {Link} from "react-router-dom";
import validator from 'validator';
import SheetsRental from './SheetsRental'

function Rental(){
    return(
        <div >
        <div className="main-header-rental" style={{padding: "100px 0"}}>
           <div className="content">
               
                <Link to="/">
                    <img style={{width: 40,height: 40}} src={backarrow} alt="backarrow"/>
                </Link>
                <div style={{paddingTop: 50}}>
                    <span className="join-waitlist" > Long-term car rental</span>
                </div>
                <br/>
                <SheetsRental/>
           </div>
        </div>
        </div>
    );
}

export default Rental;

  