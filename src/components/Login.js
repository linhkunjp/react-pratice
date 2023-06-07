import { useEffect, useState } from "react"
import { loginUser } from "../services/userService"
import 'react-toastify/dist/ReactToastify.css';
import {  toast, ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom";


const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)

    const [loadingApi, setLoadingApi] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem("token")
        if(token){
            navigate("/")
        }
    }, [])

    const handleLogin = async () =>{
        if(!email || !password){
            toast.error("Email/Password is required!")
            
        }

        setLoadingApi(true)
        let res = await loginUser(email, password)
        console.log(res)
        if (res && res.token){
            localStorage.setItem("token", res.token)
            toast.success("Login successful!")
            navigate("/")
        } else {
            if (res && res.status === 400){
                toast.error(res.data.error)
                // alert(res.data.error)
            }
        }
        setLoadingApi(false)
    }

    return (
        <>
            <div className="login-container col-10 col-sm-4">

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
                        type={showPassword === true ? "text" : "password" } 
                        placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <i 
                        className={showPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
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
                    Go back
                </div>
            </div>
            <ToastContainer/>
        </>       
    )
}

export default Login