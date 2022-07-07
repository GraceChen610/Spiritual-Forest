/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Quiz from './pages/quiz';
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

function App() {
  // eslint-disable-next-line no-unused-vars
  const [User, setUser] = useState();

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
        // User is signed out
        // ...
        console.log('User is signed out');
      }
    });
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
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
