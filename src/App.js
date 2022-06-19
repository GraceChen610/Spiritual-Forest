import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './pages/quiz';
import MapApp from './pages/map';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="map" element={<MapApp />} />
      </Routes>
    </Router>
  );
}

export default App;
