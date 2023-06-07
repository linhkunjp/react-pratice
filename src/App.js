import './App.scss';
import Header from './components/Header';
import ListUsers from './components/ListUsers';
import { Routes, Route, Link } from "react-router-dom"
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <div className='app-container'>
        <Header />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/users" element={<ListUsers />}/>
            <Route path="/login" element={<Login />}/>
        </Routes>
    </div>
  );
}

export default App;
