import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './pages/quiz';
import MapApp from './pages/mapApp';
import Card from './pages/card';
// import NewCard from './cardjs/newcard';
import Home from './pages/home';
// import Canvas from './pages/canvas';
import Record from './pages/record';
// import Todos from './components/todo';

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
        <Route path="card" element={<Card />} />
        <Route path="record" element={<Record />} />
      </Routes>
    </Router>
  );
}

export default App;
