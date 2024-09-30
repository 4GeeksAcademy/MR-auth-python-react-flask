import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"

const Login = () => {
    const { actions } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        if (token){
            navigate('/private');
        }
    },[navigate])

    const handleSignup = () =>{
		navigate('/signup');
	}

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.login(email, password);
        if (result.success) {
            navigate('/private');
        } else {
            alert(result.msg);
        }
    };

    return (
        <>
        <div className="container my-5">
            <div className="card p-5 shadow text-center">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email"  
                        value={email} 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="form-control my-3"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="form-control my-3"
                    />
                    <div className="mt-5">
                        <button type="submit" className="btn btn-primary mx-5">Login</button>
                    <button type="button" className="btn btn-primary" onClick = {handleSignup}>sign up </button>
                    </div>

                </form>
            </div>
        </div>
    </>
    );
};

export default Login;
