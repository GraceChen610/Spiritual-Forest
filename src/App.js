import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './pages/quiz';
import MapApp from './pages/mapApp';
import Home from './pages/home';
import Record from './pages/record';
import Shuffle from './card';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="map" element={<MapApp />} />
        <Route path="map?search=restaurant" element={<MapApp />} />
        <Route path="map?search=park" element={<MapApp />} />
        <Route path="map?search=movie" element={<MapApp />} />
        <Route path="card" element={<Shuffle />} />
        <Route path="record" element={<Record />} />
      </Routes>
    </Router>
  );
}

export default App;
