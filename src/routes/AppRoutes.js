import { Routes, Route } from "react-router-dom"
import ListUsers from '../components/ListUsers';
import Home from '../components/Home';
import Login from '../components/Login';
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "./NotFound";

const AppRoutes = () => {


    return (
        <>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route 
                path="/users"
                element={
                    <PrivateRoutes>
                        <ListUsers />
                    </PrivateRoutes>
                }
            />
            <Route 
                path="*"
                element={<NotFound />}
            />
        </Routes>
            
        </>
    )
}

export default AppRoutes