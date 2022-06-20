import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import About from './components/About';
import Cart from './components/Cart';
import Contact from './components/Contact';
import HomeScreen from './screens/HomeScreen';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Policy from './components/Policy';
import Register from './components/Register';
import RequireAuth from "./components/RequireAuth"
import { AuthProvider } from './context/AuthProvider';

function App() {
  const [cartLength, setCartLength] = useState(localStorage.length);

  return (
    <BrowserRouter>
      <AuthProvider>
        <TopBar />
        <NavBar cartLength={cartLength} />
        <Routes>
          <Route path="/" element={<HomeScreen setCartLength={setCartLength} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route element={<RequireAuth />}> */}
            <Route path="/cart" element={<Cart setCartLength={setCartLength}/>} />
          {/* </Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
