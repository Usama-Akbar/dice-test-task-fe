
import './App.css';
import Home from './pages/Home';
import {  Routes, Route } from "react-router-dom";
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
function App() {


  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
