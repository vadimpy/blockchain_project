import React, { useState, useEffect } from 'react'
import '../styles/Google.css'
// import * as google from "../services/Google"
// import "./style.css";
// import {google, Loader, LoaderOptions} from 'google-maps';
// or const {Loader} = require('google-maps'); without typescript
 
// const options: LoaderOptions = {/* todo */};
// const loader = new Loader('AIzaSyB8dEU2ife9i70GBBqpCutq_VZA9ZIlnKQ', options);
import Map from '../Map/';
import {loadMapApi} from "../utils/GoogleMapsUtils";

export default function Google() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [distanceInKm, setDistanceInKm] = useState<number>(-1);

  useEffect(() => {
      const googleMapScript = loadMapApi();
      googleMapScript.addEventListener('load', function () {
          setScriptLoaded(true);
      });
  }, []);

  const renderDistanceSentence = () => {
      return (
          <div className='distance-info'>
              {`Distance between selected marker and home address is ${distanceInKm}km.`}
          </div>
      );
  };

  return (
      <div className="App">
          {scriptLoaded && (
              <Map
                mapType={google.maps.MapTypeId.ROADMAP}
                mapTypeControl={true}
                setDistanceInKm={setDistanceInKm}
              />
          )}
          {distanceInKm > -1 && renderDistanceSentence()}
      </div>
  );
}
