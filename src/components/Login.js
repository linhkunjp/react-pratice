import { useState } from "react"
import { loginUser } from "../services/userService"
import 'react-toastify/dist/ReactToastify.css';
import {  toast, ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


const Login = () => {

    const { loginContext } = useContext(UserContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)

    const [loadingApi, setLoadingApi] = useState(false)

    const handleLogin = async () =>{
        if(!email || !password){
            toast.error("Email/Password is required!")
        }

        setLoadingApi(true)
        let res = await loginUser(email, password)

        if (res && res.token){
            loginContext(email, res.token)
            navigate("/")
            toast.success("Login successful!")
        } else {
            if (res && res.status === 400){
                toast.error(res.data.error)
            }
        }
        setLoadingApi(false)
    }

    const handleBack = () => {
        navigate("/")
    }

    const handlePressEnter = (event) => {
        if(event && event.key === "Enter") {
            handleLogin()
        }
    }

    return (
        <>
            <div className="login-container col-10 col-sm-3">

                <div className="title">Login</div>
                <div className="text">Email or username - eve.holt@reqres.in</div>
                <input 
                    type="text" 
                    placeholder="Email or Username"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <div className="input-password">
                    <input 
                        type={showPassword === false ? "text" : "password" } 
                        placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        onKeyDown={event => handlePressEnter(event)}
                    />
                    <i 
                        className={showPassword === false ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                        onClick={() => setShowPassword(!showPassword)}
                    ></i>
                </div>
                <button 
                    className={email && password ? "btn-login active" : "btn-login"}
                    disabled={email && password ? false : true}
                    onClick={() => handleLogin()}
                >
                    {loadingApi &&<i className="fa-solid fa-cog fa-spin fa-spin-reverse"></i> }
                    &nbsp;Login</button>
                <div className="go-back">
                    <i className="fa-solid fa-angle-left">&nbsp;</i>
                    <span onClick={() => handleBack()}>Go back</span>
                </div>
            </div>
            <ToastContainer/>
        </>       
    )
}

export default Login