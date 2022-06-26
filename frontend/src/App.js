import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Product from "./pages/Product"
import Category from "./pages/Category"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route exact path="/category/:id" element={<Category />} />
          
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />


        </Routes>
        
      </BrowserRouter>
    </>  );
}

export default App;
