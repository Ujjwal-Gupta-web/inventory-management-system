import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Products from "./pages/Products"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import Navbar from "./components/Navbar"

function App() {
  return (
    <>
       <BrowserRouter>
       {/* <Navbar/> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />


        </Routes>
        
      </BrowserRouter>
    </>  );
}

export default App;
