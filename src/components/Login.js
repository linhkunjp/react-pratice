import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import {  toast, ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)

    const isLoading = useSelector( state => state.user.isLoading )
    const account = useSelector( state => state.user.account )

    const handleLogin = async () =>{
        if(!email || !password){
            toast.error("Email/Password is required!")
        }

        dispatch( handleLoginRedux( email, password ) )
        
    }

    const handleBack = () => {
        navigate("/")
    }

    const handlePressEnter = (event) => {
        if(event && event.key === "Enter") {
            handleLogin()
        }
    }

    useEffect(() => {
        if ( account && account.auth === true ){
            navigate("/")
        }
    }, [account])

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
                    {isLoading &&<i className="fa-solid fa-cog fa-spin fa-spin-reverse"></i> }
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