import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './pages/quiz';
import MapApp from './pages/mapApp';
// import Card from './pages/card';
import NewCard from './cardjs/newcard';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="map" element={<MapApp />} />
        <Route path="map?search=restaurant" element={<MapApp />} />
        <Route path="map?search=park" element={<MapApp />} />
        <Route path="map?search=movie" element={<MapApp />} />
        <Route path="card" element={<NewCard />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
