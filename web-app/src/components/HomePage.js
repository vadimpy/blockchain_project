import React,{useState} from 'react';
import './HomePage.css'
import headphone from "../img/headphones1.svg"
import money from "../img/Mpney.svg"
import stock from "../img/stock.svg"
import personCheck from "../img/Personcheck.svg"
import graph from "../img/Group6.png"
import NavBar from "./NavBar"
import infinity from "../img/Infinity.svg"
import star from "../img/star.svg"
import backgroundLight from "../img/background_light.svg"
import scan from "../img/scan.svg"
import rightTriangle from "../img/right_triangle.svg"
import {Link} from "react-router-dom";
function HomePage(){
    const [isArtist,setIsArtist] = useState(true)
    return(
        <>
        <div className="testclass">
            <NavBar/>
            <div className= "row"style={{height: '90vh'}}>
                <div className="col-md-1">

                </div>
                <div className="col-md-5 left">
                    <div className="home-header">
                        <img style={{paddingLeft: 10}} className="infinity-image" src={infinity} alt="infinity "/> 
                        <span className="cube">Cube</span>
                        <img style={{paddingLeft: 10}} className="star-image" src={star} alt="star "/> 
                    </div>
                    <div className="home-subheader">
                        <span className="text-subheader">Init the authenticity and history of the  product . Stop counterfeits</span>
                    </div>
                    <div className="actions">
                        <Link className="nav-link" to="/rental" style={{padding: 0}}>
                            <button className="btn authenticate" style={{}}>
                                Authenticate
                            </button>
                        </Link>
                        <Link className="nav-link" to="/maintenance" style={{padding: 0}}> 
                            <button className="btn subscribe" style={{}}>
                                Subscribe 
                                <img style={{paddingLeft: 10}} className="right-triangle-image" src={rightTriangle} alt="rightTriangle "/> 
                            </button>
                        </Link>
                    </div>
                    
                    <div className="facts">
                        <div className="fact-item">
                            <div className="fact-item-header">
                                32k+
                            </div>
                            <div className="fact-item-content">
                                Products
                            </div>
                        </div>
                        <div className="fact-item">
                            <div className="fact-item-header">
                                20k+
                            </div>
                            <div className="fact-item-content">
                                Authentications
                            </div>
                        </div>
                        <div className="fact-item">
                            <div className="fact-item-header">
                                10k+
                            </div>
                            <div className="fact-item-content">
                                Brands
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1">

                </div>
                <div className="col-md-4 right">

                    <img style={{paddingLeft: 10}} className="scan-image" src={scan} alt="scan "/> 
                    <img style={{paddingLeft: 10}} className="backgroundLight-image" src={backgroundLight} alt="backgroundLight "/> 
                </div>
            </div>
        </div>
        </>);
}

export default HomePage;
