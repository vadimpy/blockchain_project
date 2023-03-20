import { FC, useEffect, useState } from 'react';
import { useForm } from './Form';
import QrCode from './QrCode';
import '../styles/Add.css'
import {Link} from "react-router-dom"
// import './Registration.scss';
import {stringToHash} from "../services/utility"
import React from 'react';
import JSZip from "jszip";
import { saveAs } from "file-saver";
import * as solanaWeb3 from "../services/solana"
import { useNavigate } from "react-router-dom";
var zip = new JSZip();
type Category = 'shoes' | 'clothing' | 'jewelry' | 'watches';
type Checkpoint = {checkpoint: string}
interface Item {
  name: string;
  quantity: number;
  price: number;
  checkpoint: Checkpoint;
  checkpoints: Checkpoint[];
  category: Category;
  longtitude: string;
  latitude: string;
}
let url = "https://infinity-cube-project.web.app/verify"
interface IProps {
  acc: string
}
interface ILocation {
  longtitude: string,
  latitude: string
}
    
const Init: FC<IProps> = ({acc}) => {
  const [account, setAccount] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    if(acc === "" && !acc && !localStorage.getItem("account")){
      navigate('/login');
      return;
    }
    if(localStorage.getItem("account")){
      setAccount(localStorage.getItem("account")!)
    }
    else{
      setAccount(acc)
    }
    getLocation()
  },[acc, navigate])
    const qrRef = React.useRef<HTMLDivElement>(null);
    const [listQR, setListQR] = useState<string[]>([]);
    const [location, setLocation] = useState<ILocation>({longtitude: "", latitude:""});
    const [listSOO, setListSOO] = useState<string[]>([]);
    const save = async () =>{
        if(listQR && listQR.length > 0){
            let listqrcode = qrRef.current?.querySelector(".listqrcode");
            let canvas = listqrcode!.querySelectorAll("canvas");
            let i =0;
            canvas.forEach(e => {
                let imgData = e.toDataURL("image/png");
                let name = "file"+i +".png";
                i++;
                zip.file(name, imgData.substr(22), {base64: true});
            })
            zip.generateAsync({type: "blob"})
                .then(content => {
                    saveAs(content, "InfinityCube.zip");
                });
            await send(listSOO)
            setListQR([])
            setListSOO([])
        }
        else{
          window.alert("you must generate qrcode first")
        }
    }
    async function send(list: string[]){

        for (const item of list) {
                // console.log("in")
                await solanaWeb3.sendData(item)
        }
    }
  const { handleSubmit, handleChange, data: user, errors } = useForm<Item>({
    validations: {
      name: {
        pattern: {
          value: '^[A-Za-z0-9]*$',
          message:
            "You're not allowed to use special characters.",
        },
      },
      checkpoint: {
        pattern: {
          value: '^[A-Za-z0-9]*$',
          message:
            "You're not allowed to use special characters",
        },
      },
      quantity: {
        custom: {
          isValid: (value) => parseInt(value, 10) > 0,
          message: 'At least 1 item is required',
        },
      },
      price: {
        custom: {
          isValid: (value) => parseInt(value, 10) > 0,
          message: 'Positive value only',
        },
      }
    },
    onSubmit: () => {
      if(location.latitude !== "" && location.longtitude!==""){
        let list : string[] = []
        let listSOO : string[] = []
        user.checkpoints = inputList
        let a = user.name + user.price + account
        for(let i = 0;i< user.quantity;i++){
            let hash = stringToHash(a+i)
            let temp = url+"?soo="+hash+"&longtitude="+location.longtitude+"&latitude="+location.latitude+"&exp="+63+"&name="+user.name+"&price="+user.price+"&brand="+account+"&category="+user.category+"&checkpoints="
            let tem = user.checkpoints.map(x=>x.checkpoint).join(",")
            temp = temp.concat(tem)
            list.push(temp)
            listSOO.push(hash)
            console.log(tem)
        }
        setListQR(list)
        setListSOO(listSOO)
      }
    
      else{
        window.alert("Please share your location")
        
      }
    },
  }); 
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    } else { 
      window.alert("Geolocation is not supported by this browser.");
    }
  }
  
  function getPosition(position: any) {
    setLocation({longtitude: position.coords.longitude, latitude: position.coords.latitude})
  }

  const [inputList, setInputList] = useState<Checkpoint[]>([]);
  const handleInputChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const list: any[] = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  
   
  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
   
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, {checkpoint: ""}]);
  };
  return (
      <div className="background">
        <div style={{display: "flex"}}>
      <button className="submit btn mar10">
         <Link to="/" className="overwrite-link">
           Back to home page
          </Link>
        </button>
        </div>
      <h1>Initialize new SOO </h1>
    <form className="row align-middle" onSubmit={handleSubmit}>
      <div className="left col-md-6 col-xs-12">
          <div className="item">
            <label>Account</label>
            <input
              value={account}
              disabled
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="item">
            <label>Name*</label>
            <input
              placeholder="Enter name"
              value={user.name || ''}
              onChange={handleChange('name')}
              required
            />
          </div>
          <div className="item">
           
            {inputList.map((x, i) => {
              return (
                  <div className="item">
                  <label key={i+"checkpoint"}>Check point</label>
                  <input
                      key={i}
                      name="checkpoint"
                      placeholder="Enter Checkpoint"
                      value={x.checkpoint}
                      onChange={e => handleInputChange(e, i)}
                      required
                  />
                  {errors.checkpoint && <p className="error">{errors.checkpoint}</p>}
                  <div className="btn-box"> 
                  <button
                      className="btn submit"
                      onClick={() => handleRemoveClick(i)}>Remove
                    </button>
                  </div>
                  </div>
              );
              })}
              {inputList.length <5 && <button style={{marginTop: 10}} onClick={handleAddClick} className="submit btn">Add checkpoint</button>}
          </div>
      </div>
      <div className="right col-md-6 col-xs-12">
        
        <div className="item">
            <label>Quantity*</label>
          <input
              placeholder="Enter quantity"
            type="number"
            value={user.quantity || ''}
            onChange={handleChange<number>('quantity', (value) => parseInt(value, 10))}
          />
          {errors.quantity && <p className="error">{errors.quantity}</p>}
        </div>
        <div className="item">
            <label>Price*</label>
          <input
              placeholder="Enter price"
            type="number"
            value={user.price || ''}
            onChange={handleChange<number>('price', (value) => parseInt(value, 10))}
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>
        <div className="item">
            <label>Category</label>
          <select onChange={handleChange('category')} className="input" defaultValue={""} required>
            <option value="" disabled>
              Select category
            </option>
            <option value="shoes" > 
              Shoes
            </option>
            <option value="clothing"  >
              Clothing
            </option>
            <option value="jewelry" >
              Jewelry
            </option>
            <option value="watches" >
              Watches
            </option>
          </select>
        </div>
      </div>
      <div>
        <button type="submit" className="submit btn" style={{marginTop: 20, marginBottom: 10}}>
          Generate QR code
        </button>
      </div>
    </form>
    <div className="row">
        <div className=" col-md-6 col-xs-12">
          <div className="item">
            <label>Longtitude</label>
            <input
              value={location.longtitude || ''}
              disabled
            />
          </div>
        </div>
        <div className="col-md-6 col-xs-12">
          <div className="item">
            <label>Latitude</label>
            <input
              value={location.latitude || ''}
              disabled
            />
          </div>
        </div>
      <div>
        <button className="submit btn " onClick={getLocation}>Set location</button>
      </div>
      </div>
      <div  ref={qrRef}>
          <button disabled={!listQR || listQR.length ===0} className="submit btn" style={{marginTop: 10}} onClick={save}>Save</button>
          <div className="listqrcode"> 
              {listQR && listQR.map((x,i) =>{
                  return <QrCode url={x} key = {i}></QrCode>
              })}
          </div>
      </div>
    </div>
  );
};

export default Init;