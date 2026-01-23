import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import WelcomePage from "./components/Welcome";
import LoginComp from './components/LoginComp';
import Registeromp from './components/RegisterComp';

function App() {
  return (
    <div>
      
       <Routes>
        <Route path='/login' element={ <LoginComp />} />
        <Route path='/login' element={ <LoginComp />} />
        <Route path='/register' element={ <Registeromp />} />
             <Route path="/" element={<WelcomePage />} />
       </Routes>
    </div>
  );
}

export default App;
