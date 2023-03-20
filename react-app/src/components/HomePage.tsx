import './HomePage.css'
import NavBar from "./NavBar"
import infinity from "../assets/images/InfinityCubeHeader.svg"
import backgroundLight from "../assets/images/authentic.svg"
import scanBox from "../assets/images/scan_box.svg"
import rightTriangle from "../assets/images/right_triangle.svg"
import {Link} from "react-router-dom";
function HomePage(){
    return(
        <>
        <div className="testclass">
            <NavBar/>
            <div className= "row"style={{height: '100%', margin: "0", padding: "0"}}>
                <div className="col-md-6 left col-xs-12">
                    <div className="home-header">
                        <span className="cube">Infinity Cube</span>
                        <span className="powered">Powered by Solana</span>
                        <img className="infinity-image" src={infinity} alt="Infinity"/> 
                    </div>
                    <div className="home-subheader">
                        <span className="text-subheader">Transport, buy, and sell products more securely, knowing they are authentic and verifiable - putting an end to counterfeits</span>
                    </div>
                    <div className="actions">
                        <Link className="nav-link" to="/verify" style={{padding: 0}}>
                            <button className="btn authenticate" style={{}}>
                                Authenticate
                            </button>
                        </Link>
                        <Link className="nav-link" to="/init" style={{padding: 0}}> 
                            <button className="btn subscribe" style={{}}>
                                Initialize 
                                <img style={{paddingLeft: 10}} className="right-triangle-image" src={rightTriangle} alt="rightTriangle "/> 
                            </button>
                        </Link>
                    </div>
                    
                    <div className="facts row">
                        <div className="fact-item col-xl-12 col-md-12 col-ms-12">
                            <div className="fact-item-header">
                                $4,000,000,000,000
                            </div>
                            <div className="fact-item-content">
                                Lost to Counterfeit Goods
                            </div>
                        </div>
                        <div className="fact-item col-xl-12 col-md-12 col-ms-12">
                            <div className="fact-item-header">
                                $200,000,000,000
                            </div>
                            <div className="fact-item-content">
                                Counterfeit Drug Market
                            </div>
                        </div>
                        <div className="fact-item col-xl-12 col-md-12 col-ms-12">
                            <div className="fact-item-content">
                                Let's make it worth <span className="fact-item-header">$0.00!</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1"  style={{padding: 0}}>

                </div>
                <div className="col-md-5 col-xs-12 right " style={{padding: 0}}>

                    <img className="scan-box-image" src={scanBox} alt="scan "/> 
                    <img className="backgroundLight-image" src={backgroundLight} alt="backgroundLight "/> 
                </div>
            </div>
        </div>
        </>);
}

export default HomePage;
