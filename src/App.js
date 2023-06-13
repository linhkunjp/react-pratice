import './App.scss';
import Header from './components/Header';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux'
import { handleRefresh } from './redux/actions/userAction'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    if ( localStorage.getItem("token") ){
      dispatch( handleRefresh() )
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
