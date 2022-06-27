import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './pages/quiz';
import MapApp from './pages/mapApp';
import Canvas from './pages/canvas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="map" element={<MapApp />} />
        <Route path="canvas" element={<Canvas />} />
      </Routes>
    </Router>
  );
}

export default App;
