import React, {useContext, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Signup = () => {
    const { actions } = useContext(Context)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.signup(email, password);
        if (result.success) {
            navigate('/login');
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
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;