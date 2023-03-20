import { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import '../styles/Add.css'
import * as solanaWeb3 from "../services/solana"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import error from "../assets/images/error.svg"
import success from "../assets/images/success.svg"

interface ILocation {
  longtitude: string,
  latitude: string
}

interface IProps {
  acc: string;
}
export default function Verify({acc}: IProps) {
  const [account, setAccount] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(true);
  const [verified, setVerified] = useState(false);
  const [successVerification, setSuccessVerification] = useState(false);
  const [valid, setValid] = useState(false);
  const [name, setName] = useState("");
  const [soo, setSoo] = useState("");
  const [exp, setExp] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [longtitude, setLongtitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [checkpoints, setCheckpoints] = useState<string[]>([]);

  const [location, setLocation] = useState<ILocation>({longtitude: "", latitude:""});
  const [searchParams, setSearchParams] = useSearchParams();
  function getLocation() {
    setIsLoadingGeolocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition, ()=>{
        setIsLoadingGeolocation(false)
        setIsLoading(false);
      });
    } else { 
      window.alert("Geolocation is not supported by this browser.");
    }
  }
  
  function getPosition(position: any) {
    setLocation({longtitude: position.coords.longitude, latitude: position.coords.latitude})
    setIsLoadingGeolocation(false)
    setIsLoading(false);
  }

  const verify = async (longtitude: string, latitude: string, soo:string, exp: number) => {
    setIsLoading(true);
    if(latitude !== "" && longtitude!=="" && soo!=="" && exp!==0 && !isLoadingGeolocation ){
      let res = await solanaWeb3.verifyData(soo, exp,Number(longtitude), Number(latitude))
      if(res === 0) setSuccessVerification(false)
      else setSuccessVerification(true)
      setVerified(true)
      setIsLoading(false);
    }
    else{
      console.log(latitude, longtitude, soo, exp)
      window.alert("Please allow location access")
      getLocation()
    }
  }
  useEffect(()=>{
    setIsLoading(true);
    if(acc === "" && !acc && !localStorage.getItem("account")){
      navigate('/login');
      return;
    }
    if(localStorage.getItem("account")){
      acc = localStorage.getItem("account")!
      setAccount(localStorage.getItem("account")!)
    }
    else{
      setAccount(acc)
    }
    getLocation()
    let tempSoo =   searchParams.get("soo")
    let tempLongtitude =   searchParams.get("longtitude")
    let tempLatitude =   searchParams.get("latitude")
    let tempExp =   searchParams.get("exp")
    let tempName =   searchParams.get("name")
    let tempPrice =   searchParams.get("price")
    let tempBrand =   searchParams.get("brand")
    let tempCategory =   searchParams.get("category")
    let tempCheckpoints =   searchParams.get("checkpoints")
    console.log(tempSoo )
    console.log(tempLongtitude )
    console.log(tempLatitude )
    console.log(tempExp)
    console.log(tempName)
    console.log(tempPrice)
    console.log(tempBrand)
    console.log(tempCategory)
    console.log(tempCheckpoints)
    if(
      (tempSoo === null || tempSoo.length === 0)
      || (tempLongtitude === null || tempLongtitude.length === 0) || isNaN (Number(tempLongtitude))
      ||(tempLatitude === null || tempLatitude.length === 0) || isNaN (Number(tempLatitude))
      ||(tempExp === null || tempExp.length === 0) || isNaN (Number(tempExp))
      ||(tempName === null || tempName.length === 0)
      ||(tempPrice === null || tempPrice.length === 0) || isNaN (Number(tempPrice))
      ||(tempBrand === null || tempBrand.length === 0)
      ||(tempCategory === null || tempCategory.length === 0)
      ){
        setValid(false);
        setIsLoading(false);
        setVerified(true);
        window.alert("Invalid url");
      }
      else{
        setSoo(tempSoo)
        setLongtitude(Number(tempLongtitude))
        setLatitude(Number(tempLatitude))
        setExp(Number(tempExp))
        setPrice(Number(tempPrice))
        setCategory(tempCategory)
        setName(tempName)
        if(!(tempCheckpoints === null || tempCheckpoints.length === 0)){
          setCheckpoints(tempCheckpoints.split(","))
          if(!tempCheckpoints.includes(acc)) {
            verify(tempLongtitude, tempLatitude, tempSoo, Number(tempExp))
              .catch(console.error);
              setValid(true);
              setIsLoading(false);
          }
          else{
             setValid(false);
             setIsLoading(false);
          }
        }
        else{
          verify(tempLongtitude, tempLatitude, tempSoo, Number(tempExp))
          .catch(console.error);
          setValid(true);
          setIsLoading(false);
        }
      }
  },[])

  const successBlock = (
    <div className="success-block">
      <img className="success-image" src={success} alt="success"/> 
      <span className="success-message">Verification successful!</span>
      <span className="item">Name: {name}</span>
      <span className="item">Price: {price}</span>
      <span className="item">Category: {category}</span>
    </div>
)
  const failureBlock = (
      <div className="error-block">
        <img className="error-image" src={error} alt="error"/> 
        <span className="error-message">ALERT! This item has been verified before! </span>
      </div>
  )
  const verifyBlock = (
    <div className="verify-block">
      <button className="btn submit" onClick={() => verify(location.longtitude, location.latitude, soo, exp)}>Verify!</button> 
    </div>
  )
  return (
    <div className="background">
    <div style={{display: "flex"}}>
      <button className="submit btn mar10">
        <Link to="/" className="overwrite-link">
          Back to home page
          </Link>
        </button>
    </div>
    {isLoadingGeolocation &&  <div>Fetching location.....</div>}
      {isLoading && <div>Fetching data.....</div>}
          {verified ? (valid  ? ((successVerification && !isLoadingGeolocation )? successBlock : failureBlock): <div>Nothing to show here</div>) : verifyBlock}
      </div>
  );
}
