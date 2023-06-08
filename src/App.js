import './App.scss';
import Header from './components/Header';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';

function App() {

  const { user, loginContext } = useContext(UserContext)

  console.log("user", user)

  useEffect(() => {
    if(localStorage.getItem("token")){
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"))
    }
  }, [])

  return (
    <div className='app-container'>
        <Header />
        <AppRoutes />
    </div>
  );
}

export default App;
