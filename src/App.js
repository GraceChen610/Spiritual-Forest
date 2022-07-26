import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { onAuthStateChanged } from 'firebase/auth';
import firebaseStores, { auth } from './firebase';
import MapApp from './pages/mapApp';
import Home from './pages/home';
import Record from './pages/record';
import Shuffle from './card';
import Login from './pages/login';
import QuizApp from './pages/quiz/index';
import UserContext from './userContext';
import Truf from './pages/truf';

const ForceLandscapeAlert = styled.div`
display:none;
  @media only screen and (orientation:portrait){
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(130deg, #D7FFFE, #ace0f9, #ace0c1);
    height:100vh;

    p{
      width:80%;
      font-size: 1.8rem;
      text-align: justify;
    }
  }
`;

const Main = styled.div`
  @media only screen and (orientation:portrait) {
    display: none;
  }
  @media only screen and (max-width: 980px) {
    display: none;
  }
`;

function App() {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        firebaseStores.getOneDoc('users', uid)
          .then((res) => {
            setUserData({ uid, userData: res.data().content });
          });

        // ...
      } else {
        setUserData(null);
      }
    });
  }, []);

  return (
    <Router>
      <UserContext.Provider value={userData}>
        <ForceLandscapeAlert>
          <p>
            親愛的~
            <br />
            為確保最佳使用體驗，請使用&quot;平板或電腦&quot;裝置瀏覽本網站。
          </p>
          <p>
            若使用平板瀏覽&quot;請將螢幕轉為橫向&quot;哦~
          </p>
        </ForceLandscapeAlert>

        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="quiz" element={<QuizApp />} />
            <Route path="map" element={<MapApp />} />
            <Route path="map?search=restaurant" element={<MapApp />} />
            <Route path="map?search=park" element={<MapApp />} />
            <Route path="map?search=movie" element={<MapApp />} />
            <Route path="card" element={<Shuffle />} />
            <Route path="record" element={<Record />} />
            <Route path="login" element={<Login />} />
            <Route path="truf" element={<Truf />} />
          </Routes>
        </Main>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
