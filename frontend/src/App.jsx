import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {


  return (

    <>
      <BrowserRouter>
       <Navbar/>
       <Routes>
         <Route path="/" element={<Registration />} />
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Protected  Component={Dashboard }  />} />
         </Routes>
       </BrowserRouter>

    </>
  )
}

export default App;
