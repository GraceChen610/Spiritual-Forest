import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './pages/quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
