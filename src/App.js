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
import Paypal from './components/Paypal';
import Policy from './components/Policy';
import Register from './components/Register';
import RequireAuth from "./components/RequireAuth"
import { AuthProvider } from './context/AuthProvider';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function App() {
  const [cartLength, setCartLength] = useState(localStorage.length);
  const initialOptions = {
    "client-id": "test",
    currency: "USD",
    intent: "capture",
    "data-client-token": "abc123xyz==",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
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
            <Route element={<RequireAuth />}>
              <Route path="/cart" element={<Cart setCartLength={setCartLength} />} />
              <Route path="/paypal" element={<Paypal />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
