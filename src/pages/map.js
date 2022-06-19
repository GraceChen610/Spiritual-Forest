/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-shadow */
import styled from 'styled-components';

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';

const Box = styled.div`
  background-color: white;
  display:flex;
  justify-content: space-between;

`;
const MapWapper = styled.div`
position:absolute; 
left:0; 
top:0 ; 
height:100%;
width:100%;
z-index:0;
`;
const Flex = styled.div`
      ${'' /* position="relative" */}
  display:flex;
  flex-direction:column;
  height:100vh;
  width:100vw;
  align-items:center;
`;

const SearchBar = styled.div`
  background-color: white;
  width:600px;
  z-index : 1;
  display:flex;
  flex-direction:column;
`;

const Button = styled.button`
`;

const Input = styled.input`
`;
const center = { lat: 25.038489, lng: 121.532369 };
function MapApp() {
  const [libraries] = useState(['places']);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries,
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [position, setposition] = useState({ lat: 25.038489, lng: 121.532369 });

  async function getStore() {
    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=25.038489,121.532369&radius=3000&keyword=%E5%BF%83%E7%90%86%E8%AB%AE%E5%95%86&language=zh-TW&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`;
    const store = await fetch(url);
    const res = await store.json();
    console.log(res.results);
    localStorage.setItem('position', JSON.stringify(res.results));
  }

  const allStore = JSON.parse(localStorage.getItem('position'));
  console.log(allStore);
  // eslint-disable-next-line prefer-const
  let storeDetail = allStore.map(
    (item) => ((item)),
  );
  console.log(storeDetail);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  useEffect(() => {
  // 定位
    gettingPosition()
      .then((position) => successCallback(position))
      .catch((error) => errorCallback(error));
  }, []);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  // useEffect(() => {

  // }, []);

  async function calculateRoute() {
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    if (destiantionRef.current.value === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      // origin: originRef.current.value,
      origin: position,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destiantionRef.current.value = '';
  }

  // 及時定位
  function gettingPosition() {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        const option = {
          enableAcuracy: false, // 提高精確度
          maximumAge: 0, // 設定上一次位置資訊的有效期限(毫秒)
          timeout: 10000, // 逾時計時器(毫秒)
        };
        navigator.geolocation.getCurrentPosition(resolve, reject, option);
      });
    }
    alert('Does not support positioning!');
  }
  function successCallback(position) {
    console.log(position);
    setposition({ lat: position.coords.latitude, lng: position.coords.longitude });
  }
  function errorCallback(error) {
    alert(error.message); // error.code
  }

  return (
    <Flex>
      <MapWapper>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          // options={{
          //   zoomControl: false,
          //   streetViewControl: false,
          //   mapTypeControl: false,
          //   fullscreenControl: false,
          // }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          <Marker position={position} />
          {storeDetail.map((e) => (<Marker position={e.geometry.location} title={e.name} />))}
          ;
          {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </MapWapper>
      <SearchBar>
        <Box>
          <Box>
            {/* <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete> */}
            前往目的地
          </Box>
          <Box>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <Box>
            <Button colorScheme="pink" type="submit" onClick={() => calculateRoute()}>
              Calculate Route
            </Button>
            <Button
              aria-label="center back"
              // icon={<FaTimes />}
              onClick={() => clearRoute()}
            >
              clearRoute
            </Button>
          </Box>
        </Box>
        <Box>
          <span>
            Distance:
            {distance}
          </span>
          <span>
            Duration:
            {duration}
          </span>
          <Button
            onClick={() => {
              gettingPosition()
                .then((position) => successCallback(position))
	    .catch((error) => errorCallback(error));
              map.panTo(position);
              console.log(position);
              map.setZoom(15);
              getStore();
            }}
          >
            我的位置
          </Button>
          {/* <Button onClick={
              () => gettingPosition()
                .then((position) => successCallback(position))
	    .catch((error) => errorCallback(error))
          }
          >
            重新定位
          </Button> */}
        </Box>
      </SearchBar>
    </Flex>
  );
}

export default MapApp;
