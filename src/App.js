/* eslint-disable no-console */
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import Tour from './pages/tour';

function App() {
  const [User, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const { uid } = user;
        console.log(`uid: ${uid}`);
        firebaseStores.getOneDoc('users', uid)
          .then((res) => {
            console.log(res.data().content);
            setUser({ uid, userData: res.data().content });
          });

        // ...
      } else {
        console.log('User is signed out');
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line max-len
    // window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', () => {
    //   if (window.orientation === 180 || window.orientation === 0) {
    //     // eslint-disable-next-line no-alert
    //     alert('為確保最佳使用體驗，請將手機螢幕轉為橫向瀏覽');
    //   }
    // }, false);
    // screen.orientation.lock('landscape-primary');
  }, []);

  return (
    <Router>
      <UserContext.Provider value={User}>
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
          <Route path="tour" element={<Tour />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
