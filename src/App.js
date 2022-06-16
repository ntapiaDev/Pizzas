import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import About from './components/About';
import Contact from './components/Contact';
import NavBar from './components/NavBar';
import Policy from './components/Policy';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
