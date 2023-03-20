import React,{useState} from 'react';
import './Investor.css'
import headphone from "../img/headphones1.svg"
import money from "../img/Mpney.svg"
import stock from "../img/stock.svg"
import personCheck from "../img/Personcheck.svg"
import graph from "../img/Group6.png"
import {Link} from "react-router-dom";
function Investor(){
    const [isArtist,setIsArtist] = useState(true)
    return(
        <div className='main'>
        <div className="main-content">
           <div className="main-header">
               <div className="main-header-role">
                <div className="role">
                    <div style={{flex:1, fontWeight: 600, color: 'white', alignSelf:'flex-end', paddingRight: 10,paddingTop:10}}>I am an</div>
                    <div className="role-name">
                        <span className='highlight'>{isArtist?'artist':'investor'}</span>
                        <span className="non-highlight" style={{rotate:'10deg'}}>{" / "}</span>
                        <span className='non-highlight clickable'onClick={()=>{setIsArtist(!isArtist)}} >{isArtist?'investor':'artist'}</span>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div style={{width: "92%", display:'flex', marginTop:10,justifyContent:'space-between'}}>
                        <span className="introduce" >
                            Introducing
                        </span>
                        <img className="introduce-image" src={headphone} alt="headphone"/>
                    </div>
                    <div style={{width: "16%"}}></div>
                </div> 
                <div className="row">
                    <div style={{width: "12%"}}></div>
                    <div style={{width: "76%",textAlign:'center'}}>
                        <span className="giant-steps" >
                            GIANT STEPS
                        </span>
                    </div>
                    <div style={{width: "12%"}}></div>
                </div>
                    <div className="triangle">  </div>
                <div className="row">
                    <div style={{width: "12%",backgroundColor:'white', marginRight: -1}}></div>
                    <div style={{width: "76%",textAlign:'center',backgroundColor:'white'}}>
                        <span className="slogan" >
                            Your talent, your success.
                        </span>
                    </div>
                    <div style={{width: "12%"}}></div>
                </div>
                <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',height: 100}}>
                        <button className="btn how-it-work-button" >
                            How it works
                        </button>
                </div>
           </div>
           <div className="role-header">
              
                <div className="row">
                    <div style={{width: "92%", display:'flex',justifyContent:'space-between'}}>
                        <span className="role-introduce" >
                            {isArtist? "Income with ownership": "Invest early in raising talent"}
                        </span>
                    </div>
                    <div style={{width: "16%"}}></div>
                </div> 
               {isArtist ? <div className="artist-intro">
                    <div className="artist-intro-text">
                        Maintain ownership of your music while allowing people to invest on it and network for you
                    </div>
                    <div style={{width: '40%'}}>
                        <img style={{width: '80%',alignSelf:'flex-end'}} className="money-image" src={money} alt="headphone"/>
                    </div>
                </div>
                :
                <div className="investor-intro" style={{paddingTop: 20, display: 'flex', justifyContent: 'space-around', alignItems:'center'}} >
                    <img style={{width: '90%',alignSelf:'flex-end'}} className="money-image" src={graph} alt="graph"/>
                </div>
                }
                <br/>
           </div>
           <div className="suggestion">
              
              <div className="row">
                  <div style={{width: "40%"}}></div>
                  <div style={{width: "60%", display:'flex',justifyContent:'flex-end'}}>
                      <span className="suggestion-introduce" >
                          {isArtist? "Success without luck": "Support small artists and see them grow"}
                      </span>
                  </div>
              </div> 

              <div className="row">
                  <div style={{width: "40%"}}></div>
                  <div style={{width: "60%"}}>
                      <span className="suggestion-intro-text" style={{ display:'flex', textAlign: 'end'}}>
                            {isArtist? "Don't depend on word of mouth or and algorithm for your growth": "Invest in a small artist and watch you  money multiply as their viewers grow"}
                         
                      </span>
                  </div>
              </div> 
              <img style={{width: '100%',height: 300}} src={stock} alt="stock"/>
         </div>

         <div className="waitlist">
              
            <div className="row">
                    <div style={{width: "92%", display:'flex',justifyContent:'space-between'}}>
                        <span className="waitlist-introduce" >
                            {isArtist? "Income with ownership": "Invest early in raising talent"}
                        </span>
                    </div>
                    <div style={{width: "16%"}}></div>
                </div> 
                <div className="waitlist-intro">
                    <div className="waitlist-intro-text">
                        Maintain ownership of your music while allowing people to invest on it and network for you
                    </div>
                    <div style={{width: '40%'}}>
                        <img style={{width: '80%',alignSelf:'flex-end',paddingLeft: 10}} className="money-image" src={personCheck} alt="Person check"/>
                    </div>
                </div>

                <div className="waitlist-intro">
                    <div style={{width: "50%"}}></div>
                    <div style={{width: '50%', paddingRight:15,paddingTop: 20,paddingBottom: 20}}>
                        
                    <Link to="/waitlist">
                        <button className="btn  waitlist-button"> Join the waitlist</button>
                    </Link>
                                
                    </div>
                </div>

         </div>
      </div>
      </div>
    );
}

export default Investor;
