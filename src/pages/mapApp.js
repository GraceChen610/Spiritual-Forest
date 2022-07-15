/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
import { AiOutlineCar } from 'react-icons/ai';
import { GiPathDistance } from 'react-icons/gi';
import { MdOutlineMyLocation } from 'react-icons/md';
import styled from 'styled-components/macro';
import { Link, useSearchParams } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import PropTypes from 'prop-types';

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';

const Box = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  span{
    display: flex;
    align-items: center;
    svg{
      margin-right: 10px;
    }

  }
`;

const MapWapper = styled.div`
${'' /* position:absolute;  */}
left:0; 
top:0 ; 
height: 80%;
width:  80%;
z-index:0;
div {
  border-radius: 20px;
}
`;

const Flex = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: space-evenly;
  background: url(/img/mapBg.png) no-repeat 0% 15% / 100% 100% ;
  height:100vh;
  width:100%;
`;

const SearchBar = styled.div`
  background-color: white;
  padding:10px;
  border-radius: 15px;
  z-index : 1;
  display:flex;
  flex-direction:column;
  font-size: 1.2rem;
  color:#491818;

  input{
    line-height: 1.3rem;
    font-size: 1rem;
    border-radius: 5px;
    margin: 0 10px;
    border: none;
    background:rgba(44, 187, 99, .2);
    padding:5px 8px;
    :focus{
    outline: none;
    }
  }

  svg{
    margin-top: 5px;
    font-size: 1.5rem;
    cursor: pointer;
    color:#491818;
  }

  span{
    align-items: flex-end;
  }
`;

const Button = styled.button`
  background-color: #c2fbd7;
  border-radius: 10px;
  box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: inline-block;
  padding: 7px 14px;
  margin: 0px 5px 10px 10px ;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  :hover {
    box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
    transform: scale(1.05) rotate(-1deg);
  }
`;

const Btncontrol = styled.div`
  display:${(props) => props.backbtn || 'block'};
`;

const center = { lat: 25.038489, lng: 121.532369 };

MapApp.propTypes = {
  backbtn: PropTypes.string,
};

// MapApp.propTypes = {
//   backbtn: PropTypes.string
// };

MapApp.defaultProps = {
  backbtn: 'block',
};

function MapApp({ backbtn }) {
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
  const [allStore, setAllstore] = useState([]);
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search');
  console.log(search);

  // eslint-disable-next-line prefer-const
  let keyword = '心理諮詢';

  if (search === 'restaurant') {
    keyword = '餐廳';
  } else if (search === 'park') {
    keyword = 'park';
  } else if (search === 'movie') {
    keyword = 'movie';
  } else {
    keyword = '心理諮詢';
  }

  console.log(keyword);
  useEffect(() => {
    // 定位
    gettingPosition()
      .then((myposition) => successCallback(myposition))
      .catch((error) => errorCallback(error));
  }, []);

  function getStore() {
    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=25.038489,121.532369&radius=3000&keyword=${keyword}&language=zh-TW&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`;
    fetch(url)
      .then((store) => store.json())
      .then((res) => setAllstore(res.results));
  }

  useEffect(() => {
    getStore();
  }, []);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  async function calculateRoute() {
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
    destiantionRef.current.value = '';
  }

  function goToMarker(name) {
    destiantionRef.current.value = name;
    calculateRoute();
  }

  // 及時定位
  // eslint-disable-next-line consistent-return
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
    setposition({ lat: position.coords.latitude, lng: position.coords.longitude });
  }
  function errorCallback(error) {
    alert(error.message); // error.code
  }

  return (
    <Flex>
      <Link to="/" title="back">
        <Btncontrol backbtn={backbtn}>
          <IoArrowBackCircle className="nav back" />
        </Btncontrol>
      </Link>

      <SearchBar>
        <Box>
          目的地：
          <Autocomplete>
            <input
              type="text"
              placeholder="請輸入目的地"
              ref={destiantionRef}
            />
          </Autocomplete>

          <Box>
            <Button colorScheme="pink" type="submit" onClick={() => calculateRoute()}>
              出發
            </Button>
            <Button
              aria-label="center back"
              // icon={<FaTimes />}
              onClick={() => clearRoute()}
            >
              重設
            </Button>
          </Box>
        </Box>
        <Box>
          <span>
            <GiPathDistance title="距離" />
            {distance}
          </span>
          <span>
            <AiOutlineCar title="開車時間" />
            {' '}
            {duration}
          </span>
          {/* <Button></Button> */}
          <MdOutlineMyLocation
            type="button"
            title="我的位置"
            onClick={() => {
              gettingPosition()
                .then((position) => successCallback(position))
                .catch((error) => errorCallback(error));
              map.panTo(position);
              map.setZoom(15);
              getStore();
            }}
          />

        </Box>
      </SearchBar>

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
          <Marker position={position} title="U are Here ~" />
          {allStore.map((e) => (
            <Marker
              position={e.geometry.location}
              title={e.name}
              onClick={() => goToMarker(e.name)}
            />
          ))}
          ;
          {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </MapWapper>
    </Flex>
  );
}

export default MapApp;
