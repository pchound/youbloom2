import {
BrowserRouter as Router,
Routes,
Route,
Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useEffect, useState} from "react";
import axios from 'axios';

function App() {
  const [user, setuser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() =>{
    const fetchUser = async () =>{
      const token = localStorage.getItem("token");
      if (token){
        try{
          const res = await axios.get('/api/users/me',{
            headers: {Authorization: `Bearer ${token}`}
          })
          setuser(res.data)
        } catch (err){
          setError("Failed to fetch user data");
          localStorage.removeItem("token")
        }
      }
    };
    fetchUser();
  }, [])


  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/*<Route path="/login" element={<Login setUser={setUser}/>} /> {/* <-- add this */}
          <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
  )
}

export default App
