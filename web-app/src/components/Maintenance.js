import React,{useState} from 'react';
import './Waitlist.css'
import backarrow from "../img/backarrow.svg"
import {Link} from "react-router-dom";
import validator from 'validator';
import SheetsMaintenance from './SheetsMaintenance'

function Maintenance(){
    return(
        <div style={{}}>
        <div className="main-header-waitlist" style={{padding: "100px 0"}}>
           <div className="content">
               
                <Link to="/">
                    <img style={{width: 40,height: 40}} src={backarrow} alt="backarrow"/>
                </Link>
                <div style={{paddingTop: 50}}>
                    <span className="join-waitlist" > Maintenance and repair</span>
                </div>
                <br/>
                <SheetsMaintenance/>
           </div>
        </div>
        </div>
    );
}

export default Maintenance;

  