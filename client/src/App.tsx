import { useState , useEffect } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { Toaster } from 'react-hot-toast';
import AboutUs from "./components/AboutUs/AboutUs";

function App() {

  const routes = [
    {
      path: "/",
      name : "Home",
    },
    {
      path: "/auction",
      name : "Auction",
    },{
      path : "http://localhost:8501/" ,
      name : "Crop Prediction"
    } ,
    {
      path : "http://localhost:8502/" ,
      name : "Disease Detection"
    },
    {
      path : "/aboutus" ,
      name : "About Us"
    }

  ]

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Router>

      {/* <div className="bgContainer1"></div> */}
      <Toaster />
      <div className="mb-24 ">
      <Nav toggleLogin={toggleLogin} isLoggedIn={isLoggedIn} routes={routes} user={"sandip"} />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>

      </Router>

    </div>
  );
}

export default App;
