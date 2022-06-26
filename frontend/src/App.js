import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Category from "./pages/Category"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/category/:category_id" element={<Category />} />
          
          <Route exact path="/dashboard" element={<Dashboard />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />


        </Routes>
        
      </BrowserRouter>
    </>  );
}

export default App;
