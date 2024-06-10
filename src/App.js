
import './App.css';
import Home from './pages/Home';
import {  Routes, Route } from "react-router-dom";
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
function App() {


  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
      </Routes>
    </div>
  );
}

export default App;
