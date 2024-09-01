import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <ToastContainer />
        {showPopup ? <LoginPopup setShowPopup={setShowPopup} /> : <></>}
        <div className="app">
          <Navbar setShowPopup={setShowPopup} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart setShowPopup={setShowPopup}/>} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </div>
        <Footer />
      
    </>
  );
}

export default App;
